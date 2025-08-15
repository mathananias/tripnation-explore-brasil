import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DestinosDestaque from "@/components/DestinosDestaque";
import ExperienciasSection from "@/components/ExperienciasSection";
import Footer from "@/components/Footer";
import MapaInterativo from "@/components/MapaInterativo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <DestinosDestaque />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-laranja to-amarelo bg-clip-text text-transparent">
          Explore Destinos no Mapa
        </h2>
        <MapaInterativo />
      </div>
      <ExperienciasSection />
      <Footer />
    </div>
  );
};

export default Index;
