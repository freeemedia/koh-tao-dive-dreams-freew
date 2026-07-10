// Bookings API route disabled as requested. No data will be returned.
export default function handler(req, res) {
  res.status(200).json([]);
}
