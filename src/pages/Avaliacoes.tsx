import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Filter, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mockReviews = [
  {
    id: 1,
    user: {
      name: "Camila P.",
      location: "SP",
      avatar: "/placeholder.svg"
    },
    destination: "Trilha do Pico do Horizonte",
    rating: 5,
    comment: "Passeio incrível, guia muito atencioso",
    date: "15 Jan 2024",
    images: ["/placeholder.svg"]
  },
  {
    id: 2,
    user: {
      name: "Pedro H.",
      location: "RJ",
      avatar: "/placeholder.svg"
    },
    destination: "Cachoeira das Águas Claras",
    rating: 4,
    comment: "Lugar lindo, mas acesso um pouco difícil",
    date: "10 Jan 2024",
    images: []
  },
  {
    id: 3,
    user: {
      name: "Ana Clara M.",
      location: "MG",
      avatar: "/placeholder.svg"
    },
    destination: "Surf na Praia do Atobá",
    rating: 5,
    comment: "Experiência única! As ondas estavam perfeitas e o instrutor foi excepcional. Recomendo muito para quem quer aprender ou aperfeiçoar o surf.",
    date: "8 Jan 2024",
    images: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 4,
    user: {
      name: "Lucas R.",
      location: "RS",
      avatar: "/placeholder.svg"
    },
    destination: "Escalada na Chapada Encantada",
    rating: 4,
    comment: "Vista espetacular no topo! Equipamentos de segurança em perfeito estado.",
    date: "5 Jan 2024",
    images: ["/placeholder.svg"]
  }
];

const Avaliacoes = () => {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filteredReviews = filterRating 
    ? mockReviews.filter(review => review.rating === filterRating)
    : mockReviews;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-laranja to-amarelo bg-clip-text text-transparent mb-4">
              Avaliações dos Viajantes
            </h1>
            <p className="text-lg text-muted-foreground">
              Descubra o que outros aventureiros estão dizendo sobre os destinos
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>
            <Button
              variant={filterRating === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterRating(null)}
            >
              Todas
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={filterRating === rating ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterRating(rating)}
                className="flex items-center space-x-1"
              >
                <span>{rating}</span>
                <Star className="h-3 w-3 fill-current" />
              </Button>
            ))}
          </div>

          <div className="grid gap-6">
            {filteredReviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={review.user.avatar} />
                        <AvatarFallback>
                          {review.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{review.user.name}</p>
                        <p className="text-sm text-muted-foreground">{review.user.location} • {review.date}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{review.destination}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex space-x-1">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm font-medium">{review.rating}/5</span>
                  </div>
                  
                  <p className="text-foreground mb-4">{review.comment}</p>
                  
                  {review.images.length > 0 && (
                    <div className="flex space-x-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Foto ${index + 1} da avaliação`}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Carregar mais avaliações</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-12 text-center">
            <Card className="p-6 bg-gradient-to-r from-verde-claro/10 to-azul-agua/10">
              <CardTitle className="mb-4">Compartilhe sua experiência!</CardTitle>
              <p className="text-muted-foreground mb-4">
                Ajude outros viajantes com sua avaliação
              </p>
              <Button className="bg-gradient-to-r from-laranja to-amarelo hover:from-laranja/90 hover:to-amarelo/90">
                Escrever avaliação
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Avaliacoes;