import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsOfService = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          {t("policy.back")}
        </Link>
        <h1 className="font-heading text-3xl font-bold mb-8">{t("tos.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("policy.lastUpdated")}: April 2026</p>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using NapaPathPeptides.com, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our website or purchase our products.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Research Use Only</h2>
            <p>All products sold on this website are strictly for in-vitro research and laboratory use only. They are not intended for human or animal consumption. Products are not drugs, food, dietary supplements, or medical devices. By purchasing, you confirm you are a qualified researcher or acting on behalf of a research institution.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Eligibility</h2>
            <p>You must be at least 18 years of age to use this site and purchase products. By using this site, you represent and warrant that you meet this age requirement and have the legal capacity to enter into binding agreements.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Product Information</h2>
            <p>We strive to provide accurate product descriptions, specifications, and pricing. However, we do not warrant that product descriptions or other content on this site are error-free. All products are labeled "For Research Use Only — Not for Human or Animal Use" in accordance with 21 CFR 809.10(c).</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Orders & Payment</h2>
            <p>We reserve the right to refuse or cancel any order at our sole discretion. Payment must be completed in full before order processing. Prices are subject to change without notice.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos, and images, is the property of NapaPathPeptides and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Limitation of Liability</h2>
            <p>NapaPathPeptides shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use our products or services. Our total liability shall not exceed the amount paid for the product in question.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the United States. Any disputes shall be resolved in the appropriate courts of jurisdiction.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. Contact</h2>
            <p>For questions about these Terms of Service, contact us at <a href="mailto:orders@napapathpeptides.com" className="text-primary hover:underline">orders@napapathpeptides.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
