-- Allow anon users to also read affiliate_clicks (for admin stats page)
drop policy if exists "Authenticated users can view affiliate clicks" on affiliate_clicks;

create policy "Anyone can view affiliate clicks"
  on affiliate_clicks for select
  to anon, authenticated
  using (true);
