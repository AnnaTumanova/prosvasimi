create table if not exists public.candidate_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  name text not null default '',
  email text not null,
  phone text not null default '',
  location text not null default '',
  experience_level text not null default '',
  job_field text not null default '',
  work_preference text not null default '',
  skills text not null default '',
  accommodations text not null default '',
  goals text not null default '',
  cv_path text,
  cv_file_name text,
  cv_file_type text,
  cv_file_size integer,
  user_agent text not null default '',
  ip text not null default ''
);

-- Ensure a single profile per user so profiles can be updated in place (upsert).
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'candidate_profiles_user_id_key'
  ) then
    alter table public.candidate_profiles
      add constraint candidate_profiles_user_id_key unique (user_id);
  end if;
end $$;

alter table public.candidate_profiles enable row level security;

create policy "Service role can manage candidate profiles"
  on public.candidate_profiles
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "Users can read their own candidate profile"
  on public.candidate_profiles
  for select
  using (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('candidate-cvs', 'candidate-cvs', false)
on conflict (id) do nothing;

create policy "Service role can manage candidate CVs"
  on storage.objects
  for all
  using (bucket_id = 'candidate-cvs' and auth.role() = 'service_role')
  with check (bucket_id = 'candidate-cvs' and auth.role() = 'service_role');
