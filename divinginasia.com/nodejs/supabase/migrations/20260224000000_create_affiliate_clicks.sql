-- Booking.com affiliate click tracking
create table if not exists affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  hotel_name text not null,
  hotel_url text not null,
  affiliate_id text,
  clicked_at timestamptz default now(),
  referrer text,
  user_agent text,
  ip_address text
);

-- Allow anonymous inserts (clicks from public visitors)
alter table affiliate_clicks enable row level security;

create policy "Anyone can insert affiliate clicks"
  on affiliate_clicks for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can view affiliate clicks"
  on affiliate_clicks for select
  to authenticated
  using (true);
