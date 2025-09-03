import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { OptimizedImage } from "@/components/ui/optimized-image";
import carlaProfile from "@/assets/carla-mendes-profile.jpg";
import danielProfile from "@/assets/daniel-vicente.jpg";
import giovanaProfile from "@/assets/giovana-moises.jpg";
import escaladaImage from "@/assets/escalada-chapada.jpg";
import surfImage from "@/assets/surf-brasil.jpg";
import serraImage from "@/assets/amanhecer-serra-estrelas.jpg";

const historias = [
  {
    id: 1,
    autor: "Carla Mendes",
    avatar: carlaProfile,
    local: "Chapada Diamantina, BA",
    imagem: escaladaImage,
    texto: "Que experiência incrível! A trilha para a Cachoeira da Fumaça superou todas as expectativas. O grupo estava animado e fizemos amizades que vão durar para sempre! 🏔️✨",
    likes: 24,
    comentarios: 8,
    tempo: "2h atrás"
  },
  {
    id: 2,
    autor: "Daniel Vicente",
    avatar: danielProfile,
    local: "Praia do Surf, CE",
    imagem: surfImage,
    texto: "Primeira vez no surf e que aventura! Os instrutores da TripNation são incríveis e o pessoal do grupo me ajudou muito. Já estou planejando a próxima! 🏄‍♂️",
    likes: 31,
    comentarios: 12,
    tempo: "5h atrás"
  },
  {
    id: 3,
    autor: "Giovana Moisés",
    avatar: giovanaProfile,
    local: "Serra da Mantiqueira, MG",
    imagem: serraImage,
    texto: "Ver o nascer do sol na serra com essa galera foi mágico! Nada como compartilhar momentos únicos com pessoas que vibram na mesma energia 🌅💚",
    likes: 18,
    comentarios: 6,
    tempo: "1 dia atrás"
  }
];

const HistoriasComunidade = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-ocean bg-clip-text text-transparent">
            Histórias da Nossa Comunidade
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja como outros aventureiros estão vivendo experiências únicas pelo Brasil e se inspire!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {historias.map((historia) => (
            <Card key={historia.id} className="overflow-hidden hover:shadow-secondary transition-shadow duration-300">
              {/* Header do post */}
              <CardContent className="p-4 pb-0">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={historia.avatar} alt={historia.autor} />
                    <AvatarFallback>{historia.autor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{historia.autor}</h4>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{historia.local}</span>
                      <span>•</span>
                      <span>{historia.tempo}</span>
                    </div>
                  </div>
                </div>
              </CardContent>

              {/* Imagem */}
              <div className="relative h-64 overflow-hidden">
                <OptimizedImage 
                  src={historia.imagem} 
                  alt={`Post de ${historia.autor} em ${historia.local}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo do post */}
              <CardContent className="p-4">
                <p className="text-sm leading-relaxed mb-4">{historia.texto}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>{historia.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{historia.comentarios}</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-gradient-ocean hover:opacity-90"
            onClick={() => navigate('/comunidade')}
          >
            Ver Mais Histórias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HistoriasComunidade;