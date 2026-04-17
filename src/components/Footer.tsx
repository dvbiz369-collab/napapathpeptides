import { Link } from "react-router-dom";
import logo from "@/assets/pathway-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="border-t border-border bg-card">
      {/* Disclaimer strip */}
      <div className="border-b border-border py-4">
        <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto px-4">
          {t("footer.research")}
        </p>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand + email */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Pathway Cellular" className="h-9 w-9 object-contain" />
              <div className="flex flex-col leading-none">
                <span className="font-heading text-base font-bold tracking-[0.18em] text-foreground">
                  PATHWAY
                </span>
                <span className="font-heading text-[10px] font-light tracking-[0.32em] text-muted-foreground">
                  CELLULAR
                </span>
              </div>
            </div>
            <a
              href="mailto:orders@napapathpeptides.com"
              className="inline-block text-sm text-primary hover:underline"
            >
              orders@napapathpeptides.com
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="#product" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.shop")}
                </a>
              </li>
              <li>
                <a href="#quality" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.quality")}
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              {t("footer.support")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:orders@napapathpeptides.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.contactUs")}
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-primary uppercase tracking-wider mb-4">
              {t("footer.policies")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.tos")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.shippingPolicy")}
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.refundPolicy")}
                </Link>
              </li>
              <li>
                <Link to="/research-use-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("footer.ruoPolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* No refund text */}
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-[11px] text-muted-foreground/70 leading-relaxed max-w-xl mx-auto">
            {t("footer.noRefundText")}
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NapaPathPeptides. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
