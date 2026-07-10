// Usage:
// 1. Set your Supabase service role keys and project URLs in a .env file or directly in the script.
// 2. Run: npm install @supabase/supabase-js dotenv
// 3. Run: node sync_dutch_page_content.js

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Set these in your .env file or directly here
const SOURCE_SUPABASE_URL = process.env.SOURCE_SUPABASE_URL || 'https://ltzjvztaradldlfpbtdp.supabase.co';
const SOURCE_SUPABASE_SERVICE_KEY = process.env.SOURCE_SUPABASE_SERVICE_KEY || '';
const TARGET_SUPABASE_URL = process.env.TARGET_SUPABASE_URL || 'https://bsrqflfytxrndngpagnq.supabase.co';
const TARGET_SUPABASE_SERVICE_KEY = process.env.TARGET_SUPABASE_SERVICE_KEY || '';

const TABLE = 'page_content';
const LANG_FIELD = 'lang';
const LANG_VALUE = 'nl';

const source = createClient(SOURCE_SUPABASE_URL, SOURCE_SUPABASE_SERVICE_KEY);
const target = createClient(TARGET_SUPABASE_URL, TARGET_SUPABASE_SERVICE_KEY);

async function main() {
  // 1. Fetch all Dutch rows from source
  const { data: rows, error } = await source
    .from(TABLE)
    .select('*')
    .eq(LANG_FIELD, LANG_VALUE);

  if (error) {
    console.error('Error fetching from source:', error);
    process.exit(1);
  }
  if (!rows.length) {
    console.log('No Dutch rows found in source.');
    return;
  }
  console.log(`Fetched ${rows.length} Dutch rows from source.`);

  // 2. Remove fields that should not be inserted (like id, created_at, updated_at)
  const insertRows = rows.map(({ id, created_at, updated_at, ...rest }) => rest);

  // 3. Upsert into target
  const { error: insertError, count } = await target
    .from(TABLE)
    .upsert(insertRows, { onConflict: 'slug,lang' }) // adjust onConflict if needed
    .select();

  if (insertError) {
    console.error('Error upserting into target:', insertError);
    process.exit(1);
  }
  console.log(`Upserted ${insertRows.length} Dutch rows into target.`);
}

main();
