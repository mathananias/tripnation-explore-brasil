import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Waves, Mountain, Bike, Camera, TreePine, Compass } from "lucide-react";
import ChatModal from "@/components/ChatModal";
const experiencias = [{
  icon: Waves,
  nome: "Surf",
  descricao: "Ondas perfeitas em praias preservadas",
  destinos: "12 destinos",
  color: "text-secondary",
  bgColor: "bg-secondary/10"
}, {
  icon: Mountain,
  nome: "Trekking",
  descricao: "Trilhas épicas pela natureza selvagem",
  destinos: "25 destinos",
  color: "text-primary",
  bgColor: "bg-primary/10"
}, {
  icon: Bike,
  nome: "Mountain Bike",
  descricao: "Aventuras sobre duas rodas",
  destinos: "18 destinos",
  color: "text-accent",
  bgColor: "bg-accent/10"
}, {
  icon: Camera,
  nome: "Escalada",
  descricao: "Desafie suas alturas e limites",
  destinos: "8 destinos",
  color: "text-yellow",
  bgColor: "bg-yellow/10"
}, {
  icon: TreePine,
  nome: "Camping",
  descricao: "Noites sob o céu estrelado",
  destinos: "15 destinos",
  color: "text-primary",
  bgColor: "bg-primary/10"
}, {
  icon: Compass,
  nome: "Aventura Completa",
  descricao: "Pacotes com múltiplas atividades",
  destinos: "10 destinos",
  color: "text-secondary",
  bgColor: "bg-secondary/10"
}];
const badges = [
  { nome: "Aventureiro Iniciante", icon: "🌱", descricao: "Complete sua primeira trilha" },
  { nome: "Surfista das Ondas", icon: "🏄‍♂️", descricao: "Pegue 10 ondas diferentes" },
  { nome: "Explorador de Cachoeiras", icon: "💎", descricao: "Visite 5 cachoeiras únicas" },
  { nome: "Montanhista", icon: "⛰️", descricao: "Conquiste 3 picos diferentes" },
  { nome: "Comunidade Ativa", icon: "🤝", descricao: "Participe de 5 viagens em grupo" }
];

const ExperienciasSection = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  return <section id="experiencias" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tipos de <span className="bg-gradient-sunset bg-clip-text text-transparent">Experiências</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Escolha sua aventura ideal entre diversas modalidades esportivas em cenários únicos do Brasil
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {experiencias.map((exp, index) => {
          const IconComponent = exp.icon;
          return <Card key={index} className="group hover:shadow-secondary transition-all duration-300 cursor-pointer border-0 bg-card">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex p-4 rounded-xl ${exp.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${exp.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{exp.nome}</h3>
                  <p className="text-muted-foreground mb-3">{exp.descricao}</p>
                  <div className="text-sm font-medium text-primary">{exp.destinos}</div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Seção de Gamificação */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-sunset bg-clip-text text-transparent">
              Conquiste Badges e Mostre suas Aventuras
            </h3>
            <p className="text-muted-foreground">
              Ganhe reconhecimento da comunidade explorando diferentes modalidades de aventura
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {badges.map((badge, index) => (
              <div 
                key={index}
                className="bg-white border rounded-lg p-4 text-center hover:shadow-primary transition-shadow duration-300 group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {badge.icon}
                </div>
                <h4 className="font-semibold text-sm mb-1">{badge.nome}</h4>
                <p className="text-xs text-muted-foreground">{badge.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-brasil rounded-2xl p-8 md:p-12 text-center text-white mt-16">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Não sabe por onde começar?
          </h3>
          <p className="text-xl mb-8 text-white/90">
            Nossos especialistas criam o roteiro perfeito baseado no seu perfil e preferências
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-colors"
              onClick={() => setIsChatOpen(true)}
            >
              Falar com Especialista
            </Button>
            <Button variant="outline" size="lg" className="border-white bg-slate-950 hover:bg-slate-800 text-slate-50">
              Quiz: Qual Aventura é Sua Cara?
            </Button>
          </div>
        </div>
      </div>
      
      <ChatModal isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
    </section>;
};
export default ExperienciasSection;