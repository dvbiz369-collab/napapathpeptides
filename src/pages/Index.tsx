import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProductSection from "@/components/ProductSection";
import QualitySection from "@/components/QualitySection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <TrustBar />
    <ProductSection />
    <QualitySection />
    <Footer />
  </div>
);

export default Index;
