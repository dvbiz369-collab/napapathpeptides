import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2, CheckCircle, Mail, MessageSquare } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

const CartDrawer = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [sending, setSending] = useState(false);

  const buildOrderSummary = () => {
    const lines = items.map((i) => `- ${i.name} x${i.quantity} — $${i.price * i.quantity}`);
    return `I'd like to inquire about the following order:\n\n${lines.join("\n")}\n\nTotal: $${totalPrice}\n\nPlease confirm availability and next steps.`;
  };

  const sendConfirmationEmail = async () => {
    try {
      setSending(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) return;

      const orderLines = items.map((i) => `${i.name} x${i.quantity} — $${i.price * i.quantity}`);

      await supabase.functions.invoke("send-order-confirmation", {
        body: {
          recipientEmail: user.email,
          orderSummary: orderLines,
          totalPrice,
        },
      });
    } catch (e) {
      console.error("Failed to send confirmation email:", e);
    } finally {
      setSending(false);
    }
  };

  const handleInquiry = async () => {
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
          <div className="flex flex-col items-center justify-center flex-1 text-center px-4 gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground">Inquiry Sent!</h3>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Your inquiry has been received. You'll hear back from us shortly with availability, payment details, and next steps.
            </p>
            <p className="text-xs text-muted-foreground">
              Check your email or texts — we typically respond within a few hours.
            </p>
            <Button onClick={() => handleClose(false)} className="mt-4 w-full glow-red-sm">
              Continue Browsing
            </Button>
          </div>
        ) : (
          <>
            <SheetHeader>
              <SheetTitle className="font-heading text-foreground">Your Cart</SheetTitle>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Your cart is empty.</p>
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
                    <span className="text-sm font-medium text-muted-foreground">Total</span>
                    <span className="text-lg font-bold text-foreground">${totalPrice}</span>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-widest">Request Your Order</p>
                    <Button
                      onClick={() => handleInquiry("email")}
                      disabled={sending}
                      className="w-full glow-red-sm mb-2"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Inquiry via Email
                    </Button>
                    <Button
                      onClick={() => handleInquiry("sms")}
                      disabled={sending}
                      variant="outline"
                      className="w-full border-primary/30 text-foreground hover:bg-primary/10"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send via Text
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
