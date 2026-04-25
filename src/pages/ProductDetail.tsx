import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Check, FlaskConical, Atom, Snowflake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { productTimelines } from "@/data/productTimelines";
import { productDetails } from "@/data/productDetails";
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

const productCatalog: Record<
  string,
  { name: string; dose: string; volume: string; img: string; price: number; timelineKey: string }
> = {
  klow: { name: "Klow", dose: "80mg", volume: "3ml", img: productKlow, price: 225, timelineKey: "klow" },
  motsc: { name: "Mots-C", dose: "40mg", volume: "5ml", img: productMotsc, price: 200, timelineKey: "motsc" },
  nad: { name: "NAD+", dose: "4000mg", volume: "20ml", img: productNad, price: 350, timelineKey: "nad" },
  tb500: { name: "TB500 / BPC-157", dose: "20mg (10mg ea)", volume: "3ml", img: productTb500, price: 150, timelineKey: "tb500" },
  reta: { name: "Reta", dose: "20mg", volume: "2ml", img: productReta, price: 300, timelineKey: "reta" },
  ss31: { name: "SS-31", dose: "50mg", volume: "3ml", img: productSs31, price: 250, timelineKey: "ss31" },
  cjc: { name: "CJC-1295 / Ipamorelin", dose: "20mg (10mg ea)", volume: "3ml", img: productCjc, price: 150, timelineKey: "cjc" },
  tesamorelin: { name: "Tesamorelin", dose: "20mg", volume: "3ml", img: productTesamorelin, price: 150, timelineKey: "tesamorelin" },
  ghkcu: { name: "GHK-Cu", dose: "100mg", volume: "3ml", img: productGhkcu, price: 150, timelineKey: "ghkcu" },
  selank: { name: "Selank / Semax", dose: "10mg (5mg ea)", volume: "3ml", img: productSelank, price: 110, timelineKey: "selank" },
  glutathione: { name: "Glutathione", dose: "200mg per/ml", volume: "", img: productGlutathione, price: 150, timelineKey: "glutathione" },
  epithalon: { name: "Epithalon", dose: "50mg", volume: "3ml", img: productEpithalon, price: 150, timelineKey: "epithalon" },
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const product = slug ? productCatalog[slug] : undefined;
  if (!product) return <Navigate to="/" replace />;

  const timeline = productTimelines[product.timelineKey];
  const details = productDetails[product.timelineKey];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            to="/#product"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("productDetail.back")}
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="rounded-2xl overflow-hidden border border-border bg-card aspect-[3/4]">
              <img
                src={product.img}
                alt={`${product.name} peptide vial`}
                className="w-full h-full object-cover object-[center_54%]"
              />
            </div>

            <div className="flex flex-col">
              <span className="inline-block self-start rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-medium text-muted-foreground tracking-widest uppercase mb-3">
                {t("products.badge")}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-2">
                {product.dose}{product.volume ? ` · ${product.volume}` : ""}
              </p>

              <div className="flex items-baseline gap-2 mt-5">
                <span className="text-3xl font-bold text-primary">${product.price}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">USD</span>
              </div>

              <button
                onClick={() => addToCart(product.name, product.price)}
                className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 glow-red-sm"
              >
                <ShoppingCart className="h-4 w-4" />
                {t("products.addToCart")}
              </button>

              <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
                <div className="bg-gradient-to-b from-primary/15 to-transparent px-5 pt-4 pb-3 border-b border-border">
                  <p className="text-[10px] uppercase tracking-widest text-primary/90 font-semibold">
                    {t("products.benefits")}
                  </p>
                  <h2 className="font-heading text-lg font-bold text-foreground mt-0.5">
                    {t("products.timeline.heading")}
                  </h2>
                </div>
                <ol className="relative px-5 py-4 space-y-4">
                  {timeline?.phases.map((phase, idx) => (
                    <li key={idx} className="relative pl-5">
                      <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]" />
                      {idx < (timeline.phases.length - 1) && (
                        <span className="absolute left-[3px] top-4 bottom-[-16px] w-px bg-border" />
                      )}
                      <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                        {t(phase.labelKey)}
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground mt-1">
                        {t(phase.textKey)}
                      </p>
                    </li>
                  ))}
                </ol>
                {timeline?.taglineKey && (
                  <div className="px-5 pb-4 pt-2 border-t border-border">
                    <p className="text-[10px] uppercase tracking-widest text-primary/90 font-semibold leading-snug">
                      » {t(timeline.taglineKey)}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-muted-foreground mt-6 leading-relaxed">
                {t("productDetail.disclaimer")}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
