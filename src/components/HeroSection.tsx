import productImg from "@/assets/product-hero.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden py-20 md:py-32">
    {/* Subtle grid background */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
      backgroundSize: "60px 60px"
    }} />
    {/* Red glow accent */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground tracking-widest uppercase">
            Research Grade Peptides
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Premium <span className="text-gradient">Peptides</span> for Research
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            High-purity lyophilized peptides. Third-party tested. Certificate of Analysis with every order.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#product" className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-red-sm">
              View Products
            </a>
            <a href="#quality" className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary px-8 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-muted">
              Lab Reports
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

export default HeroSection;
