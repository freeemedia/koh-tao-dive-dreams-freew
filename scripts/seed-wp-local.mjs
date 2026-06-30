// Local seed: Supabase → WordPress (run with: node scripts/seed-wp-local.mjs)
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wulgixdyofyfdwcymwec.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1bGdpeGR5b2Z5ZmR3Y3ltd2VjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTM1ODc2NSwiZXhwIjoyMDkwOTM0NzY1fQ.xnxvPCprbKXAgUVBTqmRNtvlj4-sGjwFCvNt_Ult3xU';
const WP_URL = 'https://lightsalmon-dinosaur-377714.hostingersite.com/wp-json/ktd/v1/bookings/create';
const WP_API_KEY = '909010232893284934783734';

const COURSE_PRICES = {
  'open water': 12000,
  'advanced open water': 11000,
  'rescue diver': 13000,
  'divemaster': 35000,
  'fun dive': 1800,
  'fun dives': 1800,
  'discover scuba': 3500,
  'freediving': 8500,
};

function getPrices(courseTitle) {
  const key = (courseTitle || '').toLowerCase().trim();
  for (const [name, price] of Object.entries(COURSE_PRICES)) {
    if (key.includes(name)) {
      const deposit = name === 'fun dive' || name === 'fun dives' ? Math.round(price * 0.2) : Math.round(price * 0.2);
      return { total: price, deposit, due: price - deposit };
    }
  }
  return { total: null, deposit: null, due: null };
}

const sb = createClient(SUPABASE_URL, SUPABASE_KEY);

const { data: rows, error } = await sb
  .from('bookings')
  .select('*')
  .order('created_at', { ascending: true });

if (error) { console.error('Supabase error:', error.message); process.exit(1); }
console.log(`Seeding ${rows.length} bookings...`);

let ok = 0, fail = 0;
for (const row of rows) {
  const sbTotal = Number(row.subtotal_amount) || 0;
  const sbDeposit = Number(row.total_payable_now) || 0;
  const derived = getPrices(row.course_title);
  const total = sbTotal || derived.total;
  const deposit = sbDeposit || derived.deposit;
  const due = total && deposit ? Math.max(total - deposit, 0) : derived.due;
  const payload = {
    name: row.name || '',
    email: row.email || '',
    phone: row.phone || '',
    preferred_date: row.preferred_date || '',
    experience_level: row.experience_level || '',
    payment_choice: row.payment_choice || '',
    message: row.message || '',
    internal_notes: row.internal_notes || '',
    status: row.status || 'new',
    booking_type: row.item_type || 'course',
    course: row.course_title || '',
    course_title: row.course_title || '',
    item_title: row.course_title || '',
    total_amount: total,
    deposit_amount: deposit,
    due_amount: Math.max(total - deposit, 0),
  };

  const res = await fetch(WP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-KTD-Api-Key': WP_API_KEY },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    ok++;
    console.log(`✓ [${row.id}] ${row.name}`);
  } else {
    fail++;
    const txt = await res.text();
    console.error(`✗ [${row.id}] ${row.name} — ${res.status} ${txt.slice(0,120)}`);
  }
}

console.log(`\nDone: ${ok} seeded, ${fail} failed.`);
