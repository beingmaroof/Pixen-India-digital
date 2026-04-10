alter table public.leads
  add column if not exists stage text default 'new',
  add column if not exists owner_id uuid,
  add column if not exists website text,
  add column if not exists audit_status text default 'submitted',
  add column if not exists report_id text,
  add column if not exists report_url text,
  add column if not exists lead_score integer,
  add column if not exists lead_temperature text,
  add column if not exists follow_up_sequence text,
  add column if not exists next_follow_up_at timestamptz,
  add column if not exists last_contacted_at timestamptz,
  add column if not exists booked_slot_at timestamptz,
  add column if not exists owner_name text,
  add column if not exists revenue_range text,
  add column if not exists current_channels jsonb default '[]'::jsonb,
  add column if not exists goals jsonb default '[]'::jsonb,
  add column if not exists audit_report jsonb default '{}'::jsonb,
  add column if not exists follow_up_log jsonb default '[]'::jsonb,
  add column if not exists crm_notes text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text;

create table if not exists public.audit_slots (
  id uuid primary key default gen_random_uuid(),
  starts_at timestamptz not null unique,
  timezone text not null default 'Asia/Calcutta',
  max_bookings integer not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_bookings (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  user_id uuid,
  name text not null,
  email text not null,
  phone text,
  timezone text not null default 'Asia/Calcutta',
  starts_at timestamptz not null,
  ends_at timestamptz,
  booking_status text not null default 'confirmed',
  reschedule_history jsonb not null default '[]'::jsonb,
  cancellation_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_id uuid,
  author_name text,
  note text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  author text not null default 'Pixen Team',
  category text not null,
  read_time text not null,
  published_at timestamptz not null default now(),
  featured boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.case_studies (
  id text primary key,
  slug text not null unique,
  client_name text not null,
  title text not null,
  industry text not null,
  duration text not null,
  problem text not null,
  strategy text not null,
  summary text not null,
  results jsonb not null default '[]'::jsonb,
  testimonial text,
  testimonial_author text,
  testimonial_role text,
  services jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  is_published boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.testimonials (
  id text primary key,
  name text not null,
  role text not null,
  initials text not null,
  quote text not null,
  metric text not null,
  color text not null,
  is_published boolean not null default true,
  sort_order integer not null default 0
);

create table if not exists public.industry_pages (
  id text primary key,
  slug text not null unique,
  industry text not null,
  hero_title text not null,
  hero_subtitle text not null,
  pain text not null,
  solution text not null,
  promise text not null,
  proof jsonb not null default '[]'::jsonb,
  cta_label text not null,
  is_published boolean not null default true,
  sort_order integer not null default 0
);
