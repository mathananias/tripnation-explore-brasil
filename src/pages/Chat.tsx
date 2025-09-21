import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Badge } from "@/components/ui/badge";
import { Send, Phone, Video, MoreVertical } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import lucasMendonca from "@/assets/matheus-ananias.jpg";
import marinaCosta from "@/assets/giovana-moises.jpg";
import rafaelSantos from "@/assets/gustavo-martinez.jpg";

const mockMessages = [
  {
    id: 1,
    sender: "Lucas",
    content: "Vamos para Chapada Encantada semana que vem?",
    time: "14:30",
    isOwn: false
  },
  {
    id: 2,
    sender: "Ana",
    content: "Topo! Podemos incluir a trilha das Águas Claras",
    time: "14:32",
    isOwn: true
  },
  {
    id: 3,
    sender: "Lucas",
    content: "Perfeito! Você já foi lá antes?",
    time: "14:33",
    isOwn: false
  },
  {
    id: 4,
    sender: "Ana",
    content: "Sim, fui ano passado. É incrível! A trilha tem umas 3h de caminhada, mas vale muito a pena",
    time: "14:35",
    isOwn: true
  },
  {
    id: 5,
    sender: "Lucas",
    content: "Que legal! Você lembra qual equipamento precisa levar?",
    time: "14:36",
    isOwn: false
  },
  {
    id: 6,
    sender: "Ana",
    content: "Tênis de trilha, mochila, protetor solar e muita água. Ah, e câmera! As fotos ficam lindas 📸",
    time: "14:38",
    isOwn: true
  }
];

const Chat = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "Ana",
        content: newMessage,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Chat | TripNation" description="Converse com outros aventureiros em tempo real." />
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="w-full max-w-[480px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-laranja to-amarelo bg-clip-text text-transparent mb-4">
              Chat TripNation
            </h1>
            <p className="text-lg text-muted-foreground">
              Conecte-se com outros viajantes e organize suas aventuras
            </p>
          </div>

          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <OptimizedImage src={lucasMendonca} alt="Lucas Mendonça" className="w-full h-full object-cover" />
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">Lucas Mendonça</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-muted-foreground">Online</span>
                      <Badge variant="secondary" className="text-xs">Aventureiro</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className={`text-xs text-muted-foreground mt-1 ${message.isOwn ? 'text-right' : 'text-left'}`}>
                      {message.time}
                    </p>
                  </div>
                  {!message.isOwn && (
                    <Avatar className="w-8 h-8 order-1 mr-2">
                      <OptimizedImage src={lucasMendonca} alt="Lucas Mendonça" className="w-full h-full object-cover" />
                      <AvatarFallback>LM</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </CardContent>

            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" aria-label="Enviar mensagem">
                  <Send aria-hidden="true" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Grupos Ativos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-verde-claro to-azul-agua rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">CE</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Chapada Encantada</p>
                    <p className="text-sm text-muted-foreground">5 membros</p>
                  </div>
                  <Badge variant="secondary">2 novas</Badge>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-laranja to-amarelo rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">PA</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Praia do Atobá</p>
                    <p className="text-sm text-muted-foreground">8 membros</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sugestões de Conexão</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <OptimizedImage src={marinaCosta} alt="Marina Costa" className="w-full h-full object-cover" />
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Marina Costa</p>
                    <p className="text-sm text-muted-foreground">Surf • SP</p>
                  </div>
                  <Button size="sm" variant="outline">Conectar</Button>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <OptimizedImage src={rafaelSantos} alt="Rafael Santos" className="w-full h-full object-cover" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">Rafael Santos</p>
                    <p className="text-sm text-muted-foreground">Escalada • RJ</p>
                  </div>
                  <Button size="sm" variant="outline">Conectar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
