import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import surfImage from "@/assets/surf-brasil.jpg";
import mountainBikeImage from "@/assets/mountain-bike-mata-atlantica.jpg";
import escaladaImage from "@/assets/escalada-chapada.jpg";
const destinos = [{
  id: 1,
  nome: "Praia do Espelho",
  local: "Bahia",
  categoria: "Surf",
  nivel: "Intermediário",
  duracao: "3-5 dias",
  rating: 4.9,
  preco: "R$ 1.200",
  imagem: surfImage,
  descricao: "Ondas perfeitas em uma das praias mais preservadas do Brasil"
}, {
  id: 2,
  nome: "Trilha da Pedra Bonita",
  local: "Rio de Janeiro",
  categoria: "Trekking",
  nivel: "Avançado",
  duracao: "1 dia",
  rating: 4.8,
  preco: "R$ 350",
  imagem: mountainBikeImage,
  descricao: "Vista panorâmica incrível da cidade maravilhosa"
}, {
  id: 3,
  nome: "Chapada dos Guimarães",
  local: "Mato Grosso",
  categoria: "Escalada",
  nivel: "Intermediário",
  duracao: "2-3 dias",
  rating: 4.7,
  preco: "R$ 950",
  imagem: escaladaImage,
  descricao: "Formações rochosas únicas e cachoeiras cristalinas"
}];
const DestinosDestaque = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-brasil bg-clip-text text-transparent">
            Destinos em Destaque
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra os destinos mais incríveis do Brasil, selecionados pela nossa comunidade
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinos.map((destino) => (
            <Card key={destino.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-[4/3] overflow-hidden">
                <OptimizedImage 
                  src={destino.imagem} 
                  alt={`${destino.nome} - ${destino.categoria} em ${destino.local}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-primary">
                    {destino.categoria}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90 border-white/20">
                    {destino.nivel}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="text-xl font-semibold mb-1">{destino.nome}</h3>
                  <div className="flex items-center text-muted-foreground text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {destino.local}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {destino.duracao}
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {destino.descricao}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{destino.rating}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">{destino.preco}</div>
                    <div className="text-xs text-muted-foreground">por pessoa</div>
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default DestinosDestaque;