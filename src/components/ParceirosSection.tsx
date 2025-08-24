import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const parceiros = [
  { nome: "Buser", categoria: "Transporte", logo: "🚌" },
  { nome: "Pousada Serra Verde", categoria: "Hospedagem", logo: "🏡" },
  { nome: "Aventura Radical", categoria: "Esportes", logo: "🏄‍♂️" },
  { nome: "Sabores do Brasil", categoria: "Gastronomia", logo: "🍽️" },
  { nome: "EcoTrip", categoria: "Turismo", logo: "🌿" },
  { nome: "Surf Academy", categoria: "Esportes", logo: "🏄‍♀️" },
  { nome: "Hostel Aventura", categoria: "Hospedagem", logo: "🏠" },
  { nome: "Trilha & Cia", categoria: "Equipamentos", logo: "🎒" }
];

const ParceirosSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-sunset bg-clip-text text-transparent">
            Parceiros que Apoiam sua Aventura
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Vantagens exclusivas para membros TripNation
          </p>
          <Badge variant="secondary" className="text-accent bg-accent/10 border-accent/20">
            Descontos de até 30% para comunidade
          </Badge>
        </div>

        {/* Carrossel de parceiros */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-6">
            {[...parceiros, ...parceiros].map((parceiro, index) => (
              <Card key={index} className="flex-shrink-0 w-48 hover:shadow-primary transition-shadow duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {parceiro.logo}
                  </div>
                  <h4 className="font-semibold mb-2">{parceiro.nome}</h4>
                  <Badge variant="outline" className="text-xs">
                    {parceiro.categoria}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="font-semibold mb-2">Descontos Exclusivos</h4>
            <p className="text-sm text-muted-foreground">Até 30% off em hospedagens e atividades</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">⭐</span>
            </div>
            <h4 className="font-semibold mb-2">Qualidade Garantida</h4>
            <p className="text-sm text-muted-foreground">Parceiros selecionados pela comunidade</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="font-semibold mb-2">Suporte Completo</h4>
            <p className="text-sm text-muted-foreground">Atendimento preferencial em toda jornada</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParceirosSection;