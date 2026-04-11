import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface WaiverModalProps {
  onAccepted: () => void;
}

const disclaimerItems = [
  {
    id: "research",
    title: "Research Use Only",
    text: "All products sold by Napapathpeptides are strictly intended for laboratory research and development purposes only. These products are not intended for use in humans or animals. They are not drugs, food, dietary supplements, or medical devices.",
  },
  {
    id: "no-consumption",
    title: "No Human Consumption",
    text: "You expressly represent and warrant that you will not use, ingest, inject, or otherwise administer any of these products to humans or animals. Any such use is a violation of our terms of sale and is strictly prohibited.",
  },
  {
    id: "professional",
    title: "Professional Use",
    text: "Products are intended to be handled only by qualified, trained professionals or researchers in a controlled laboratory environment. You assume full responsibility for the safe handling, storage, and disposal of these products in accordance with all applicable local, state, and federal laws.",
  },
  {
    id: "no-medical",
    title: "No Medical Advice",
    text: "The information provided on this website is for educational and informational purposes only and does not constitute medical advice, diagnosis, or treatment. Napapathpeptides does not provide guidance on dosage, administration, or efficacy for any human or animal application.",
  },
  {
    id: "indemnification",
    title: "Indemnification",
    text: "By purchasing these products, you agree to indemnify and hold harmless Napapathpeptides, its officers, directors, employees, and agents from and against any and all claims, damages, liabilities, and expenses (including legal fees) arising out of or related to your use, misuse, or handling of these products.",
  },
  {
    id: "compliance",
    title: "Compliance",
    text: "It is the responsibility of the purchaser to ensure that the purchase, possession, and use of these products are compliant with all applicable laws and regulations in their jurisdiction. Napapathpeptides assumes no liability for any legal issues arising from the purchaser's non-compliance.",
  },
];

const WaiverModal = ({ onAccepted }: WaiverModalProps) => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const allChecked = disclaimerItems.every((item) => checked[item.id]);

  const toggleItem = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAccept = async () => {
    if (!allChecked) return;
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-background">
      <div className="flex min-h-full items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl flex flex-col gap-5 rounded-lg border border-border bg-card p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Research Use Only Disclaimer
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            By purchasing from Napapathpeptides, you acknowledge and agree to
            the following terms and conditions:
          </p>

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
                      {idx + 1}. {item.title}
                    </span>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <p className="text-xs text-muted-foreground">
              I have read, understood, and agree to the terms above. I confirm
              that I am purchasing these products for research purposes only and
              not for human or animal consumption.
            </p>
            <Button
              onClick={handleAccept}
              className="w-full"
              disabled={!allChecked || loading}
            >
              {loading ? "Please wait..." : "I Agree & Enter"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaiverModal;
