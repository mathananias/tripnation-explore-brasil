import { ReactNode, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatModal from "@/components/ChatModal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Calendar, Users, DollarSign, MapPin, Star, Edit, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import escaladaImage from "@/assets/escalada-chapada.jpg";
import surfImage from "@/assets/surf-praia-atoba.jpg";
import bikeImage from "@/assets/mountain-bike-mata-atlantica.jpg";
import SEO from "@/components/SEO";
import { toast } from "@/hooks/use-toast";

type TripPartnership = {
  transport: string;
  accommodation: string;
  restaurant: {
    name: string;
    discount: string;
  };
};

export type PackagedTrip = {
  id: number;
  slug: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  image: string;
  rating: number;
  difficulty: string;
  sport: string;
  partnerships: TripPartnership;
  guideId?: string;
};

export const packagedTrips: PackagedTrip[] = [
  {
    id: 1,
    slug: "serra-das-estrelas",
    title: "Trilha na Serra das Estrelas",
    duration: "3 dias",
    price: "R$ 1.200",
    description: "Inclui guia e hospedagem simples",
    image: escaladaImage,
    rating: 4.8,
    difficulty: "Médio",
    sport: "Trilha",
    partnerships: {
      transport: "Buser",
      accommodation: "Pousada Horizonte",
      restaurant: { name: "Restaurante Sabor da Serra", discount: "15% OFF" }
    },
    guideId: "mariana"
  },
  {
    id: 2,
    slug: "praia-do-atoba",
    title: "Surf na Praia do Atobá",
    duration: "5 dias",
    price: "R$ 2.500",
    description: "Inclui aulas de surf e hospedagem frente-mar",
    image: surfImage,
    rating: 4.9,
    difficulty: "Iniciante",
    sport: "Surf",
    partnerships: {
      transport: "Expresso Brasileiro",
      accommodation: "Hotel Praia Azul",
      restaurant: { name: "Marisqueira do Porto", discount: "20% OFF" }
    },
    guideId: "luana"
  },
  {
    id: 3,
    slug: "vale-encantado",
    title: "Ciclismo no Vale Encantado",
    duration: "2 dias",
    price: "R$ 900",
    description: "Inclui aluguel de bike e camping",
    image: bikeImage,
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

export type UserTrip = {
  id: number;
  slug?: string;
  destination: string;
  sport: string;
  startDate: string;
  endDate: string;
  budget: string;
  people: number;
  notes: string;
  isOpen: boolean;
  interestedCount: number;
  packageId?: number;
  needsGuide: boolean;
  guideId?: string;
};

type NewTripState = {
  destination: string;
  sport: string;
  startDate: string;
  endDate: string;
  budget: string;
  people: number;
  notes: string;
  isOpen: boolean;
  needsGuide: boolean;
};

type TripFormFieldConfig = {
  disabled?: boolean;
  hidden?: boolean;
};

type TripFormConfig = Partial<Record<keyof NewTripState, TripFormFieldConfig>>;

type TripFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  trip: NewTripState;
  onTripChange: (trip: NewTripState) => void;
  onSubmit: () => void;
  submitLabel: string;
  trigger?: ReactNode;
  config?: TripFormConfig;
};

const initialTripState: NewTripState = {
  destination: "",
  sport: "",
  startDate: "",
  endDate: "",
  budget: "",
  people: 1,
  notes: "",
  isOpen: true,
  needsGuide: false
};

const packagedTripEditConfig: TripFormConfig = {
  destination: { disabled: true },
  sport: { disabled: true },
  budget: { disabled: true },
  isOpen: { disabled: true },
  needsGuide: { hidden: true }
};

const TripFormDialog = ({
  open,
  onOpenChange,
  title,
  trip,
  onTripChange,
  onSubmit,
  submitLabel,
  trigger,
  config
}: TripFormDialogProps) => {
  const handlePeopleChange = (value: string) => {
    const parsed = Number.parseInt(value, 10);
    onTripChange({
      ...trip,
      people: Number.isNaN(parsed) ? 1 : parsed
    });
  };

  const getFieldConfig = (field: keyof NewTripState): TripFormFieldConfig => ({
    disabled: config?.[field]?.disabled ?? false,
    hidden: config?.[field]?.hidden ?? false
  });

  const destinationField = getFieldConfig("destination");
  const sportField = getFieldConfig("sport");
  const startDateField = getFieldConfig("startDate");
  const endDateField = getFieldConfig("endDate");
  const budgetField = getFieldConfig("budget");
  const peopleField = getFieldConfig("people");
  const notesField = getFieldConfig("notes");
  const groupTypeField = getFieldConfig("isOpen");
  const needsGuideField = getFieldConfig("needsGuide");
  const needsGuideSwitchId = useId();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!destinationField.hidden ? (
              <div>
                <Label htmlFor="destination">Destino</Label>
                <Input
                  id="destination"
                  value={trip.destination}
                  onChange={(e) =>
                    onTripChange({ ...trip, destination: e.target.value })
                  }
                  placeholder="Ex: Chapada dos Veadeiros"
                  disabled={destinationField.disabled}
                />
              </div>
            ) : null}
            {!sportField.hidden ? (
              <div>
                <Label htmlFor="sport">Esporte Principal</Label>
                <Select
                  value={trip.sport}
                  onValueChange={(value) =>
                    onTripChange({ ...trip, sport: value })
                  }
                  disabled={sportField.disabled}
                >
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
            ) : null}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!startDateField.hidden ? (
              <div>
                <Label htmlFor="startDate">Data de Início</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={trip.startDate}
                  onChange={(e) =>
                    onTripChange({ ...trip, startDate: e.target.value })
                  }
                  disabled={startDateField.disabled}
                />
              </div>
            ) : null}
            {!endDateField.hidden ? (
              <div>
                <Label htmlFor="endDate">Data de Fim</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={trip.endDate}
                  onChange={(e) =>
                    onTripChange({ ...trip, endDate: e.target.value })
                  }
                  disabled={endDateField.disabled}
                />
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!budgetField.hidden ? (
              <div>
                <Label htmlFor="budget">Orçamento Estimado</Label>
                <Input
                  id="budget"
                  value={trip.budget}
                  onChange={(e) =>
                    onTripChange({ ...trip, budget: e.target.value })
                  }
                  placeholder="Ex: R$ 1.500"
                  disabled={budgetField.disabled}
                />
              </div>
            ) : null}
            {!peopleField.hidden ? (
              <div>
                <Label htmlFor="people">Número de Pessoas</Label>
                <Input
                  id="people"
                  type="number"
                  min="1"
                  value={trip.people}
                  onChange={(e) => handlePeopleChange(e.target.value)}
                  disabled={peopleField.disabled}
                />
              </div>
            ) : null}
          </div>
          {!notesField.hidden ? (
            <div>
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                value={trip.notes}
                onChange={(e) =>
                  onTripChange({ ...trip, notes: e.target.value })
                }
                placeholder="Descreva detalhes especiais da sua viagem..."
                rows={3}
                disabled={notesField.disabled}
              />
            </div>
          ) : null}
          {!needsGuideField.hidden ? (
            <div className="flex items-start justify-between rounded-lg border p-4">
              <div className="pr-4">
                <Label htmlFor={needsGuideSwitchId} className="text-sm font-medium">
                  Quero um guia da plataforma
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Conectamos você com especialistas locais para tornar sua experiência ainda mais segura e completa.
                </p>
              </div>
              <Switch
                id={needsGuideSwitchId}
                checked={trip.needsGuide}
                onCheckedChange={checked =>
                  onTripChange({ ...trip, needsGuide: checked })
                }
                disabled={needsGuideField.disabled}
                aria-label="Alternar solicitação de guia"
              />
            </div>
          ) : null}
          {!groupTypeField.hidden ? (
            <div>
              <Label>Tipo de Grupo</Label>
              <div className="flex space-x-4 mt-2">
                <Button
                  type="button"
                  variant={trip.isOpen ? "default" : "outline"}
                  onClick={() => onTripChange({ ...trip, isOpen: true })}
                  className="flex-1"
                  disabled={groupTypeField.disabled}
                >
                  Grupo Aberto
                </Button>
                <Button
                  type="button"
                  variant={!trip.isOpen ? "default" : "outline"}
                  onClick={() => onTripChange({ ...trip, isOpen: false })}
                  className="flex-1"
                  disabled={groupTypeField.disabled}
                >
                  Grupo Fechado
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {trip.isOpen
                  ? "Qualquer usuário pode demonstrar interesse"
                  : "Apenas convidados podem participar"}
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} className="bg-gradient-brasil hover:opacity-90">
            {submitLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Viagens = () => {
  const navigate = useNavigate();
  const [isCreateTripOpen, setIsCreateTripOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackagedTrip | null>(null);
  const [userTrips, setUserTrips] = useState<UserTrip[]>([]);
  const [newTrip, setNewTrip] = useState<NewTripState>(initialTripState);
  const [editingTrip, setEditingTrip] = useState<UserTrip | null>(null);
  const [editTripForm, setEditTripForm] = useState<NewTripState>(initialTripState);
  const [editTripConfig, setEditTripConfig] = useState<TripFormConfig | undefined>(
    undefined
  );

  const handleCreateTrip = () => {
    if (newTrip.destination && newTrip.sport && newTrip.startDate && newTrip.endDate) {
      setUserTrips(prevTrips => [
        ...prevTrips,
        {
          ...newTrip,
          id: Date.now(),
          interestedCount: 0
        }
      ]);
      setNewTrip(initialTripState);
      setIsCreateTripOpen(false);
    }
  };

  const handleOpenEditTrip = (trip: UserTrip) => {
    setEditingTrip(trip);
    setEditTripForm({
      destination: trip.destination,
      sport: trip.sport,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget,
      people: trip.people,
      notes: trip.notes,
      isOpen: trip.isOpen,
      needsGuide: trip.needsGuide ?? Boolean(trip.guideId)
    });
    setEditTripConfig(trip.packageId ? packagedTripEditConfig : undefined);
  };

  const resetEditState = () => {
    setEditingTrip(null);
    setEditTripForm(initialTripState);
    setEditTripConfig(undefined);
  };

  const handleSubmitEditTrip = () => {
    if (!editingTrip) {
      return;
    }

    if (
      editTripForm.destination &&
      editTripForm.sport &&
      editTripForm.startDate &&
      editTripForm.endDate
    ) {
      setUserTrips(prevTrips =>
        prevTrips.map(trip =>
          trip.id === editingTrip.id
            ? {
                ...trip,
                ...editTripForm
              }
            : trip
        )
      );
      resetEditState();
    }
  };

  const handlePackageInterest = (trip: PackagedTrip) => {
    const durationMatch = trip.duration.match(/\d+/);
    const durationInDays = durationMatch ? Number.parseInt(durationMatch[0], 10) : 3;
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationInDays);

    const formatDate = (date: Date) => date.toISOString().split("T")[0];

    const createdTrip: UserTrip = {
      id: Date.now(),
      destination: trip.title,
      sport: trip.sport,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      budget: trip.price,
      people: 1,
      notes: trip.description,
      isOpen: true,
      interestedCount: 1,
      packageId: trip.id,
      slug: trip.slug,
      needsGuide: Boolean(trip.guideId),
      guideId: trip.guideId
    };

    let feedback: "duplicate" | "added" | null = null;

    setUserTrips(prevTrips => {
      const alreadyAdded = prevTrips.some(userTrip => userTrip.packageId === trip.id);

      if (alreadyAdded) {
        feedback = "duplicate";
        return prevTrips;
      }

      feedback = "added";
      return [...prevTrips, createdTrip];
    });

    if (feedback === "duplicate") {
      toast({
        title: "Viagem já adicionada",
        description: "Você já demonstrou interesse por esse pacote."
      });
    }

    if (feedback === "added") {
      toast({
        title: "Viagem adicionada",
        description: "Essa viagem foi adicionada às suas viagens de interesse."
      });
    }
  };

  const handleNavigateToCommunity = (slug: string) => {
    navigate(`/comunidade?trip=${slug}`);
  };

  const handleNavigateToGuide = (guideId: string) => {
    navigate(`/guias?guide=${guideId}`);
  };

  const handleNavigateToPayment = (trip: UserTrip) => {
    navigate("/pagamento", { state: { tripId: trip.id, trip } });
  };

  const handleDeleteTrip = (id: number) => {
    setUserTrips(userTrips.filter(trip => trip.id !== id));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Viagens | TripNation" description="Explore pacotes e crie suas próprias viagens pelo Brasil." />
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
              <TripFormDialog
                open={isCreateTripOpen}
                onOpenChange={setIsCreateTripOpen}
                title="Criar Nova Viagem"
                trip={newTrip}
                onTripChange={setNewTrip}
                onSubmit={handleCreateTrip}
                submitLabel="Criar Viagem"
                trigger={
                  <Button className="bg-gradient-brasil hover:opacity-90 transition-opacity">
                    <Plus aria-hidden="true" className="h-5 w-5 mr-2" />
                    Criar Viagem
                  </Button>
                }
              />
            </div>

            {/* Minhas Viagens */}
            {userTrips.length > 0 ? (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Minhas Viagens</h3>
                <div className="grid gap-4">
                  {userTrips.map((trip) => {
                    const packageSlug =
                      trip.slug ??
                      (trip.packageId
                        ? packagedTrips.find(pkg => pkg.id === trip.packageId)?.slug
                        : undefined);

                    return (
                      <Card key={trip.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h4 className="font-semibold text-lg text-foreground">{trip.destination}</h4>
                                <Badge variant="secondary">{trip.sport}</Badge>
                                {trip.needsGuide ? (
                                  <Badge
                                    variant={trip.guideId ? "default" : "outline"}
                                    className={trip.guideId ? undefined : "border-primary bg-primary/10 text-primary"}
                                  >
                                    {trip.guideId ? "Guia confirmado" : "Guia solicitado"}
                                  </Badge>
                                ) : null}
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
                                {trip.needsGuide && !trip.guideId ? (
                                  <span className="text-sm text-muted-foreground">
                                    Procurando guia da plataforma
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              {trip.guideId ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleNavigateToGuide(trip.guideId!)}
                                >
                                  Ver guia
                                </Button>
                              ) : null}
                              {trip.isOpen && packageSlug && (
                                <Button
                                  size="sm"
                                  className="bg-gradient-brasil hover:opacity-90"
                                  onClick={() => handleNavigateToCommunity(packageSlug)}
                                >
                                  Ver na Comunidade
                                </Button>
                              )}
                              <Button
                                size="sm"
                                className="bg-gradient-sunset hover:opacity-90"
                                onClick={() => handleNavigateToPayment(trip)}
                              >
                                Confirmar presença
                              </Button>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleOpenEditTrip(trip)}
                                >
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
                    );
                  })}
                </div>
              </div>
            ) : (
              <Card className="mb-8 border-dashed border-muted bg-muted/30">
                <CardContent className="py-10 text-center space-y-3">
                  <MapPin aria-hidden="true" className="mx-auto h-8 w-8 text-muted-foreground" />
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">Você ainda não tem viagens</h3>
                    <p className="text-sm text-muted-foreground">
                      Crie uma nova viagem ou demonstre interesse em um pacote para vê-la aqui.
                    </p>
                  </div>
                </CardContent>
              </Card>
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
                      <MapPin aria-hidden="true" className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <h3 className="font-semibold text-sm leading-tight">{trip.title}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{trip.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users aria-hidden="true" className="w-4 h-4" />
                        <span>8/12 pessoas</span>
                      </div>
                      <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-brasil"
                          style={{ width: `67%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-brasil hover:opacity-90"
                        onClick={() => setSelectedPackage(trip)}
                      >
                        Ver Detalhes
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleNavigateToCommunity(trip.slug)}
                      >
                        Ver na Comunidade
                      </Button>
                    </div>
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
                onClick={() => setIsChatOpen(true)}
              >
                Solicitar Pacote Personalizado
              </Button>
            </Card>
          </div>
        </div>
      </main>

      <TripFormDialog
        open={!!editingTrip}
        onOpenChange={(open) => {
          if (!open) {
            resetEditState();
          }
        }}
        title={editingTrip?.packageId ? "Propor alteração de pacote" : "Editar viagem"}
        trip={editTripForm}
        onTripChange={setEditTripForm}
        onSubmit={handleSubmitEditTrip}
        submitLabel={editingTrip?.packageId ? "Propor alteração" : "Salvar alterações"}
        config={editTripConfig}
      />

      <Dialog
        open={!!selectedPackage}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPackage(null);
          }
        }}
      >
        <DialogContent className="max-w-3xl">
          {selectedPackage && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-foreground">
                  {selectedPackage.title}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 md:grid-cols-[1.5fr_1fr]">
                <div className="space-y-4">
                  <div className="relative h-56 w-full overflow-hidden rounded-lg">
                    <img
                      src={selectedPackage.image}
                      alt={`Imagem do pacote ${selectedPackage.title}`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-primary">
                        {selectedPackage.duration}
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-accent">{selectedPackage.price}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedPackage.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="flex items-center gap-1">{renderStars(selectedPackage.rating)}</span>
                      <span className="font-medium">{selectedPackage.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <span>{selectedPackage.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" aria-hidden="true" />
                      <span>Dificuldade: {selectedPackage.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span>Esporte: {selectedPackage.sport}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-semibold mb-2 text-foreground">Parcerias</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <span className="font-medium text-foreground">Transporte:</span>{" "}
                        {selectedPackage.partnerships.transport}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Hospedagem:</span>{" "}
                        {selectedPackage.partnerships.accommodation}
                      </p>
                      <p>
                        <span className="font-medium text-foreground">Restaurante:</span>{" "}
                        {selectedPackage.partnerships.restaurant.name} ({selectedPackage.partnerships.restaurant.discount})
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-gradient-brasil hover:opacity-90"
                      onClick={() => {
                        handlePackageInterest(selectedPackage);
                        setSelectedPackage(null);
                      }}
                    >
                      Tenho Interesse
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        handleNavigateToCommunity(selectedPackage.slug);
                        setSelectedPackage(null);
                      }}
                    >
                      Ver na Comunidade
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <ChatModal isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
      
      <Footer />
    </div>
  );
};

export default Viagens;
