create extension if not exists pgcrypto;

create table if not exists early_access_signups (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  product_interest text not null,
  created_at timestamptz not null default now()
);

create index if not exists early_access_signups_product_idx on early_access_signups (product_interest);
create index if not exists early_access_signups_email_idx on early_access_signups (email);
