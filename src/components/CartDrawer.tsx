import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle, Mail, MessageSquare } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [sending, setSending] = useState(false);
  const [customerName, setCustomerName] = useState<string | null>(null);

  const langNote = lang === "es"
    ? "[Customer prefers to communicate in Spanish — please respond in Spanish]"
    : "[Customer prefers to communicate in English — please respond in English]";

  const sendConfirmationEmail = async () => {
    try {
      setSending(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) return;

      const cartItems = items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      }));

      await supabase.functions.invoke("send-order-confirmation", {
        body: {
          recipientEmail: user.email,
          customerName: user.user_metadata?.full_name || user.user_metadata?.name || null,
          cartItems,
          totalPrice,
          preferredLanguage: lang,
          languageNote: langNote,
        },
      });
    } catch (e) {
      console.error("Failed to send confirmation email:", e);
    } finally {
      setSending(false);
    }
  };

  const buildSmsBody = () => {
    const itemList = items.map((i) => `${i.name} x${i.quantity}`).join(", ");
    const name = customerName || "a customer";
    return `${langNote}\n\nHi, I just submitted an inquiry for: ${itemList}. Total: $${totalPrice}. Please confirm availability for ${name}.`;
  };

  const handleInquiryWithName = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCustomerName(user?.user_metadata?.full_name || user?.user_metadata?.name || null);
    await sendConfirmationEmail();
    setConfirmed(true);
  };

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && confirmed) {
      clearCart();
      setConfirmed(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetTrigger asChild>
        <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors" aria-label="Open cart">
          <ShoppingCart className="h-5 w-5 text-muted-foreground" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-card border-border flex flex-col">
        {confirmed ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center px-4 gap-5">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground">{t("cart.inquirySent")}</h3>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{t("cart.emailOnWay")}</p>
            <a href={`sms:7078047057&body=${encodeURIComponent(buildSmsBody())}`} className="w-full">
              <Button className="w-full glow-red-sm text-base py-6" size="lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                {t("cart.textConfirm")}
              </Button>
            </a>
            <Button variant="ghost" onClick={() => handleClose(false)} className="w-full text-muted-foreground">
              {t("cart.continueBrowsing")}
            </Button>
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle className="font-heading text-foreground">{t("cart.title")}</SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">{t("cart.empty")}</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-3 mt-4 pr-1">
                  {items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background p-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">${item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.name, -1)}
                          className="h-7 w-7 flex items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, 1)}
                          className="h-7 w-7 flex items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.name)}
                          className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{t("cart.total")}</span>
                    <span className="text-lg font-bold text-foreground">${totalPrice}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-widest">{t("cart.requestOrder")}</p>
                    <Button onClick={() => handleInquiryWithName()} disabled={sending} className="w-full glow-red-sm">
                      <Mail className="h-4 w-4 mr-2" />
                      {t("cart.sendInquiry")}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
