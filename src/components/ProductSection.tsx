import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
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
import productAod9604 from "@/assets/product-aod9604.jpg";
import productSermorelin from "@/assets/product-sermorelin.jpg";
import productSlupp332 from "@/assets/product-slupp332.jpg";
import productSma from "@/assets/product-sma.jpg";
import productSnap8 from "@/assets/product-snap8.jpg";
import productThymalin from "@/assets/product-thymalin.jpg";
import productTha1 from "@/assets/product-tha1.jpg";
import productTeamo from "@/assets/product-teamo.jpg";
import productTesaIpa from "@/assets/product-tesa-ipa.jpg";
import productTha1Thymulin from "@/assets/product-tha1-thymulin.jpg";
import productTha1ThymulinKpv from "@/assets/product-tha1-thymulin-kpv.jpg";
import productTrz from "@/assets/product-trz.jpg";
import productVip from "@/assets/product-vip.jpg";
import productHexarelin from "@/assets/product-hexarelin.jpg";
import productHumanin from "@/assets/product-humanin.jpg";
import productIgf1lr3 from "@/assets/product-igf1lr3.jpg";
import productIpamorelin from "@/assets/product-ipamorelin.jpg";
import productIpaSermo from "@/assets/product-ipa-sermo.jpg";
import productKisspeptin from "@/assets/product-kisspeptin.jpg";
import productKlowPlus from "@/assets/product-klow-plus.jpg";
import productKpv from "@/assets/product-kpv.jpg";
import productLl37 from "@/assets/product-ll37.jpg";
import productMazdutide from "@/assets/product-mazdutide.jpg";
import productMelanotan1 from "@/assets/product-melanotan1.jpg";
import productMt2 from "@/assets/product-mt2.jpg";
import productOxytocin from "@/assets/product-oxytocin.jpg";
import productPegMgf from "@/assets/product-pegmgf.jpg";
import productPinealon from "@/assets/product-pinealon.jpg";
import productProstamax from "@/assets/product-prostamax.jpg";
import productPt141 from "@/assets/product-pt141.jpg";
import productPt141Blend from "@/assets/product-pt141-blend.jpg";
import productRta from "@/assets/product-rta.jpg";
import productSelankSolo from "@/assets/product-selank-solo.jpg";
import productSemaxSolo from "@/assets/product-semax-solo.jpg";
import labBackground from "@/assets/lab-background.jpg";

