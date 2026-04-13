import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const RefundPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          {t("policy.back")}
        </Link>
        <h1 className="font-heading text-3xl font-bold mb-8">{t("refund.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("policy.lastUpdated")}: April 2026</p>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <h2 className="text-lg font-bold text-destructive mb-2">No Refund Policy</h2>
            <p className="text-foreground font-medium">All sales are final. Due to the nature of research compounds, we do not offer refunds, returns, or exchanges.</p>
          </div>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Why No Refunds?</h2>
            <p>Research-grade peptides require strict handling, storage, and chain-of-custody protocols. Once a product leaves our facility, we cannot verify that it has been stored or handled properly. To maintain the integrity and safety of our products for all customers, we are unable to accept returns.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Damaged or Defective Products</h2>
            <p>If you receive a product that is damaged during shipping or appears defective, please contact us within 48 hours of delivery at <a href="mailto:orders@napapathpeptides.com" className="text-primary hover:underline">orders@napapathpeptides.com</a> with photos of the damage. We will evaluate the claim and may offer a replacement at our sole discretion.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Order Cancellations</h2>
            <p>Orders may be cancelled within 1 hour of placement, provided they have not yet been processed. Contact us immediately if you need to cancel. Once an order has been shipped, it cannot be cancelled.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Acknowledgement</h2>
            <p>By completing your purchase, you acknowledge and agree to this No Refund Policy. This policy is in place to ensure product integrity and protect the safety of the research community.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
