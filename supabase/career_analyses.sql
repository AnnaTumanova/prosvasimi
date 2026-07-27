create table if not exists public.career_analyses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  guest_token text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  name text not null default '',
  location text not null default '',
  experience_level text not null default '',
  job_field text not null default '',
  work_preference text not null default '',
  skills text not null default '',
  goals text not null default '',
  resume_text text,
  cv_path text,
  cv_file_name text,
  cv_file_type text,
  cv_file_size integer,
  analysis_text text,
  analysis_status text not null default 'pending',
  preferences text not null default '',
  user_agent text not null default '',
  ip text not null default ''
);

create index if not exists career_analyses_email_idx on public.career_analyses (email);
alter table public.career_analyses add column if not exists preferences text not null default '';
create index if not exists career_analyses_user_id_idx on public.career_analyses (user_id);

alter table public.career_analyses enable row level security;

create policy "Service role can manage career analyses"
  on public.career_analyses
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Users can read their own career analyses"
  on public.career_analyses
  for select
  using (auth.uid() = user_id or auth.jwt() ->> 'email' = email);
