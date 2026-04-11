import logo from "@/assets/logo.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="NapaPathPeptides" className="h-8 w-8 rounded-full" />
            <span className="font-heading text-lg font-bold text-foreground">
              NapaPath<span className="text-primary">Peptides</span>
            </span>
          </div>
          <div className="text-center max-w-lg space-y-2">
            <p className="text-xs text-muted-foreground">{t("footer.research")}</p>
            <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-md px-3 py-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-destructive">
                {t("footer.noRefund")}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{t("footer.noRefundText")}</p>
          </div>
          <a href="mailto:orders@napapathpeptides.com" className="text-sm text-primary hover:underline">
            orders@napapathpeptides.com
          </a>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NapaPathPeptides. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
