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
          <div className="relative h-11 w-11 rounded-full border border-primary/40 p-1 shadow-[0_0_12px_hsl(var(--primary)/0.5),inset_0_0_8px_hsl(var(--primary)/0.25)] animate-pulse-glow">
            <img src={logo} alt="Pathway Cellular" className="h-full w-full object-contain" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="font-heading text-lg font-semibold tracking-[0.12em] text-foreground">
              PATHWAY
            </span>
            <span className="font-heading text-sm font-medium tracking-[0.22em] text-primary">
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
