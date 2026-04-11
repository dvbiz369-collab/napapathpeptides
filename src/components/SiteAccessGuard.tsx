import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import AccessCodeGate from "./AccessCodeGate";
import AuthGate from "./AuthGate";
import WaiverModal from "./WaiverModal";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SESSION_DURATION_MS = 60 * 60 * 1000; // 1 hour

type Step = "loading" | "access_code" | "auth" | "waiver" | "expired" | "done";

interface SiteAccessGuardProps {
  children: React.ReactNode;
}

const SiteAccessGuard = ({ children }: SiteAccessGuardProps) => {
  const [step, setStep] = useState<Step>("loading");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useLanguage();

  const startSessionTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    localStorage.setItem("npp_session_start", Date.now().toString());
    timerRef.current = setTimeout(() => {
      supabase.auth.signOut();
      setStep("expired");
    }, SESSION_DURATION_MS);
  }, []);

  useEffect(() => {
    checkState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {});

    return () => {
      subscription.unsubscribe();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const checkState = async () => {
    const accessGranted = localStorage.getItem("npp_access_granted") === "true";
    if (!accessGranted) { setStep("access_code"); return; }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setStep("auth"); return; }

    const sessionStart = localStorage.getItem("npp_session_start");
    if (sessionStart) {
      const elapsed = Date.now() - parseInt(sessionStart, 10);
      if (elapsed >= SESSION_DURATION_MS) {
        await supabase.auth.signOut();
        setStep("expired");
        return;
      }
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        supabase.auth.signOut();
        setStep("expired");
      }, SESSION_DURATION_MS - elapsed);
    } else {
      startSessionTimer();
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("waiver_accepted")
      .eq("user_id", session.user.id)
      .single();

    if (!profile?.waiver_accepted) { setStep("waiver"); return; }
    setStep("done");
  };

  const handleSignInAgain = () => {
    localStorage.removeItem("npp_session_start");
    setStep("auth");
  };

  if (step === "loading") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (step === "access_code") return <AccessCodeGate onSuccess={() => setStep("auth")} />;

  if (step === "auth") {
    return <AuthGate onSuccess={() => { startSessionTimer(); checkState(); }} />;
  }

  if (step === "waiver") return <WaiverModal onAccepted={() => setStep("done")} />;

  if (step === "expired") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <div className="w-full max-w-sm px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-semibold text-foreground">{t("session.expired")}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{t("session.expiredText")}</p>
            </div>
            <Button onClick={handleSignInAgain} className="w-full">{t("session.signInAgain")}</Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SiteAccessGuard;
