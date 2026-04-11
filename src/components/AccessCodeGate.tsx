import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

interface AccessCodeGateProps {
  onSuccess: () => void;
}

const AccessCodeGate = ({ onSuccess }: AccessCodeGateProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === "2026") {
      localStorage.setItem("npp_access_granted", "true");
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="w-full max-w-sm px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-xl font-semibold text-foreground">{t("access.title")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("access.subtitle")}</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-3">
            <Input
              type="text"
              placeholder={t("access.placeholder")}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={error ? "border-destructive" : ""}
              autoFocus
            />
            {error && <p className="text-xs text-destructive">{t("access.invalid")}</p>}
            <Button type="submit" className="w-full">{t("access.continue")}</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccessCodeGate;
