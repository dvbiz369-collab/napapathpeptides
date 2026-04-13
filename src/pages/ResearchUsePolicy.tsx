import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ResearchUsePolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          {t("policy.back")}
        </Link>
        <h1 className="font-heading text-3xl font-bold mb-8">{t("ruo.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("policy.lastUpdated")}: April 2026</p>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <p className="text-foreground font-medium">All products sold by NapaPathPeptides are labeled "For Research Use Only — Not for Human or Animal Use" in accordance with 21 CFR 809.10(c).</p>
          </div>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Intended Use</h2>
            <p>Our products are intended exclusively for in-vitro laboratory research and development purposes. They are designed for use by qualified professionals in controlled laboratory environments. These products are not intended for diagnostic, therapeutic, or any clinical application in humans or animals.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Prohibited Uses</h2>
            <p>You may not use, administer, ingest, inject, or otherwise apply any product purchased from NapaPathPeptides to humans or animals. Any such use constitutes a violation of our terms and may violate federal, state, and local laws.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Buyer Responsibility</h2>
            <p>Purchasers are solely responsible for ensuring lawful handling, storage, use, and disposal of all products in compliance with applicable regulations. NapaPathPeptides assumes no liability for misuse or improper handling of products after delivery.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">FDA Compliance</h2>
            <p>Statements on this website have not been evaluated by the FDA. Products are not intended to diagnose, treat, cure, or prevent any disease. No instructions for preparation, administration, or dosage are provided. All products are classified and sold as research chemicals only.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Indemnification</h2>
            <p>By purchasing from NapaPathPeptides, you agree to indemnify and hold harmless NapaPathPeptides and its affiliates from any claims, damages, or expenses arising from misuse, improper handling, or any violation of applicable laws related to products purchased.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ResearchUsePolicy;
