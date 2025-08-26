import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Phone, Video, MoreVertical } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-laranja to-amarelo bg-clip-text text-transparent mb-4">
              Chat TripNation
            </h1>
            <p className="text-lg text-muted-foreground">
              Conecte-se com outros viajantes e organize suas aventuras
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
            {/* Sidebar com Abas */}
            <div className="lg:col-span-1">
              <Tabs defaultValue="grupos" className="h-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="grupos">Grupos</TabsTrigger>
                  <TabsTrigger value="conexoes">Conexões</TabsTrigger>
                </TabsList>
                
                <TabsContent value="grupos" className="h-[calc(100%-40px)]">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Grupos e Chats Ativos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 overflow-y-auto h-[calc(100%-80px)]">
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
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-roxo to-rosa rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">SE</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Serra Escalada</p>
                          <p className="text-sm text-muted-foreground">12 membros</p>
                        </div>
                        <Badge variant="secondary">1 nova</Badge>
                      </div>
                      <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
                        <div className="w-10 h-10 bg-gradient-to-r from-azul to-verde-claro rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">MB</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Mountain Bike BR</p>
                          <p className="text-sm text-muted-foreground">7 membros</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="conexoes" className="h-[calc(100%-40px)]">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Sugestões de Conexão</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 overflow-y-auto h-[calc(100%-80px)]">
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>MC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Marina Costa</p>
                          <p className="text-sm text-muted-foreground">Surf • São Paulo</p>
                          <p className="text-xs text-muted-foreground">15 viagens realizadas</p>
                        </div>
                        <Button size="sm" variant="outline">Conectar</Button>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>RS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Rafael Santos</p>
                          <p className="text-sm text-muted-foreground">Escalada • Rio de Janeiro</p>
                          <p className="text-xs text-muted-foreground">22 viagens realizadas</p>
                        </div>
                        <Button size="sm" variant="outline">Conectar</Button>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>JL</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">João Lima</p>
                          <p className="text-sm text-muted-foreground">Trekking • Minas Gerais</p>
                          <p className="text-xs text-muted-foreground">8 viagens realizadas</p>
                        </div>
                        <Button size="sm" variant="outline">Conectar</Button>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>CS</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Clara Silva</p>
                          <p className="text-sm text-muted-foreground">Camping • Santa Catarina</p>
                          <p className="text-xs text-muted-foreground">11 viagens realizadas</p>
                        </div>
                        <Button size="sm" variant="outline">Conectar</Button>
                      </div>
                      <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted cursor-pointer">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>TA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">Thiago Alves</p>
                          <p className="text-sm text-muted-foreground">Mountain Bike • Bahia</p>
                          <p className="text-xs text-muted-foreground">19 viagens realizadas</p>
                        </div>
                        <Button size="sm" variant="outline">Conectar</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Chat Principal */}
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg" />
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
                          <AvatarImage src="/placeholder.svg" />
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
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;