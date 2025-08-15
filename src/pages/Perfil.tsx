import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MapPin, Calendar, Trophy, Star, Edit, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import carlaProfile from "@/assets/carla-mendes-profile.jpg";

const mockUser = {
  name: "Carla Mendes",
  bio: "Aventureira apaixonada por trilhas e ciclismo. Sempre em busca de novos destinos para explorar no Brasil!",
  location: "São Paulo, SP",
  joinDate: "Março 2023",
  engagementPoints: 250,
  favoritesSports: ["Trekking", "Ciclismo"],
  completedTrips: [
    { name: "Pico do Horizonte", date: "Jan 2024", rating: 5 },
    { name: "Lagoa Azul", date: "Dez 2023", rating: 4 },
    { name: "Serra das Estrelas", date: "Nov 2023", rating: 5 }
  ],
  stats: {
    tripsCompleted: 12,
    photosShared: 45,
    reviewsWritten: 8,
    friendsConnected: 23
  }
};

const Perfil = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={carlaProfile} />
                  <AvatarFallback>CM</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h1 className="text-3xl font-bold">{mockUser.name}</h1>
                    <Badge className="bg-gradient-to-r from-laranja to-amarelo text-white">
                      <Trophy className="w-3 h-3 mr-1" />
                      {mockUser.engagementPoints} pontos
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{mockUser.bio}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {mockUser.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Desde {mockUser.joinDate}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Perfil
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Viagens</span>
                  <span className="font-semibold">{mockUser.stats.tripsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fotos</span>
                  <span className="font-semibold">{mockUser.stats.photosShared}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avaliações</span>
                  <span className="font-semibold">{mockUser.stats.reviewsWritten}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Conexões</span>
                  <span className="font-semibold">{mockUser.stats.friendsConnected}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Esportes Favoritos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockUser.favoritesSports.map((sport, index) => (
                    <Badge key={index} variant="secondary">
                      {sport}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conquistas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">Primeira Trilha</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">10 Destinos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">Explorador</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Viagens Concluídas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUser.completedTrips.map((trip, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{trip.name}</h3>
                        <p className="text-sm text-muted-foreground">{trip.date}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: trip.rating }, (_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    {index < mockUser.completedTrips.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  Ver todas as viagens
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Perfil;