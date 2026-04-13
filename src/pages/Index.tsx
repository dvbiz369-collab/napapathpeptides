import { CartProvider } from "@/contexts/CartContext";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProductSection from "@/components/ProductSection";
import QualitySection from "@/components/QualitySection";
import Footer from "@/components/Footer";

const Index = () => (
  <CartProvider>
    <div className="min-h-screen bg-background">
      
      <Navbar />
      <HeroSection />
      <TrustBar />
      <ProductSection />
      <QualitySection />
      <Footer />
    </div>
  </CartProvider>
);

export default Index;
