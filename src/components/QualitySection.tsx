import { CheckCircle } from "lucide-react";

const points = [
  "Synthesized in ISO-certified facilities",
  "Third-party HPLC & mass spectrometry verified",
  "Certificate of Analysis included with every order",
  "Proper cold-chain shipping & storage protocols",
  "Consistent batch-to-batch quality",
  "Transparent sourcing & documentation",
];

const QualitySection = () => (
  <section id="quality" className="py-20 border-t border-border">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Quality Assurance</h2>
        <p className="mt-3 text-muted-foreground">
          Every vial meets the highest standards for research-grade peptides.
        </p>
      </div>
      <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
        {points.map((point) => (
          <div key={point} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-secondary-foreground">{point}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default QualitySection;
