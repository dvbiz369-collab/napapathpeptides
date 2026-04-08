import DisclaimerBanner from "@/components/DisclaimerBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import QualitySection from "@/components/QualitySection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <DisclaimerBanner />
    <Navbar />
    <HeroSection />
    <ProductSection />
    <QualitySection />
    <Footer />
  </div>
);

export default Index;
