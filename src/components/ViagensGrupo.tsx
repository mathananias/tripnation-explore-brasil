import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import escaladaImage from "@/assets/escalada-chapada.jpg";
import surfImage from "@/assets/surf-praia-atoba.jpg";
import serraImage from "@/assets/amanhecer-serra-estrelas.jpg";
import bikeImage from "@/assets/mountain-bike-mata-atlantica.jpg";

const viagensAbertas = [
  {
    id: 1,
    local: "Chapada Diamantina, BA",
    atividade: "Trilha + Cachoeiras",
    imagem: escaladaImage,
    interessados: 12,
    vagas: 15,
    data: "15-18 Nov",
    preco: "R$ 890"
  },
  {
    id: 2,
    local: "Atobá Beach, PE",
    atividade: "Surf + Relaxamento",
    imagem: surfImage,
    interessados: 8,
    vagas: 12,
    data: "22-25 Nov",
    preco: "R$ 650"
  },
  {
    id: 3,
    local: "Serra da Estrela, RJ",
    atividade: "Amanhecer + Fotografia",
    imagem: serraImage,
    interessados: 15,
    vagas: 20,
    data: "29 Nov-02 Dez",
    preco: "R$ 720"
  },
  {
    id: 4,
    local: "Mata Atlântica, SP",
    atividade: "Mountain Bike",
    imagem: bikeImage,
    interessados: 6,
    vagas: 10,
    data: "06-08 Dez",
    preco: "R$ 480"
  }
];

const ViagensGrupo = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-brasil bg-clip-text text-transparent">
            Viagens em Grupo Abertas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Junte-se a outros aventureiros e descubra o Brasil em grupo. Novas amizades, experiências compartilhadas!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {viagensAbertas.map((viagem) => (
            <Card key={viagem.id} className="overflow-hidden hover:shadow-primary transition-shadow duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <OptimizedImage 
                  src={viagem.imagem} 
                  alt={`Viagem para ${viagem.local} - ${viagem.atividade}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {viagem.data}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-accent">
                    {viagem.preco}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <h3 className="font-semibold text-sm leading-tight">{viagem.local}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{viagem.atividade}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{viagem.interessados}/{viagem.vagas} pessoas</span>
                  </div>
                  <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-brasil"
                      style={{ width: `${(viagem.interessados / viagem.vagas) * 100}%` }}
                    />
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  className="w-full bg-gradient-brasil hover:opacity-90"
                  onClick={() => navigate('/viagens')}
                >
                  Tenho Interesse
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => navigate('/viagens')}
          >
            Ver Todas as Viagens Abertas
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ViagensGrupo;