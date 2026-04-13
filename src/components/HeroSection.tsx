import productImg from "@/assets/product-hero-branded.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import MoleculeStructure from "@/components/MoleculeStructure";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      {/* 3D Molecule Structures */}
      <MoleculeStructure
        className="absolute -right-16 -top-10 w-[200px] h-[200px] md:w-[350px] md:h-[350px] opacity-15 md:opacity-20"
        style={{ animation: "molecule-drift 15s ease-in-out infinite" }}
      />
      <MoleculeStructure
        className="absolute -left-20 bottom-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] opacity-10 md:opacity-15"
        style={{ animation: "molecule-drift-reverse 18s ease-in-out infinite", transform: "rotate(45deg)" }}
      />
      <MoleculeStructure
        className="absolute right-1/4 bottom--10 w-[150px] h-[150px] md:w-[250px] md:h-[250px] opacity-[0.07] md:opacity-10"
        style={{ animation: "molecule-drift 22s ease-in-out infinite 3s", transform: "rotate(-30deg)" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground tracking-widest uppercase">
              {t("hero.badge")}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              {t("hero.title.prefix")}<span className="text-gradient">{t("hero.title.highlight")}</span>{t("hero.title.suffix")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#product" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-red-sm">
                {t("hero.cta.products")}
              </a>
              <a href="#quality" className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-8 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-muted">
                {t("hero.cta.reports")}
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full animate-pulse-glow" />
              <img
                src={productImg}
                alt="NapaPathPeptides Premium Vial"
                className="relative z-10 w-72 md:w-80 rounded-xl drop-shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
