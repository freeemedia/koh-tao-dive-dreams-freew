import 'dotenv/config';

import { listSupabaseBookings } from '../api/_lib/supabase-bookings.js';
import { ensureMySqlBookingsTable, upsertMySqlBooking } from '../api/_lib/mysql-bookings.js';

function toNullableDateTime(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function normalizeRow(row) {
  return {
    id: String(row.id),
    name: row.name ?? null,
    email: row.email ?? null,
    phone: row.phone ?? null,
    accommodation: row.accommodation ?? null,
    item_type: row.item_type ?? null,
    course_title: row.course_title ?? row.item_title ?? null,
    preferred_date: row.preferred_date ?? null,
    experience_level: row.experience_level ?? null,
    payment_choice: row.payment_choice ?? null,
    message: row.message ?? null,
    status: row.status ?? 'pending',
    internal_notes: row.internal_notes ?? null,
    bank_transfer_details: row.bank_transfer_details ?? null,
    total_amount: row.total_amount ?? null,
    deposit_amount: row.deposit_amount ?? null,
    due_amount: row.due_amount ?? null,
    created_at: toNullableDateTime(row.created_at),
    updated_at: toNullableDateTime(row.updated_at),
  };
}

async function main() {
  console.log('Starting Supabase -> Hostinger MySQL bookings migration');

  await ensureMySqlBookingsTable();
  const rows = await listSupabaseBookings();

  console.log(`Fetched ${rows.length} rows from Supabase`);

  let migrated = 0;
  for (const row of rows) {
    const payload = normalizeRow(row);
    await upsertMySqlBooking(payload);
    migrated += 1;

    if (migrated % 50 === 0) {
      console.log(`Migrated ${migrated}/${rows.length}`);
    }
  }

  console.log(`Migration complete: ${migrated} bookings upserted to MySQL`);
}

main().catch((error) => {
  console.error('Migration failed:', error?.message || error);
  process.exit(1);
});
