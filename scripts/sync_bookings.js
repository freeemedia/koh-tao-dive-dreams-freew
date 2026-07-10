// Usage:
// 1. Set your Supabase service role keys and project URLs in a .env file or directly in the script.
// 2. Run: npm install @supabase/supabase-js dotenv
// 3. Run: node sync_bookings.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SOURCE_SUPABASE_URL = process.env.SOURCE_SUPABASE_URL || 'https://bsrqflfytxrndngpagnq.supabase.co';
const SOURCE_SUPABASE_SERVICE_KEY = process.env.SOURCE_SUPABASE_SERVICE_KEY || '';
const TARGET_SUPABASE_URL = process.env.TARGET_SUPABASE_URL || 'https://wulgixdyofyfdwcymwec.supabase.co';
const TARGET_SUPABASE_SERVICE_KEY = process.env.TARGET_SUPABASE_SERVICE_KEY || '';

const TABLE = 'bookings';

const source = createClient(SOURCE_SUPABASE_URL, SOURCE_SUPABASE_SERVICE_KEY);
const target = createClient(TARGET_SUPABASE_URL, TARGET_SUPABASE_SERVICE_KEY);

async function main() {
  // 1. Fetch all bookings from source
  const { data: rows, error } = await source
    .from(TABLE)
    .select('*');

  if (error) {
    console.error('Error fetching from source:', error);
    process.exit(1);
  }
  if (!rows.length) {
    console.log('No bookings found in source.');
    return;
  }
  console.log(`Fetched ${rows.length} bookings from source.`);

  // 2. Remove fields that should not be inserted (like id, created_at, updated_at)
  const insertRows = rows.map(({ id, created_at, updated_at, ...rest }) => rest);

  // 3. Insert into target (may create duplicates if run multiple times)
  const { error: insertError } = await target
    .from(TABLE)
    .insert(insertRows);

  if (insertError) {
    console.error('Error inserting into target:', insertError);
    process.exit(1);
  }
  console.log(`Inserted ${insertRows.length} bookings into target.`);
}

main();
