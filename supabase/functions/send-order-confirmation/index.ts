import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const EMAIL_STYLE = `
  body { font-family: 'Georgia', 'Times New Roman', serif; background: #f5f5f0; color: #1a1a1a; padding: 40px 20px; margin: 0; }
  .container { max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 2px; padding: 0; border: 1px solid #e0e0e0; }
  .header { background: #0d0d0d; padding: 28px 32px; }
  .header h1 { font-size: 18px; margin: 0; color: #ffffff; font-weight: 600; letter-spacing: 0.5px; }
  .header p { font-size: 12px; color: #999; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px; }
  .body-content { padding: 32px; }
  .greeting { font-size: 15px; color: #333; margin: 0 0 20px; line-height: 1.6; }
  .section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #999; margin: 24px 0 12px; font-family: Arial, sans-serif; font-weight: 600; }
  .items-table { width: 100%; border-collapse: collapse; }
  .items-table td { padding: 10px 0; font-size: 14px; color: #333; border-bottom: 1px solid #f0f0f0; }
  .items-table .item-name { font-weight: 500; }
  .items-table .item-qty { color: #888; text-align: center; width: 50px; }
  .items-table .item-price { text-align: right; font-family: 'Courier New', monospace; }
  .total-row { border-top: 2px solid #0d0d0d; margin-top: 8px; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; }
  .total-label { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #666; font-family: Arial, sans-serif; font-weight: 600; }
  .total-amount { font-size: 22px; font-weight: 700; color: #0d0d0d; font-family: 'Courier New', monospace; }
  .notice { margin-top: 28px; padding: 16px; background: #fafafa; border-left: 3px solid #dc2626; font-size: 13px; color: #555; line-height: 1.6; }
  .footer { padding: 20px 32px; background: #fafafa; border-top: 1px solid #eee; font-size: 11px; color: #999; text-align: center; }
  .brand { color: #dc2626; font-weight: 700; }
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

    const { recipientEmail, customerName, cartItems, totalPrice, preferredLanguage, languageNote } = await req.json();

    if (!recipientEmail || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    const displayName = customerName || recipientEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

    const itemsHtml = cartItems
      .map((item: { name: string; quantity: number; price: number }) =>
        `<tr>
          <td class="item-name">${item.name}</td>
          <td class="item-qty">×${item.quantity}</td>
          <td class="item-price">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>`
      )
      .join("");

    const formattedTotal = Number(totalPrice).toFixed(2);

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${EMAIL_STYLE}</style></head><body>
      <div class="container">
        <div class="header">
          <h1>Research Inquiry Received</h1>
          <p>Napapath Peptides</p>
        </div>
        <div class="body-content">
          <p class="greeting">Dear ${displayName},</p>
          <p class="greeting">Thank you for your inquiry. We have received the following request and will be in touch shortly to confirm availability, pricing, and payment details.</p>

          <div class="section-label">Inquiry Summary</div>
          <table class="items-table">
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="total-row">
            <span class="total-label">Estimated Total</span>
            <span class="total-amount">$${formattedTotal}</span>
          </div>

          <div class="notice">
            <strong>What happens next?</strong><br/>
            A member of our team will review your inquiry and reach out within 24 hours to confirm product availability, finalize pricing, and arrange payment. No charges have been made at this time.
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} <span class="brand">Napapath Peptides</span> &mdash; Research chemicals for laboratory use only.
        </div>
      </div>
    </body></html>`;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Napapath Peptides <orders@mail.napapathpeptides.com>",
        to: [recipientEmail],
        bcc: ["orders@napapathpeptides.com"],
        subject: `Your Napapath Peptides Research Inquiry - $${formattedTotal}`,
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
    console.error("Edge function caught error:", err?.message || err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
