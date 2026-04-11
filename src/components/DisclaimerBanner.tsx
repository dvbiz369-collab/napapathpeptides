import { useLanguage } from "@/contexts/LanguageContext";

const DisclaimerBanner = () => {
  const { t } = useLanguage();
  return (
    <div className="w-full bg-primary py-2 px-4 text-center">
      <p className="text-sm font-medium tracking-wide text-primary-foreground">
        {t("disclaimer.banner")}
      </p>
    </div>
  );
};

export default DisclaimerBanner;
