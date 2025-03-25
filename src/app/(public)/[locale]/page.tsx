import LandingHeader from "@/components/home/LandingHeader";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";
import FAQSection from "@/components/home/FAQSection";

export default function LandingPage() {
  return (
    <div className="relative bg-gradient-to-b from-gray-50/50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
