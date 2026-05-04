import Stripe from 'stripe';

// This serverless function creates a Stripe Checkout session for a fixed deposit.
// Required environment variables (set in Vercel):
// - STRIPE_SECRET_KEY  (your Stripe secret key)
// - DEPOSIT_AMOUNT (optional, default 2000) — major currency units (e.g., 2000 for ฿2,000)
// - DEPOSIT_CURRENCY (optional, default 'thb')

const stripeKey = process.env.STRIPE_SECRET_KEY || '';
const depositAmountMajor = parseFloat(process.env.DEPOSIT_AMOUNT || '2000');
const depositCurrency = (process.env.DEPOSIT_CURRENCY || 'thb').toLowerCase();

if (!stripeKey) {
  // eslint-disable-next-line no-console
  console.warn('Stripe secret key is not configured. Set STRIPE_SECRET_KEY in environment.');
}

const stripe = new Stripe(stripeKey, { apiVersion: '2022-11-15' });

const allowedCurrencies = new Set([
  'usd', 'eur', 'gbp', 'thb', 'aud', 'cad', 'nzd', 'sgd', 'hkd', 'jpy',
]);

const toPositiveInt = (value: any): number | null => {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) return null;
  return n;
};

const toCurrency = (value: any, fallback = 'thb'): string => {
  const c = String(value || fallback).trim().toLowerCase();
  return allowedCurrencies.has(c) ? c : fallback;
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!stripeKey) {
    return res.status(500).json({ error: 'Stripe is not configured' });
  }

  try {
    const body = req.body || {};
    const itemTitle = body.itemTitle || 'Booking Deposit';
    const itemType = body.itemType || 'course';
    const customerName = body.name || '';
    const customerEmail = body.email || '';
    const products = Array.isArray(body.products) ? body.products : null;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (products && products.length > 0) {
      for (const product of products) {
        const name = String(product?.name || '').trim();
        const quantity = toPositiveInt(product?.quantity || 1) || 1;

        if (product?.priceId) {
          line_items.push({
            price: String(product.priceId),
            quantity,
          });
          continue;
        }

        const currency = toCurrency(product?.currency, depositCurrency || 'thb');
        const unit_amount = toPositiveInt(product?.unitAmount);

        if (!name || !unit_amount) {
          return res.status(400).json({ error: 'Invalid products payload' });
        }

        line_items.push({
          price_data: {
            currency,
            product_data: {
              name,
              description: product?.description ? String(product.description).slice(0, 500) : undefined,
            },
            unit_amount,
          },
          quantity,
        });
      }
    } else {
      // Backward-compatible single deposit item behavior
      let amountMajor = typeof body.amountMajor === 'number' ? body.amountMajor : depositAmountMajor;
      amountMajor = Number(amountMajor);
      if (isNaN(amountMajor) || amountMajor <= 0) {
        return res.status(400).json({ error: 'Invalid amountMajor' });
      }

      const currency = toCurrency(body.currency, depositCurrency || 'thb');
      const unit_amount = Math.round(amountMajor * 100);

      line_items.push({
        price_data: {
          currency,
          product_data: {
            name: `Deposit — ${itemTitle}`,
            description: `Booking ${itemType}`,
          },
          unit_amount,
        },
        quantity: 1,
      });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      metadata: {
        itemTitle,
        itemType,
        customerName,
        customerEmail,
      },
      success_url: `${origin}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment=canceled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error('Stripe checkout session creation failed:', err?.message || err);
    return res.status(500).json({ error: err?.message || 'Internal Server Error' });
  }
}
