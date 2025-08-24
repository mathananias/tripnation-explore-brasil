import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Bed, Utensils, Car } from "lucide-react";

const ConstruaViagem = () => {
  return (
    <section className="py-16 bg-gradient-brasil relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/95 backdrop-blur-sm border-none shadow-2xl">
            <CardContent className="p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-brasil bg-clip-text text-transparent">
                  Construa sua Viagem do Zero
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Monte sua viagem personalizada escolhendo transporte, hospedagem, esportes e restaurantes parceiros. 
                  Tudo pensado para sua aventura perfeita!
                </p>
              </div>

              {/* Ícones dos serviços */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Car className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Transporte</span>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-secondary/20 transition-colors">
                    <Bed className="w-8 h-8 text-secondary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Hospedagem</span>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="w-8 h-8 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Esportes</span>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-yellow/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-yellow/20 transition-colors">
                    <Utensils className="w-8 h-8 text-yellow" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Restaurantes</span>
                </div>
              </div>

              {/* Call to Action */}
              <Button 
                size="lg" 
                className="bg-gradient-sunset hover:opacity-90 text-white text-lg px-8 py-4 shadow-accent group"
              >
                Começar Planejamento
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ConstruaViagem;