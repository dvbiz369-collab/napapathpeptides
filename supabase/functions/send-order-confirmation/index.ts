import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RESEND_GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const EMAIL_STYLE = `
  body { font-family: 'Arial', sans-serif; background: #0d0d0d; color: #f2f2f2; padding: 40px 20px; }
  .container { max-width: 520px; margin: 0 auto; background: #141414; border-radius: 12px; padding: 32px; border: 1px solid #2a2a2a; }
  h1 { font-size: 20px; margin: 0 0 16px; color: #ffffff; }
  p { font-size: 14px; line-height: 1.6; color: #b0b0b0; margin: 0 0 12px; }
  .order-item { padding: 6px 0; font-size: 14px; color: #e0e0e0; }
  .total { font-size: 16px; font-weight: bold; color: #ffffff; margin-top: 16px; padding-top: 12px; border-top: 1px solid #2a2a2a; }
  .footer { margin-top: 28px; font-size: 12px; color: #666; }
  .brand { color: #dc2626; font-weight: bold; }
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const { recipientEmail, orderSummary, totalPrice } = await req.json();

    if (!recipientEmail || !orderSummary || !Array.isArray(orderSummary)) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!RESEND_API_KEY || !LOVABLE_API_KEY) {
      console.error("Missing RESEND_API_KEY or LOVABLE_API_KEY");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const firstName = recipientEmail
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (c: string) => c.toUpperCase());

    const orderHtml = orderSummary
      .map((line: string) => `<div class="order-item">• ${line}</div>`)
      .join("");

    const html = `<!DOCTYPE html><html><head><style>${EMAIL_STYLE}</style></head><body>
      <div class="container">
        <h1>We received your order inquiry</h1>
        <p>Hey ${firstName},</p>
        <p>Thanks for reaching out. We've received your inquiry and will be in touch shortly with everything you need to complete your order.</p>
        <p style="margin-top:20px;font-weight:600;color:#fff;">Here's what you requested:</p>
        ${orderHtml}
        <div class="total">Total: $${totalPrice}</div>
        <p style="margin-top:20px;">We'll confirm availability, pricing, and payment details via email or text. Talk soon.</p>
        <div class="footer">— <span class="brand">Napapath Peptides</span></div>
      </div>
    </body></html>`;

    const resendRes = await fetch(`${RESEND_GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Napapath Peptides <orders@mail.napapathpeptides.com>",
        to: [recipientEmail],
        bcc: ["orders@napapathpeptides.com"],
        subject: "We received your order inquiry — Napapath Peptides",
        html,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("Resend error:", JSON.stringify(resendData));
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    console.log("Email sent successfully:", resendData.id);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
