import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DestinosDestaque from "@/components/DestinosDestaque";
import ExperienciasSection from "@/components/ExperienciasSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <DestinosDestaque />
      <ExperienciasSection />
      <Footer />
    </div>
  );
};

export default Index;
