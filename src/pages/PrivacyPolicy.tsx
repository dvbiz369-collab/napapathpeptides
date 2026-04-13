import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          {t("policy.back")}
        </Link>
        <h1 className="font-heading text-3xl font-bold mb-8">{t("privacy.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("policy.lastUpdated")}: April 2026</p>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Information We Collect</h2>
            <p>We collect information you provide directly, including your name, email address, shipping address, and payment information when placing an order. We also collect usage data such as IP address, browser type, and pages visited through cookies and analytics tools.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
            <p>Your information is used to process orders, communicate about your purchase, improve our website and services, comply with legal obligations, and prevent fraud. We do not sell, rent, or trade your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal data, including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Cookies</h2>
            <p>Our website uses cookies and similar technologies to enhance your experience, analyze site traffic, and understand user behavior. You can control cookie settings through your browser preferences.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Third-Party Services</h2>
            <p>We may use third-party services for payment processing, analytics, and email communications. These services have their own privacy policies governing the use of your information.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at <a href="mailto:orders@napapathpeptides.com" className="text-primary hover:underline">orders@napapathpeptides.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
