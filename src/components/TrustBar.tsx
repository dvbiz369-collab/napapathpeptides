import { Shield, FlaskConical, BadgeCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TrustBar = () => {
  const { t } = useLanguage();

  const items = [
    { icon: BadgeCheck, label: t("trust.coa") },
    { icon: FlaskConical, label: t("trust.tested") },
    { icon: Shield, label: t("trust.purity") },
  ];

  // Triple the items for seamless loop
  const scrollItems = [...items, ...items, ...items];

  return (
    <section className="border-y border-border bg-card/60 backdrop-blur-sm overflow-hidden">
      <div className="py-4">
        <div className="flex items-center animate-scroll-left w-max">
          {scrollItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground whitespace-nowrap px-8 md:px-12"
            >
              <item.icon className="h-4 w-4 text-primary shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
