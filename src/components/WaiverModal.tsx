import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WaiverModalProps {
  onAccepted: () => void;
}

const WaiverModal = ({ onAccepted }: WaiverModalProps) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();

  const disclaimerItems = [
    { id: "research", titleKey: "waiver.research.title", textKey: "waiver.research.text" },
    { id: "no-consumption", titleKey: "waiver.noconsumption.title", textKey: "waiver.noconsumption.text" },
    { id: "professional", titleKey: "waiver.professional.title", textKey: "waiver.professional.text" },
    { id: "no-medical", titleKey: "waiver.nomedical.title", textKey: "waiver.nomedical.text" },
    { id: "indemnification", titleKey: "waiver.indemnification.title", textKey: "waiver.indemnification.text" },
    { id: "compliance", titleKey: "waiver.compliance.title", textKey: "waiver.compliance.text" },
  ];

  const allChecked = disclaimerItems.every((item) => checked[item.id]);

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAccept = async () => {
    if (!allChecked) return;
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").update({ waiver_accepted: true }).eq("user_id", user.id);
    }
    onAccepted();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-background">
      <div className="flex min-h-full items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl flex flex-col gap-5 rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">{t("waiver.title")}</h2>
          </div>

          <p className="text-sm text-muted-foreground">{t("waiver.intro")}</p>

          <div className="space-y-4">
            {disclaimerItems.map((item, idx) => (
              <label
                key={item.id}
                className={`flex cursor-pointer gap-3 rounded-md border p-4 transition-colors ${
                  checked[item.id]
                    ? "border-primary/40 bg-primary/5"
                    : "border-border bg-background hover:border-muted-foreground/30"
                }`}
              >
                <Checkbox
                  checked={!!checked[item.id]}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="mt-0.5 shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-sm font-medium text-foreground">
                    {idx + 1}. {t(item.titleKey)}
                  </span>
                  <p className="text-xs leading-relaxed text-muted-foreground">{t(item.textKey)}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-xs text-muted-foreground">{t("waiver.agree")}</p>
            <Button onClick={handleAccept} className="w-full" disabled={!allChecked || loading}>
              {loading ? t("auth.pleaseWait") : t("waiver.accept")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiverModal;