const products = [
  { name: "Klow", dose: "80mg", volume: "3ml", img: productKlow, price: 225, slug: "klow" },
  { name: "Mots-C", dose: "40mg", volume: "5ml", img: productMotsc, price: 200, slug: "motsc" },
  { name: "NAD+", dose: "4000mg", volume: "20ml", img: productNad, price: 350, slug: "nad" },
  { name: "TB500 / BPC-157", dose: "20mg (10mg ea)", volume: "3ml", img: productTb500, price: 150, slug: "tb500" },
  { name: "Reta", dose: "20mg", volume: "2ml", img: productReta, price: 300, slug: "reta" },
  { name: "SS-31", dose: "50mg", volume: "3ml", img: productSs31, price: 250, slug: "ss31" },
  { name: "CJC-1295 / Ipamorelin", dose: "20mg (10mg ea)", volume: "3ml", img: productCjc, price: 150, slug: "cjc" },
  { name: "Tesamorelin", dose: "20mg", volume: "3ml", img: productTesamorelin, price: 150, slug: "tesamorelin" },
  { name: "GHK-Cu", dose: "100mg", volume: "3ml", img: productGhkcu, price: 150, slug: "ghkcu" },
  { name: "Selank / Semax", dose: "10mg (5mg ea)", volume: "3ml", img: productSelank, price: 110, slug: "selank" },
  { name: "Glutathione", dose: "4000mg", volume: "20ml", img: productGlutathione, price: 150, slug: "glutathione" },
  { name: "Epithalon", dose: "50mg", volume: "3ml", img: productEpithalon, price: 150, slug: "epithalon" },
  { name: "AOD-9604", dose: "5mg", volume: "3ml", img: productAod9604, price: 135, slug: "aod9604" },
  { name: "Sermorelin", dose: "10mg", volume: "3ml", img: productSermorelin, price: 124, slug: "sermorelin" },
  { name: "SLU-PP-332", dose: "5mg", volume: "3ml", img: productSlupp332, price: 180, slug: "slupp332" },
  { name: "SMA", dose: "5mg", volume: "3ml", img: productSma, price: 164, slug: "sma" },
  { name: "SNAP-8", dose: "20mg", volume: "3ml", img: productSnap8, price: 160, slug: "snap8" },
  { name: "Thymalin", dose: "10mg", volume: "3ml", img: productThymalin, price: 66, slug: "thymalin" },
  { name: "Thymosin Alpha-1", dose: "5mg", volume: "3ml", img: productTha1, price: 124, slug: "tha1" },
  { name: "TEAMO", dose: "31mg (Tesa 15 / MOTS-C 10 / AOD 6)", volume: "5ml", img: productTeamo, price: 220, slug: "teamo" },
  { name: "Tesamorelin / Ipamorelin", dose: "20mg (10mg ea)", volume: "3ml", img: productTesaIpa, price: 152, slug: "tesa-ipa" },
  { name: "Thymosin A-1 / Thymulin", dose: "16mg (10mg / 6mg)", volume: "5ml", img: productTha1Thymulin, price: 162, slug: "tha1-thymulin" },
  { name: "Thymosin A-1 / Thymulin / KPV", dose: "21mg (10mg / 6mg / 5mg)", volume: "5ml", img: productTha1ThymulinKpv, price: 190, slug: "tha1-thymulin-kpv" },
  { name: "TRZ", dose: "5mg", volume: "3ml", img: productTrz, price: 164, slug: "trz" },
  { name: "VIP", dose: "5mg", volume: "3ml", img: productVip, price: 104, slug: "vip" },
  { name: "Hexarelin", dose: "2mg", volume: "3ml", img: productHexarelin, price: 54, slug: "hexarelin" },
  { name: "Humanin", dose: "10mg", volume: "3ml", img: productHumanin, price: 280, slug: "humanin" },
  { name: "IGF-1 LR3", dose: "0.1mg", volume: "3ml", img: productIgf1lr3, price: 86, slug: "igf1lr3" },
  { name: "Ipamorelin", dose: "5mg", volume: "3ml", img: productIpamorelin, price: 96, slug: "ipamorelin" },
  { name: "Ipamorelin / Sermorelin", dose: "10mg (5mg ea)", volume: "3ml", img: productIpaSermo, price: 64, slug: "ipa-sermo" },
  { name: "Kisspeptin", dose: "10mg", volume: "3ml", img: productKisspeptin, price: 124, slug: "kisspeptin" },
  
  { name: "KPV", dose: "5mg", volume: "3ml", img: productKpv, price: 96, slug: "kpv" },
  { name: "LL-37", dose: "5mg", volume: "3ml", img: productLl37, price: 126, slug: "ll37" },
  { name: "Mazdutide", dose: "10mg", volume: "3ml", img: productMazdutide, price: 210, slug: "mazdutide" },
  { name: "Melanotan 1", dose: "10mg", volume: "3ml", img: productMelanotan1, price: 84, slug: "melanotan1" },
  { name: "MT-2", dose: "10mg", volume: "3ml", img: productMt2, price: 108, slug: "mt2" },
  { name: "Oxytocin", dose: "2mg", volume: "3ml", img: productOxytocin, price: 86, slug: "oxytocin" },
  { name: "PEG MGF", dose: "5mg", volume: "3ml", img: productPegMgf, price: 74, slug: "pegmgf" },
  { name: "Pinealon", dose: "5mg", volume: "3ml", img: productPinealon, price: 74, slug: "pinealon" },
  { name: "Prostamax", dose: "20mg", volume: "3ml", img: productProstamax, price: 120, slug: "prostamax" },
  { name: "PT-141", dose: "10mg", volume: "3ml", img: productPt141, price: 94, slug: "pt141" },
  { name: "PT-141 / Kisspeptin / Pinealon", dose: "10mg (5mg / 2mg / 3mg)", volume: "3ml", img: productPt141Blend, price: 172, slug: "pt141-blend" },
  { name: "RTA", dose: "10mg", volume: "3ml", img: productRta, price: 264, slug: "rta" },
  { name: "Selank", dose: "5mg", volume: "3ml", img: productSelankSolo, price: 64, slug: "selank-solo" },
  { name: "Semax", dose: "5mg", volume: "3ml", img: productSemaxSolo, price: 54, slug: "semax-solo" },
];

const ProductSection = () => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  return (
    <section id="product" className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground tracking-widest uppercase mb-4">
            {t("products.badge")}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("products.title")}</h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            {t("products.subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {products.map(({ name, dose, volume, img, price, slug }) => (
            <div
              key={name}
              className="group relative rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/40 hover:shadow-[0_0_24px_hsl(var(--primary)/0.12)]"
            >
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                {price && (
                  <div className="rounded-lg bg-primary px-2 py-1 sm:px-3 sm:py-1.5 shadow-lg">
                    <span className="text-xs sm:text-sm font-bold text-primary-foreground">${price}</span>
                  </div>
                )}
              </div>

              <div className="relative aspect-[3/4] overflow-hidden bg-background">
                <img
                  src={img}
                  alt={`${name} peptide vial`}
                  className="relative w-full h-full object-cover object-[center_54%] transition-transform duration-500 group-hover:scale-105"
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
                  {t("products.addToCart")}
                </button>
                <Link
                  to={`/product/${slug}`}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-secondary border border-border px-3 py-2 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs font-semibold text-muted-foreground transition-all hover:text-foreground hover:border-primary/40"
                >
                  {t("products.learnMore")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
