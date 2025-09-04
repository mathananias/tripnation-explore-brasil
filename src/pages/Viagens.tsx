import { useState, useCallback, lazy, Suspense } from "react";
const ChatModal = lazy(() => import("@/components/ChatModal"));
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Calendar, Users, DollarSign, MapPin, Star, Edit, Trash2, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const packagedTrips = [
  {
    id: 1,
    title: "Trilha na Serra das Estrelas",
    duration: "3 dias",
    price: "R$ 1.200",
    description: "Inclui guia e hospedagem simples",
    image: "/src/assets/escalada-chapada.jpg",
    rating: 4.8,
    difficulty: "Médio",
    sport: "Trilha",
    partnerships: {
      transport: "Buser",
      accommodation: "Pousada Horizonte",
      restaurant: { name: "Restaurante Sabor da Serra", discount: "15% OFF" }
    }
  },
  {
    id: 2,
    title: "Surf na Praia do Atobá",
    duration: "5 dias",
    price: "R$ 2.500",
    description: "Inclui aulas de surf e hospedagem frente-mar",
    image: "/src/assets/surf-praia-atoba.jpg",
    rating: 4.9,
    difficulty: "Iniciante",
    sport: "Surf",
    partnerships: {
      transport: "Expresso Brasileiro",
      accommodation: "Hotel Praia Azul",
      restaurant: { name: "Marisqueira do Porto", discount: "20% OFF" }
    }
  },
  {
    id: 3,
    title: "Ciclismo no Vale Encantado",
    duration: "2 dias",
    price: "R$ 900",
    description: "Inclui aluguel de bike e camping",
    image: "/src/assets/mountain-bike-mata-atlantica.jpg",
    rating: 4.7,
    difficulty: "Fácil",
    sport: "Ciclismo",
    partnerships: {
      transport: "Viação Cometa",
      accommodation: "Camping Natureza",
      restaurant: { name: "Café da Trilha", discount: "10% OFF" }
    }
  }
];

