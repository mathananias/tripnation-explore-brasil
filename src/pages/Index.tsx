import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ViagensGrupo from "@/components/ViagensGrupo";

import HistoriasComunidade from "@/components/HistoriasComunidade";
import ConstruaViagem from "@/components/ConstruaViagem";
import ExperienciasSection from "@/components/ExperienciasSection";
import ParceirosSection from "@/components/ParceirosSection";
import CtaComunidade from "@/components/CtaComunidade";
import Footer from "@/components/Footer";
import MapaInterativo from "@/components/MapaInterativo";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ViagensGrupo />
      
      <HistoriasComunidade />
      <ConstruaViagem />
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-brasil bg-clip-text text-transparent">
          Explore Destinos no Mapa
        </h2>
        <MapaInterativo />
      </div>
      <ExperienciasSection />
      <ParceirosSection />
      <CtaComunidade />
      <Footer />
    </div>
  );
};

export default Index;
