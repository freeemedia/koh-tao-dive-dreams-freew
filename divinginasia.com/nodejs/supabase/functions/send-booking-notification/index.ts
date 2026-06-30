import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, preferred_date, experience_level, message, item_title, deposit_amount, payment_choice, paypal_link } = await req.json();

    const client = new SMTPClient({
      connection: {
        hostname: Deno.env.get("SMTP_HOST") || "",
        port: Number(Deno.env.get("SMTP_PORT") || "587"),
        tls: false,
        auth: {
          username: Deno.env.get("SMTP_USER") || "",
          password: Deno.env.get("SMTP_PASS") || "",
        },
      },
    });

    const body = `New Booking Inquiry

Course/Dive: ${item_title}
Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Preferred Date: ${preferred_date || 'N/A'}
Experience Level: ${experience_level || 'N/A'}
Deposit Amount: ฿${deposit_amount || 0}
Payment Choice: ${payment_choice === 'now' ? 'Pay deposit now via PayPal' : payment_choice === 'none' ? 'Pay later (inquire only)' : 'N/A'}
${paypal_link ? `PayPal Link: ${paypal_link}` : ''}

Message:
${message || 'No message'}`;

    await client.send({
      from: Deno.env.get("SMTP_USER") || "contact@divinginasia.com",
      to: "payments@divinginasia.com",
      subject: `New Booking Inquiry: ${item_title}`,
      content: body,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Email send error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
