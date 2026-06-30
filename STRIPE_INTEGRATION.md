# Stripe Integration Instructions

1. Add your Stripe API keys to your .env file:

VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

2. Install Stripe packages:

npm install @stripe/stripe-js @stripe/react-stripe-js stripe

3. Create a backend endpoint (e.g. /api/create-stripe-session.js) to generate Stripe Checkout sessions.

4. In your booking confirmation/thank you step, add a button for Stripe payment. On click, call the backend endpoint to get a session ID and redirect to Stripe Checkout.

5. After payment, redirect users to a success page.

---

Let me know if you want the code for each step or a full implementation for your booking flow.