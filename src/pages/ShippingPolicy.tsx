import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ShippingPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          {t("policy.back")}
        </Link>
        <h1 className="font-heading text-3xl font-bold mb-8">{t("shipping.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("policy.lastUpdated")}: April 2026</p>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Processing Times</h2>
            <p>Orders are processed within 1–2 business days. Orders placed on weekends or holidays will be processed the next business day. You will receive a confirmation email with tracking information once your order has shipped.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Shipping Methods</h2>
            <p>We ship via USPS and UPS. Standard shipping typically takes 3–5 business days within the continental United States. Expedited shipping options are available at checkout for an additional fee.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Cold-Chain & Handling</h2>
            <p>All peptides are shipped with appropriate cold-chain packaging to preserve product integrity. Temperature-sensitive items include ice packs and insulated packaging at no additional cost.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Shipping Restrictions</h2>
            <p>We currently ship within the United States only. We do not ship to P.O. boxes for expedited orders. Some products may have additional shipping restrictions based on state or local regulations.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Lost or Damaged Packages</h2>
            <p>If your package is lost or arrives damaged, contact us within 48 hours of the expected delivery date at <a href="mailto:orders@napapathpeptides.com" className="text-primary hover:underline">orders@napapathpeptides.com</a>. We will work with the carrier to resolve the issue promptly.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
