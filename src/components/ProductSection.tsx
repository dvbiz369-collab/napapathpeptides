import productKlow from "@/assets/product-klow.jpg";
import productMotsc from "@/assets/product-motsc.jpg";
import productNad from "@/assets/product-nad.jpg";
import productTb500 from "@/assets/product-tb500.jpg";
import productReta from "@/assets/product-reta.jpg";
import productSs31 from "@/assets/product-ss31.jpg";
import productCjc from "@/assets/product-cjc.jpg";
import productTesamorelin from "@/assets/product-tesamorelin.jpg";
import productGhkcu from "@/assets/product-ghkcu.jpg";
import productSelank from "@/assets/product-selank.jpg";
import productGlutathione from "@/assets/product-glutathione.jpg";

const products = [
  { name: "Klow", dose: "80mg", volume: "3ml", img: productKlow },
  { name: "Mots-C", dose: "40mg", volume: "5ml", img: productMotsc },
  { name: "NAD+", dose: "400mg", volume: "20ml", img: productNad },
  { name: "TB500 / BPC-157", dose: "20mg (10mg ea)", volume: "3ml", img: productTb500 },
  { name: "Reta", dose: "20mg", volume: "2ml", img: productReta },
  { name: "SS-31", dose: "50mg", volume: "3ml", img: productSs31 },
  { name: "CJC-1295 / Ipamorelin", dose: "20mg (10mg ea)", volume: "3ml", img: productCjc },
  { name: "Tesamorelin", dose: "20mg", volume: "3ml", img: productTesamorelin },
  { name: "GHK-Cu", dose: "100mg", volume: "3ml", img: productGhkcu },
  { name: "Selank / Semax", dose: "10mg (5mg ea)", volume: "3ml", img: productSelank },
  { name: "Glutathione", dose: "200mg per/ml", volume: "3ml", img: productGlutathione },
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

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(({ name, dose, volume, img }) => (
          <div
            key={name}
            className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
          >
            <div className="aspect-[3/4] overflow-hidden bg-background">
              <img
                src={img}
                alt={`${name} peptide vial`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground">{name}</h3>
                <p className="text-xs text-muted-foreground">{dose} · {volume}</p>
              </div>
              <a
                href={`mailto:napapathpeps@icloud.com?subject=Order Inquiry – ${name}`}
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Inquire to Order
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductSection;
