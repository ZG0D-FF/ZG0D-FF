-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.session_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_known_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_navigation_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_audio_triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_system_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_model_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_user_token_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_threat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jarvis_git_memory ENABLE ROW LEVEL SECURITY;

-- Create policies that allow your Cloudflare Worker (which uses the 'anon' key) to read/write everything without being stopped
CREATE POLICY "Allow anon all on session_logs" ON public.session_logs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_chat_logs" ON public.jarvis_chat_logs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_known_users" ON public.jarvis_known_users FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_error_logs" ON public.jarvis_error_logs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_navigation_map" ON public.jarvis_navigation_map FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_audio_triggers" ON public.jarvis_audio_triggers FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_system_config" ON public.jarvis_system_config FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_model_usage" ON public.jarvis_model_usage FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_user_token_usage" ON public.jarvis_user_token_usage FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_threat_logs" ON public.jarvis_threat_logs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all on jarvis_git_memory" ON public.jarvis_git_memory FOR ALL TO anon USING (true) WITH CHECK (true);
