import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-destino-secreto.jpg";
import ChatModal from "@/components/ChatModal";

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Destino secreto brasileiro com lagoa cristalina" 
          className="w-full h-full object-cover"
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-sunset hover:opacity-90 transition-opacity text-lg px-8 py-3 shadow-accent"
            >
              Criar Viagem
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white/10 border-white/30 hover:bg-white/20 text-white text-lg px-8 py-3 backdrop-blur-sm"
            >
              Ver Grupos Abertos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow">150+</div>
              <div className="text-sm text-white/80">Destinos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow">50k+</div>
              <div className="text-sm text-white/80">Aventureiros</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow">12</div>
              <div className="text-sm text-white/80">Esportes</div>
            </div>
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