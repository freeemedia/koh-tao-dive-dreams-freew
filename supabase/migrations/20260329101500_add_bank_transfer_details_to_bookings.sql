ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS bank_transfer_details text;
