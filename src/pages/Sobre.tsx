import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  Users, 
  Heart, 
  Globe, 
  DollarSign, 
  Crown, 
  Handshake, 
  BarChart3,
  TreePine,
  MapPin,
  Sparkles,
  Target
} from "lucide-react";

const Sobre = () => {
  const diferenciais = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      titulo: "Turismo Sustentável",
      descricao: "Descentralizado e com impacto positivo"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      titulo: "Experiências Autênticas",
      descricao: "Curadoria local e vivências únicas"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      titulo: "Foco no Viajante Solo",
      descricao: "Conexões reais e comunidade acolhedora"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      titulo: "Comunidade Real",
      descricao: "Rede de viajantes engajados"
    }
  ];

  const modeloNegocio = [
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      titulo: "Comissão sobre Reservas",
      descricao: "Revenue share sustentável com parceiros locais"
    },
    {
      icon: <Crown className="w-6 h-6 text-gold" />,
      titulo: "Planos de Assinatura",
      descricao: "Benefícios exclusivos para viajantes frequentes"
    },
    {
      icon: <Handshake className="w-6 h-6 text-blue-600" />,
      titulo: "Parcerias Estratégicas",
      descricao: "Transporte, hospedagem, gastronomia e ESG"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />,
      titulo: "Relatórios de Impacto",
      descricao: "Transparência social e ambiental"
    }
  ];

  const impactos = [
    {
      icon: <TreePine className="w-6 h-6 text-green-600" />,
      titulo: "Preservação Ambiental",
      descricao: "Turismo regenerativo e consciente"
    },
    {
      icon: <MapPin className="w-6 h-6 text-orange-500" />,
      titulo: "Renda Local",
      descricao: "Fortalecimento de economias regionais"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      titulo: "Inclusão Social",
      descricao: "Diversidade e acessibilidade"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      titulo: "Transformação Pessoal",
      descricao: "Crescimento através de conexões"
    }
  ];

  const team = [
    {
      nome: "Luceli",
      cargo: "CEO",
      funcao: "Visão estratégica e liderança executiva",
      avatar: "👩‍💼"
    },
    {
      nome: "Matheus",
      cargo: "CFO",
      funcao: "Gestão financeira e planejamento",
      avatar: "👨‍💼"
    },
    {
      nome: "Giovana",
      cargo: "CMO/HR",
      funcao: "Marketing e recursos humanos",
      avatar: "👩‍🎨"
    },
    {
      nome: "Gustavo",
      cargo: "CPO",
      funcao: "Desenvolvimento de produtos",
      avatar: "👨‍🔧"
    },
    {
      nome: "Daniel",
      cargo: "CTO",
      funcao: "Tecnologia e inovação",
      avatar: "👨‍💻"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-brasil bg-clip-text text-transparent">
              Sobre a TripNation
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transformando viagens solo em experiências sustentáveis e acolhedoras
            </p>
          </div>
        </section>

        {/* Quem Somos */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-6 text-center">Quem Somos</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A TripNation nasceu da percepção de que muitos viajantes solo enfrentam desafios para encontrar 
                    experiências autênticas e sustentáveis. Nossa plataforma conecta pessoas que compartilham a paixão 
                    por descobrir novos destinos, criando uma comunidade onde cada jornada se torna uma oportunidade 
                    de crescimento pessoal, impacto positivo e conexões genuínas. Acreditamos que o turismo pode ser 
                    uma força transformadora tanto para os viajantes quanto para as comunidades locais.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nossa Missão */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <Target className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
              <div className="bg-gradient-brasil p-8 rounded-2xl">
                <p className="text-2xl md:text-3xl font-bold text-white">
                  "Porque a jornada fica melhor quando compartilhada"
                </p>
              </div>
              <p className="text-lg text-muted-foreground mt-6">
                Conectar viajantes solo através de experiências sustentáveis que geram impacto positivo 
                nas comunidades locais e no meio ambiente.
              </p>
            </div>
          </div>
        </section>

        {/* O que nos Diferencia */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">O que nos Diferencia</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {diferenciais.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.titulo}</h3>
                    <p className="text-muted-foreground">{item.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Modelo de Negócio */}
        <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Modelo de Negócio</h2>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {modeloNegocio.map((item, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-background p-3 rounded-full">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{item.titulo}</h3>
                          <p className="text-muted-foreground">{item.descricao}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Expansão Internacional</h3>
                  <p className="text-lg text-muted-foreground">
                    Potencial de crescimento em médio prazo para mercados latino-americanos e europeus, 
                    mantendo nosso compromisso com sustentabilidade e impacto social positivo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impacto */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nosso Impacto</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactos.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="mb-4 flex justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.titulo}</h3>
                    <p className="text-sm text-muted-foreground">{item.descricao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Card className="bg-gradient-brasil text-white">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Benefícios Tangíveis</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold">85%</div>
                      <div className="text-sm opacity-90">Renda direcionada para economia local</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">95%</div>
                      <div className="text-sm opacity-90">Satisfação dos viajantes</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">50%</div>
                      <div className="text-sm opacity-90">Redução da pegada de carbono</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Nosso Time */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nosso Time</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h3 className="text-xl font-semibold mb-1">{member.nome}</h3>
                    <Badge variant="secondary" className="mb-3">{member.cargo}</Badge>
                    <p className="text-sm text-muted-foreground">{member.funcao}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Uma equipe multidisciplinar unida pela paixão por viagens sustentáveis e transformadoras, 
                comprometida em criar a melhor experiência para nossa comunidade de viajantes.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;