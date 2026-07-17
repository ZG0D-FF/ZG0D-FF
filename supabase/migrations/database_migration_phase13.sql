create extension if not exists vector;

alter table public.jarvis_git_memory 
  add column if not exists commit_summary text,
  add column if not exists summary_vector vector(768);

create index if not exists jarvis_git_memory_summary_vector_idx 
on public.jarvis_git_memory using ivfflat (summary_vector vector_cosine_ops)
with (lists = 100);

create or replace function public.match_git_memory (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  commit_hash text,
  author text,
  commit_message text,
  files_changed text,
  commit_summary text,
  similarity float
)
language sql stable
as $$
  select
    jarvis_git_memory.id,
    jarvis_git_memory.commit_hash,
    jarvis_git_memory.author,
    jarvis_git_memory.commit_message,
    jarvis_git_memory.files_changed,
    jarvis_git_memory.commit_summary,
    1 - (jarvis_git_memory.summary_vector <=> query_embedding) as similarity
  from public.jarvis_git_memory
  where 1 - (jarvis_git_memory.summary_vector <=> query_embedding) > match_threshold
  order by jarvis_git_memory.summary_vector <=> query_embedding
  limit match_count;
$$;
