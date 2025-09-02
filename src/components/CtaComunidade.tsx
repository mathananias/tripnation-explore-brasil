import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CtaComunidade = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Faça Parte da Maior Comunidade de 
            <span className="bg-gradient-sunset bg-clip-text text-transparent"> Aventureiros </span>
            do Brasil
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Mais de 50.000 aventureiros já fazem parte da TripNation. Sua próxima aventura te espera!
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow">50k+</div>
              <div className="text-sm text-white/80">Aventureiros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow">150+</div>
              <div className="text-sm text-white/80">Destinos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow">98%</div>
              <div className="text-sm text-white/80">Satisfação</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-sunset hover:opacity-90 transition-opacity text-lg px-8 py-4 shadow-accent group"
              onClick={() => navigate('/auth')}
            >
              <Users className="mr-2 w-5 h-5" />
              Entre para a Comunidade TripNation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaComunidade;