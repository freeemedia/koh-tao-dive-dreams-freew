/**
 * POST /api/mollie-webhook
 * Receives Mollie webhook events (payment-link.paid).
 * Updates booking payment_status → 'paid' and status → 'confirmed'.
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const event = req.body;

    // Only handle payment-link.paid
    if (event?.type !== 'payment-link.paid') {
      return res.status(200).json({ received: true, skipped: true });
    }

    const entity   = event?._embedded?.entity;
    const metadata = entity?.metadata;
    const booking_id = metadata?.booking_id;

    if (!booking_id) {
      return res.status(200).json({ received: true, error: 'No booking_id in metadata' });
    }

    // Verify payment status with Mollie directly (security: don't trust webhook body alone)
    const MOLLIE_API_KEY = process.env.MOLLIE_API_KEY;
    if (MOLLIE_API_KEY && entity?.id) {
      const check = await fetch(`https://api.mollie.com/v2/payment-links/${entity.id}`, {
        headers: { Authorization: `Bearer ${MOLLIE_API_KEY}` },
      });
      if (check.ok) {
        const linkData = await check.json();
        if (!linkData.paidAt) {
          return res.status(200).json({ received: true, skipped: 'not_paid_yet' });
        }
      }
    }

    // Update booking in WordPress
    const WP_URL  = process.env.WP_BOOKING_URL;
    const API_KEY = process.env.WP_BOOKING_API_KEY;

    if (!WP_URL || !API_KEY) {
      console.error('mollie-webhook: WP_BOOKING_URL or WP_BOOKING_API_KEY not set');
      return res.status(200).json({ received: true, error: 'WP not configured' });
    }

    const patchRes = await fetch(`${WP_URL}/wp-json/ktd/v1/bookings/${booking_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-ktd-api-key': API_KEY,
      },
      body: JSON.stringify({
        payment_status: 'paid',
        status: 'confirmed',
      }),
    });

    if (!patchRes.ok) {
      const err = await patchRes.json().catch(() => ({}));
      console.error('mollie-webhook: PATCH failed', err);
      return res.status(200).json({ received: true, error: 'booking update failed' });
    }

    console.log(`mollie-webhook: booking #${booking_id} marked paid`);
    return res.status(200).json({ received: true, booking_id });

  } catch (err) {
    console.error('mollie-webhook error:', err);
    // Always return 200 so Mollie doesn't retry indefinitely
    return res.status(200).json({ received: true, error: err.message });
  }
}
