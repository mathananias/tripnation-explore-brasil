import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, X } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import placeholderSvg from "@/assets/placeholder.svg";

const mockDestinos = [
  {
    id: 1,
    nome: "Praia do Atobá",
    categoria: "Surf",
    rating: 4.8,
    preco: "R$ 150/dia",
    posicao: { x: 25, y: 30 },
    imagem: placeholderSvg,
    descricao: "Ondas perfeitas para surf, frequentada por locais e poucos turistas."
  },
  {
    id: 2,
    nome: "Pico do Horizonte",
    categoria: "Trekking",
    rating: 4.9,
    preco: "R$ 80/dia",
    posicao: { x: 60, y: 45 },
    imagem: placeholderSvg,
    descricao: "Vista panorâmica incrível após 3h de trilha moderada."
  },
  {
    id: 3,
    nome: "Lagoa Azul",
    categoria: "Mergulho",
    rating: 4.7,
    preco: "R$ 120/dia",
    posicao: { x: 40, y: 65 },
    imagem: placeholderSvg,
    descricao: "Águas cristalinas ideais para mergulho e snorkeling."
  },
  {
    id: 4,
    nome: "Serra das Estrelas",
    categoria: "Escalada",
    rating: 4.6,
    preco: "R$ 200/dia",
    posicao: { x: 75, y: 25 },
    imagem: placeholderSvg,
    descricao: "Formações rochosas desafiadoras para escalada esportiva."
  },
  {
    id: 5,
    nome: "Trilha dos Ventos",
    categoria: "Ciclismo",
    rating: 4.5,
    preco: "R$ 60/dia",
    posicao: { x: 15, y: 75 },
    imagem: placeholderSvg,
    descricao: "Percurso de mountain bike com diferentes níveis de dificuldade."
  }
];

const MapaInterativo = () => {
  const [selectedDestino, setSelectedDestino] = useState<typeof mockDestinos[0] | null>(null);

  const handlePinClick = (destino: typeof mockDestinos[0]) => {
    setSelectedDestino(destino);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
      />
    ));
  };

  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-verde-claro/20 to-azul-agua/20 h-96 md:h-[500px]">
            {/* Mapa base simulado */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
              {/* Elementos decorativos do mapa */}
              <div className="absolute top-10 left-10 w-16 h-16 bg-green-200 rounded-full opacity-30"></div>
              <div className="absolute top-32 right-20 w-12 h-12 bg-blue-200 rounded-full opacity-30"></div>
              <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-yellow-200 rounded-full opacity-30"></div>
              <div className="absolute bottom-32 right-1/4 w-14 h-14 bg-orange-200 rounded-full opacity-30"></div>
              
              {/* Linhas simulando rios/estradas */}
              <div className="absolute top-1/4 left-0 w-full h-1 bg-blue-300 opacity-40 transform rotate-12"></div>
              <div className="absolute top-3/4 left-0 w-full h-1 bg-blue-300 opacity-40 transform -rotate-6"></div>
            </div>

            {/* Pins dos destinos */}
            {mockDestinos.map((destino) => (
              <button
                key={destino.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
                style={{ 
                  left: `${destino.posicao.x}%`, 
                  top: `${destino.posicao.y}%` 
                }}
                onClick={() => handlePinClick(destino)}
              >
                <div className="relative">
                  <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg group-hover:scale-110 transition-transform" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {destino.nome}
                  </div>
                </div>
              </button>
            ))}

            {/* Modal de destino selecionado */}
            {selectedDestino && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20 p-4">
                <Card className="w-full max-w-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{selectedDestino.nome}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {selectedDestino.categoria}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedDestino(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <OptimizedImage
                      src={selectedDestino.imagem}
                      alt={`${selectedDestino.nome} - ${selectedDestino.categoria}`}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex space-x-1">
                        {renderStars(selectedDestino.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {selectedDestino.rating}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {selectedDestino.descricao}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">
                        {selectedDestino.preco}
                      </span>
                      <Button>Ver Detalhes</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Clique nos pins vermelhos para ver detalhes dos destinos
      </div>
    </div>
  );
};

export default MapaInterativo;