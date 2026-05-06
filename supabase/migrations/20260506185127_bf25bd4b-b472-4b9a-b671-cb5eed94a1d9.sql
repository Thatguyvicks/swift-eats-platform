
-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- updated_at trigger
create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
create trigger profiles_updated before update on public.profiles for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), coalesce(new.raw_user_meta_data->>'phone',''));
  return new;
end; $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Addresses
create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null,
  line text not null,
  notes text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.addresses enable row level security;
create policy "addr_select_own" on public.addresses for select using (auth.uid() = user_id);
create policy "addr_insert_own" on public.addresses for insert with check (auth.uid() = user_id);
create policy "addr_update_own" on public.addresses for update using (auth.uid() = user_id);
create policy "addr_delete_own" on public.addresses for delete using (auth.uid() = user_id);

-- Stores (public readable)
create table public.stores (
  slug text primary key,
  name text not null,
  cuisine text not null,
  vertical text not null,
  rating numeric not null default 0,
  reviews int not null default 0,
  eta text not null,
  fee text not null,
  distance text not null,
  cover text not null,
  tags text[] not null default '{}',
  price_level int not null default 1,
  menu jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);
alter table public.stores enable row level security;
create policy "stores_public_read" on public.stores for select using (true);

-- Orders
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  store_slug text not null references public.stores(slug),
  status text not null default 'confirmed',
  subtotal numeric not null,
  fee numeric not null default 0,
  tax numeric not null default 0,
  tip numeric not null default 0,
  total numeric not null,
  address text not null,
  payment_method text not null default 'card',
  scheduled_for text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id);
create policy "orders_insert_own" on public.orders for insert with check (auth.uid() = user_id);
create policy "orders_update_own" on public.orders for update using (auth.uid() = user_id);
create trigger orders_updated before update on public.orders for each row execute function public.set_updated_at();

-- Order items
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  item_id text not null,
  name text not null,
  qty int not null,
  unit_price numeric not null,
  options jsonb not null default '[]'::jsonb
);
alter table public.order_items enable row level security;
create policy "oi_select_via_order" on public.order_items for select using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);
create policy "oi_insert_via_order" on public.order_items for insert with check (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);

-- Courier locations
create table public.courier_locations (
  order_id uuid primary key references public.orders(id) on delete cascade,
  lat numeric not null,
  lng numeric not null,
  progress numeric not null default 0,
  updated_at timestamptz not null default now()
);
alter table public.courier_locations enable row level security;
create policy "cl_select_via_order" on public.courier_locations for select using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);
-- inserts/updates done by simulation server function; allow owner for now
create policy "cl_upsert_via_order" on public.courier_locations for insert with check (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);
create policy "cl_update_via_order" on public.courier_locations for update using (
  exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
);

-- Realtime
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.courier_locations;
alter table public.orders replica identity full;
alter table public.courier_locations replica identity full;
