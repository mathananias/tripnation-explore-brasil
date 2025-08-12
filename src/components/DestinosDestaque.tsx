import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";
import surfImage from "@/assets/surf-brasil.jpg";
import mountainBikeImage from "@/assets/mountain-bike-mata-atlantica.jpg";
import escaladaImage from "@/assets/escalada-chapada.jpg";

const destinos = [
  {
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
  },
  {
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
  },
  {
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
  }
];

const DestinosDestaque = () => {
  return (
    <section id="destinos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Destinos em <span className="bg-gradient-brasil bg-clip-text text-transparent">Destaque</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Lugares únicos selecionados especialmente para aventureiros que buscam experiências autênticas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinos.map((destino) => (
            <Card key={destino.id} className="group hover:shadow-primary transition-all duration-300 overflow-hidden border-0 bg-card">
              <div className="relative overflow-hidden">
                <img 
                  src={destino.imagem} 
                  alt={destino.nome}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary hover:bg-primary">
                    {destino.categoria}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-foreground">
                    {destino.nivel}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{destino.nome}</h3>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {destino.local}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow text-yellow mr-1" />
                    <span className="text-sm font-medium">{destino.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{destino.descricao}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {destino.duracao}
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {destino.preco}
                  </div>
                </div>

                <Button className="w-full bg-gradient-ocean hover:opacity-90 transition-opacity">
                  Ver Detalhes
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Ver Todos os Destinos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DestinosDestaque;