const Viagens = () => {
  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userTrips, setUserTrips] = useState([
    {
      id: 1,
      destination: "Chapada dos Veadeiros",
      sport: "Trilha",
      startDate: "2024-03-15",
      endDate: "2024-03-18",
      budget: "R$ 1.500",
      people: 3,
      notes: "Viagem em família para conhecer as cachoeiras",
      isOpen: true,
      interestedCount: 5
    }
  ]);

  const [newTrip, setNewTrip] = useState({
    destination: "",
    sport: "",
    startDate: "",
    endDate: "",
    budget: "",
    people: 1,
    notes: "",
    isOpen: true
  });

  const handleCreateTrip = useCallback(() => {
    if (newTrip.destination && newTrip.sport && newTrip.startDate && newTrip.endDate) {
      setUserTrips([
        ...userTrips,
        {
          ...newTrip,
          id: Date.now(),
          interestedCount: 0
        }
      ]);
      setNewTrip({
        destination: "",
        sport: "",
        startDate: "",
        endDate: "",
        budget: "",
        people: 1,
        notes: "",
        isOpen: true
      });
      setIsCreateTripOpen(false);
    }
  }, [newTrip, userTrips]);

  const handleDeleteTrip = useCallback(
    (id: number) => {
      setUserTrips(userTrips.filter((trip) => trip.id !== id));
    },
    [userTrips]
  );

  const handleOpenChat = useCallback(() => setIsChatOpen(true), []);
  const handleChatOpenChange = useCallback((open: boolean) => setIsChatOpen(open), []);
  const handleCreateTripOpenChange = useCallback(
    (open: boolean) => setIsCreateTripOpen(open),
    []
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow text-yellow" : "text-muted"}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-brasil bg-clip-text text-transparent mb-4">
              Criar e Escolher Viagens
            </h1>
            <p className="text-lg text-muted-foreground">
              Monte sua viagem dos sonhos ou escolha um de nossos pacotes especiais
            </p>
          </div>

          {/* Criar Viagem Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Criar Nova Viagem</h2>
              <Dialog open={isCreateTripOpen} onOpenChange={handleCreateTripOpenChange}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-brasil hover:opacity-90 transition-opacity">
                    <Plus className="h-5 w-5 mr-2" />
                    Criar Viagem
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Viagem</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="destination">Destino</Label>
                        <Input
                          id="destination"
                          value={newTrip.destination}
                          onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                          placeholder="Ex: Chapada dos Veadeiros"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sport">Esporte Principal</Label>
                        <Select value={newTrip.sport} onValueChange={(value) => setNewTrip({...newTrip, sport: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o esporte" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trilha">Trilha</SelectItem>
                            <SelectItem value="surf">Surf</SelectItem>
                            <SelectItem value="ciclismo">Ciclismo</SelectItem>
                            <SelectItem value="escalada">Escalada</SelectItem>
                            <SelectItem value="rafting">Rafting</SelectItem>
                            <SelectItem value="parapente">Parapente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Data de Início</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newTrip.startDate}
                          onChange={(e) => setNewTrip({...newTrip, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate">Data de Fim</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newTrip.endDate}
                          onChange={(e) => setNewTrip({...newTrip, endDate: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budget">Orçamento Estimado</Label>
                        <Input
                          id="budget"
                          value={newTrip.budget}
                          onChange={(e) => setNewTrip({...newTrip, budget: e.target.value})}
                          placeholder="Ex: R$ 1.500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="people">Número de Pessoas</Label>
                        <Input
                          id="people"
                          type="number"
                          min="1"
                          value={newTrip.people}
                          onChange={(e) => setNewTrip({...newTrip, people: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        value={newTrip.notes}
                        onChange={(e) => setNewTrip({...newTrip, notes: e.target.value})}
                        placeholder="Descreva detalhes especiais da sua viagem..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label>Tipo de Grupo</Label>
                      <div className="flex space-x-4 mt-2">
                        <Button
                          type="button"
                          variant={newTrip.isOpen ? "default" : "outline"}
                          onClick={() => setNewTrip({...newTrip, isOpen: true})}
                          className="flex-1"
                        >
                          Grupo Aberto
                        </Button>
                        <Button
                          type="button"
                          variant={!newTrip.isOpen ? "default" : "outline"}
                          onClick={() => setNewTrip({...newTrip, isOpen: false})}
                          className="flex-1"
                        >
                          Grupo Fechado
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {newTrip.isOpen 
                          ? "Qualquer usuário pode demonstrar interesse" 
                          : "Apenas convidados podem participar"
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateTripOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateTrip} className="bg-gradient-brasil hover:opacity-90">
                      Criar Viagem
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Minhas Viagens */}
            {userTrips.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Minhas Viagens</h3>
                <div className="grid gap-4">
                  {userTrips.map((trip) => (
                    <Card key={trip.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="font-semibold text-lg text-foreground">{trip.destination}</h4>
                              <Badge variant="secondary">{trip.sport}</Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-4 w-4" />
                                <span>{trip.startDate} - {trip.endDate}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4" />
                                <span>{trip.budget}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{trip.people} pessoas</span>
                              </div>
                            </div>
                            {trip.notes && (
                              <p className="mt-2 text-sm text-muted-foreground">{trip.notes}</p>
                            )}
                            <div className="flex items-center space-x-4 mt-3">
                              <Badge variant={trip.isOpen ? "default" : "secondary"}>
                                {trip.isOpen ? "Grupo Aberto" : "Grupo Fechado"}
                              </Badge>
                              {trip.isOpen && (
                                <span className="text-sm text-muted-foreground">
                                  {trip.interestedCount} pessoas interessadas
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            {trip.isOpen && (
                              <Button size="sm" className="bg-gradient-brasil hover:opacity-90">
                                Tenho Interesse
                              </Button>
                            )}
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDeleteTrip(trip.id)}
                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pacotes Sugeridos */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Pacotes de Viagens</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packagedTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden hover:shadow-primary transition-shadow duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={trip.image} 
                      alt={`Pacote ${trip.title}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        {trip.duration}
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-accent">
                        {trip.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <h3 className="font-semibold text-sm leading-tight">{trip.title}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{trip.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>8/12 pessoas</span>
                      </div>
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-brasil"
                          style={{ width: `67%` }}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-brasil hover:opacity-90"
                    >
                      Tenho Interesse
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardTitle className="text-2xl mb-4 text-foreground">
                Não encontrou o que procurava?
              </CardTitle>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nossa equipe pode criar um pacote personalizado especialmente para você. 
                Entre em contato e monte a viagem dos seus sonhos!
              </p>
              <Button 
                className="bg-gradient-sunset hover:opacity-90 transition-opacity text-white"
                onClick={handleOpenChat}
              >
                Solicitar Pacote Personalizado
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <Suspense
        fallback=
          {<div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>}
      >
        <ChatModal isOpen={isChatOpen} onOpenChange={handleChatOpenChange} />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Viagens;