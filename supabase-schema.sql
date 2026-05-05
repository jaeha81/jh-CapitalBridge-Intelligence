-- interior-ai-platform Supabase 스키마
-- Supabase SQL Editor에서 실행

-- 고객 테이블
create table customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  style_preference text,
  budget integer,
  status text not null default 'lead'
    check (status in ('lead','active','completed','hold')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 견적서 테이블
create table estimates (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  project_type text not null,
  space_size numeric,
  requirements text,
  ai_result text,
  final_amount integer,
  status text not null default 'draft'
    check (status in ('draft','sent','approved','rejected')),
  created_at timestamptz not null default now()
);

-- 제안서 테이블
create table proposals (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references customers(id) on delete cascade,
  style_keyword text,
  room_type text,
  budget_range text,
  ai_result text,
  created_at timestamptz not null default now()
);

-- SNS 콘텐츠 테이블
create table sns_contents (
  id uuid primary key default gen_random_uuid(),
  image_url text,
  project_type text,
  style_tag text,
  ai_caption text,
  platform text not null default 'instagram'
    check (platform in ('instagram','blog','both')),
  status text not null default 'draft'
    check (status in ('draft','published')),
  created_at timestamptz not null default now()
);

-- 협력업체 테이블
create table partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  contact text,
  region text,
  specialty text,
  rating integer check (rating between 1 and 5),
  notes text,
  created_at timestamptz not null default now()
);

-- updated_at 자동 갱신 함수
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger customers_updated_at
  before update on customers
  for each row execute function update_updated_at();
