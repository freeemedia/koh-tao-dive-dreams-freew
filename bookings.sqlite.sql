// SQLite schema for bookings (for manual reference or migration)
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  item_type TEXT,
  course_title TEXT,
  preferred_date TEXT,
  experience_level TEXT,
  addons TEXT,
  addons_json TEXT,
  addons_total REAL,
  subtotal_amount REAL,
  total_payable_now REAL,
  internal_notes TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Allow read to everyone
USING (true);
