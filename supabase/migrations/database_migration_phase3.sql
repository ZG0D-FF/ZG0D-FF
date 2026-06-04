-- ==============================================================================
-- PHASE 3 DATABASE MIGRATION: OFFLINE SYNC, LWW, AND TOMBSTONING
-- ==============================================================================

-- 1. Alter Tables for Dual-Timestamp LWW & Tombstoning
ALTER TABLE jarvis_chat_logs 
  ADD COLUMN IF NOT EXISTS client_updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS server_updated_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;

ALTER TABLE jarvis_known_users
  ADD COLUMN IF NOT EXISTS client_updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS server_updated_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;

-- (Optional) If transitioning from UUID to ULID, you may need to alter ID columns to TEXT
-- ALTER TABLE jarvis_chat_logs ALTER COLUMN id TYPE TEXT;
-- ALTER TABLE jarvis_known_users ALTER COLUMN id TYPE TEXT;

-- 2. Create the authoritative server_updated_at trigger function
CREATE OR REPLACE FUNCTION set_server_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.server_updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Attach triggers to tables
DROP TRIGGER IF EXISTS trg_chat_logs_server_updated_at ON jarvis_chat_logs;
CREATE TRIGGER trg_chat_logs_server_updated_at
  BEFORE INSERT OR UPDATE ON jarvis_chat_logs
  FOR EACH ROW EXECUTE FUNCTION set_server_updated_at();

DROP TRIGGER IF EXISTS trg_known_users_server_updated_at ON jarvis_known_users;
CREATE TRIGGER trg_known_users_server_updated_at
  BEFORE INSERT OR UPDATE ON jarvis_known_users
  FOR EACH ROW EXECUTE FUNCTION set_server_updated_at();

-- 4. Create Dual-Timestamp LWW Upsert RPCs

-- Example RPC for jarvis_chat_logs
CREATE OR REPLACE FUNCTION upsert_chat_log_lww(payload jsonb)
RETURNS void AS $$
BEGIN
  INSERT INTO jarvis_chat_logs (
    id, 
    visitor_name_lower, 
    user_prompt, 
    ai_response, 
    client_updated_at, 
    is_deleted
  )
  VALUES (
    (payload->>'id')::text,
    payload->>'visitor_name_lower',
    payload->>'user_prompt',
    payload->>'ai_response',
    (payload->>'client_updated_at')::timestamptz,
    COALESCE((payload->>'is_deleted')::boolean, false)
  )
  ON CONFLICT (id) DO UPDATE
    SET 
      user_prompt = EXCLUDED.user_prompt,
      ai_response = EXCLUDED.ai_response,
      client_updated_at = EXCLUDED.client_updated_at,
      is_deleted = EXCLUDED.is_deleted
    WHERE EXCLUDED.client_updated_at > jarvis_chat_logs.client_updated_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Row Level Security (RLS) Adjustments to shield tombstones
-- (Run these adapting to your specific policy names)
-- ALTER POLICY "Users see own non-deleted logs" ON jarvis_chat_logs 
--   USING (auth.uid() = user_id AND is_deleted = false);

-- 6. The Tombstone Reaper via pg_cron (30-day SLA)
-- Ensure pg_cron extension is enabled:
CREATE EXTENSION IF NOT EXISTS pg_cron;

SELECT cron.schedule(
  'reap_tombstones_weekly',
  '0 0 * * 0', -- Every Sunday at Midnight
  $$
    DELETE FROM jarvis_chat_logs 
    WHERE is_deleted = true AND server_updated_at < now() - interval '30 days';
    
    DELETE FROM jarvis_known_users 
    WHERE is_deleted = true AND server_updated_at < now() - interval '30 days';
  $$
);
