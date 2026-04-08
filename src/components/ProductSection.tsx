import { Shield, FlaskConical, Snowflake, FileCheck } from "lucide-react";
import productImg from "@/assets/product-dark.png";

const specs = [
  { icon: FlaskConical, label: "Purity", value: "≥99%" },
  { icon: Snowflake, label: "Form", value: "Lyophilized" },
  { icon: Shield, label: "Testing", value: "Third-Party" },
  { icon: FileCheck, label: "COA", value: "Available" },
];

const ProductSection = () => (
  <section id="product" className="py-20 border-t border-border">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Product</h2>
        <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
          One compound. No compromises. Rigorously tested for your research needs.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 glow-red">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="flex justify-center">
              <img src={productImg} alt="BPC-157 / TB-500 Vial" className="w-56 drop-shadow-xl" />
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">NapaPathPeptides101</p>
                <h3 className="font-heading text-2xl font-bold text-foreground">BPC-157 / TB-500 Blend</h3>
                <p className="text-muted-foreground mt-1">20mg Lyophilized Powder</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-lg bg-secondary p-3">
                    <Icon className="h-4 w-4 text-primary mb-1" />
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="text-sm font-semibold text-foreground">{value}</p>
                  </div>
                ))}
              </div>
              <a
                href="mailto:napapathpeptides@gmail.com?subject=Order Inquiry - BPC157/TB500"
                className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                Inquire to Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ProductSection;
