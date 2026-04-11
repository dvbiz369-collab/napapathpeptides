import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const QualitySection = () => {
  const { t } = useLanguage();

  const points = [
    t("quality.1"), t("quality.2"), t("quality.3"),
    t("quality.4"), t("quality.5"), t("quality.6"),
  ];

  return (
    <section id="quality" className="py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("quality.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("quality.subtitle")}</p>
        </div>
        <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-4">
          {points.map((point, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-secondary-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
