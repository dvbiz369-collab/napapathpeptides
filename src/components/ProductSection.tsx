import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
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
import productEpithalon from "@/assets/product-epithalon.jpg";

const products = [
  { name: "Klow", dose: "80mg", volume: "3ml", img: productKlow, price: 225 },
  { name: "Mots-C", dose: "40mg", volume: "5ml", img: productMotsc, price: 200 },
  { name: "NAD+", dose: "4000mg", volume: "20ml", img: productNad, price: 350 },
  { name: "TB500 / BPC-157", dose: "20mg (10mg ea)", volume: "3ml", img: productTb500, price: 150 },
  { name: "Reta", dose: "20mg", volume: "2ml", img: productReta, price: 300 },
  { name: "SS-31", dose: "50mg", volume: "3ml", img: productSs31, price: 250 },
  { name: "CJC-1295 / Ipamorelin", dose: "20mg (10mg ea)", volume: "3ml", img: productCjc, price: 150 },
  { name: "Tesamorelin", dose: "20mg", volume: "3ml", img: productTesamorelin, price: 150 },
  { name: "GHK-Cu", dose: "100mg", volume: "3ml", img: productGhkcu, price: 150 },
  { name: "Selank / Semax", dose: "10mg (5mg ea)", volume: "3ml", img: productSelank, price: 110 },
  { name: "Glutathione", dose: "200mg per/ml", volume: "", img: productGlutathione, price: 150 },
  { name: "Epithalon", dose: "50mg", volume: "3ml", img: productEpithalon, price: 150 },
];

const ProductSection = () => {
  const { addToCart } = useCart();

  return (
    <section id="product" className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">
            Catalog
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Products</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Research-grade peptides. Rigorously tested. Third-party verified for purity and potency.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {products.map(({ name, dose, volume, img, price }) => (
            <div
              key={name}
              className="group relative rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/40 hover:shadow-[0_0_24px_hsl(var(--primary)/0.12)]"
            >
              {price && (
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 rounded-lg bg-primary px-2 py-1 sm:px-3 sm:py-1.5 shadow-lg">
                  <span className="text-xs sm:text-sm font-bold text-primary-foreground">${price}</span>
                </div>
              )}

              <div className="aspect-[3/4] overflow-hidden bg-background">
                <img
                  src={img}
                  alt={`${name} peptide vial`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                <div>
                  <h3 className="font-heading text-xs sm:text-sm font-bold text-foreground leading-tight">{name}</h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{dose}{volume ? ` · ${volume}` : ""}</p>
                </div>
                <button
                  onClick={() => addToCart(name, price)}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs font-semibold text-primary-foreground transition-all hover:brightness-110 glow-red-sm"
                >
                  <ShoppingCart className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
