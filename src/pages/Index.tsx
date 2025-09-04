import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ViagensGrupo from "@/components/ViagensGrupo";

import HistoriasComunidade from "@/components/HistoriasComunidade";
import ConstruaViagem from "@/components/ConstruaViagem";
import ExperienciasSection from "@/components/ExperienciasSection";
import ParceirosSection from "@/components/ParceirosSection";
import CtaComunidade from "@/components/CtaComunidade";
import Footer from "@/components/Footer";
import { Suspense, lazy, useEffect, useRef, useState } from "react";

const MapaInterativo = lazy(() => import("@/components/MapaInterativo"));

const Index = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMapVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ViagensGrupo />

      <HistoriasComunidade />
      <ConstruaViagem />
      <div className="container mx-auto px-4 py-16" ref={mapRef}>
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-brasil bg-clip-text text-transparent">
          Explore Destinos no Mapa
        </h2>
        {isMapVisible && (
          <Suspense fallback={<div className="text-center">Carregando mapa...</div>}>
            <MapaInterativo />
          </Suspense>
        )}
      </div>
      <ExperienciasSection />
      <ParceirosSection />
      <CtaComunidade />
      <Footer />
    </div>
  );
};

export default Index;
