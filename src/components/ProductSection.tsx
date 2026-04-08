import { FlaskConical } from "lucide-react";
import productImg from "@/assets/product-hero.jpg";

const products = [
  { name: "Klow", dose: "80mg", volume: "3ml" },
  { name: "Mots-C", dose: "40mg", volume: "5ml" },
  { name: "NAD+", dose: "400mg", volume: "20ml" },
  { name: "TB500 / BPC-157", dose: "20mg (10mg ea)", volume: "3ml" },
  { name: "Reta", dose: "20mg", volume: "2ml" },
  { name: "SS-31", dose: "50mg", volume: "3ml" },
  { name: "CJC-1295 / Ipamorelin", dose: "20mg (10mg ea)", volume: "3ml" },
  { name: "Tesamorelin", dose: "20mg", volume: "3ml" },
  { name: "GHK-Cu", dose: "100mg", volume: "3ml" },
  { name: "Selank / Semax", dose: "10mg (5mg ea)", volume: "3ml" },
  { name: "Glutathione", dose: "200mg per/ml", volume: "3ml" },
];

const ProductSection = () => (
  <section id="product" className="py-20 border-t border-border">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Products</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          Research-grade peptides. Rigorously tested. Third-party verified for purity and potency.
        </p>
      </div>

      {/* Hero product image */}
      <div className="flex justify-center mb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/10 blur-[80px] rounded-full" />
          <img
            src={productImg}
            alt="NapaPathPeptides Vial"
            className="relative z-10 w-64 md:w-72 rounded-xl drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(({ name, dose, volume }) => (
          <div
            key={name}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:glow-red-sm"
          >
            <div className="flex items-start gap-3">
              <FlaskConical className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <h3 className="font-heading text-sm font-bold text-foreground">{name}</h3>
                <p className="text-xs text-muted-foreground">{dose} · {volume}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="mailto:napapathpeps@icloud.com?subject=Order Inquiry"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-10 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-red-sm"
        >
          Inquire to Order
        </a>
        <p className="mt-3 text-xs text-muted-foreground">Email us for pricing and availability</p>
      </div>
    </div>
  </section>
);

export default ProductSection;
