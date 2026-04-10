import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface WaiverModalProps {
  onAccepted: () => void;
}

const WaiverModal = ({ onAccepted }: WaiverModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ waiver_accepted: true })
        .eq("user_id", user.id);
    }
    onAccepted();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center gap-6 rounded-lg border border-border bg-card p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center space-y-3">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Before You Enter
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              By continuing you confirm you are{" "}
              <span className="text-foreground font-medium">21 or older</span>.
              All products on this site are intended strictly for research
              purposes and are{" "}
              <span className="text-foreground font-medium">
                not for human consumption
              </span>
              .
            </p>
          </div>
          <Button
            onClick={handleAccept}
            className="w-full"
            disabled={loading}
          >
            {loading ? "Please wait..." : "I Agree & Enter"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaiverModal;
