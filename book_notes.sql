-- Migration: Create book_notes table for admin comments/notes
CREATE TABLE IF NOT EXISTS book_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  booking_id TEXT NOT NULL,
  note_type TEXT NOT NULL, -- e.g. 'internal', 'paypal', 'general'
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Optional: Add index for faster lookup
CREATE INDEX IF NOT EXISTS idx_book_notes_booking_id ON book_notes (booking_id);
