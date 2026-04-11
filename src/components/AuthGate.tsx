import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

interface AuthGateProps {
  onSuccess: () => void;
}

const AuthGate = ({ onSuccess }: AuthGateProps) => {
  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        onSuccess();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) {
        setError(error.message);
      } else {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
        if (loginError) {
          setError(t("auth.accountCreated"));
          setIsLogin(true);
        } else {
          onSuccess();
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="w-full max-w-sm px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-xl font-semibold text-foreground">
              {isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isLogin ? t("auth.signInContinue") : t("auth.createContinue")}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full space-y-3">
            {!isLogin && (
              <Input
                type="text"
                placeholder={t("auth.fullName")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoFocus
              />
            )}
            <Input
              type="email"
              placeholder={t("auth.email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus={isLogin}
            />
            <Input
              type="password"
              placeholder={t("auth.password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("auth.pleaseWait") : isLogin ? t("auth.signIn") : t("auth.signUp")}
            </Button>
          </form>
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isLogin ? t("auth.noAccount") : t("auth.hasAccount")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthGate;
