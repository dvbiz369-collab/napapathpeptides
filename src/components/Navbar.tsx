import logo from "@/assets/pathway-logo.png";
import CartDrawer from "@/components/CartDrawer";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Pathway Cellular" className="h-10 w-10 object-contain" />
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-heading text-lg font-bold tracking-[0.18em] text-foreground">
              PATHWAY
            </span>
            <span className="font-heading text-xs font-light tracking-[0.32em] text-muted-foreground">
              CELLULAR
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#product" className="hover:text-foreground transition-colors">{t("nav.products")}</a>
            <a href="#quality" className="hover:text-foreground transition-colors">{t("nav.quality")}</a>
            <a href="#contact" className="hover:text-foreground transition-colors">{t("nav.contact")}</a>
          </div>
          <LanguageToggle />
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
