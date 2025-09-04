import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/hero-destino-secreto.jpg";
import ChatModal from "@/components/ChatModal";

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <OptimizedImage 
          src={heroImage} 
          alt="Destino secreto brasileiro com lagoa cristalina" 
          className="w-full h-full object-cover"
          lazy={false}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            A Viagem é curta, mas a{" "}
            <span className="bg-gradient-sunset bg-clip-text text-transparent">Experiência</span>
            {" "}é para a vida!
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Conecte-se a pessoas, destinos e aventuras inesquecíveis pelo Brasil. Nossa comunidade te espera.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="bg-gradient-brasil hover:opacity-90 text-white text-lg px-8 py-3 rounded-2xl"
            >
              <Link to="/viagens">Encontre sua viagem →</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
      
      <ChatModal isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </section>
  );
};

export default Hero;
