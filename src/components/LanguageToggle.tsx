import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className="flex items-center rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-semibold tracking-wide transition-colors hover:bg-muted"
      aria-label="Toggle language"
    >
      <span className={lang === "en" ? "text-foreground" : "text-muted-foreground"}>EN</span>
      <span className="mx-1 text-muted-foreground/40">/</span>
      <span className={lang === "es" ? "text-foreground" : "text-muted-foreground"}>ES</span>
    </button>
  );
};

export default LanguageToggle;
