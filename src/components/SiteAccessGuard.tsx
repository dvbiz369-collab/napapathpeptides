import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AccessCodeGate from "./AccessCodeGate";
import AuthGate from "./AuthGate";
import WaiverModal from "./WaiverModal";

type Step = "loading" | "access_code" | "auth" | "waiver" | "done";

interface SiteAccessGuardProps {
  children: React.ReactNode;
}

const SiteAccessGuard = ({ children }: SiteAccessGuardProps) => {
  const [step, setStep] = useState<Step>("loading");

  useEffect(() => {
    checkState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      // Re-check when auth state changes
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkState = async () => {
    // Step 1: Access code
    const accessGranted = localStorage.getItem("npp_access_granted") === "true";
    if (!accessGranted) {
      setStep("access_code");
      return;
    }

    // Step 2: Auth
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setStep("auth");
      return;
    }

    // Step 3: Waiver
    const { data: profile } = await supabase
      .from("profiles")
      .select("waiver_accepted")
      .eq("user_id", session.user.id)
      .single();

    if (!profile?.waiver_accepted) {
      setStep("waiver");
      return;
    }

    setStep("done");
  };

  if (step === "loading") {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (step === "access_code") {
    return <AccessCodeGate onSuccess={() => setStep("auth")} />;
  }

  if (step === "auth") {
    return <AuthGate onSuccess={checkState} />;
  }

  if (step === "waiver") {
    return <WaiverModal onAccepted={() => setStep("done")} />;
  }

  return <>{children}</>;
};

export default SiteAccessGuard;
