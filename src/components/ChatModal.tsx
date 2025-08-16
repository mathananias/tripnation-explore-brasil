import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface ChatModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatModal = ({ isOpen, onOpenChange }: ChatModalProps) => {
  const [message, setMessage] = useState("");

  const initialMessages = [
    {
      id: 1,
      sender: "specialist",
      text: "Olá! Sou o Lucas, especialista da TripNation. Qual destino ou esporte você gostaria de explorar?",
      time: "14:32"
    },
    {
      id: 2,
      sender: "user",
      text: "Estou pensando em algo de trilha na Chapada dos Veadeiros.",
      time: "14:35"
    },
    {
      id: 3,
      sender: "specialist",
      text: "Boa escolha! Me fale um pouco mais, quantos dias você pretende passar por lá? Deseja incluir hospedagem?",
      time: "14:36"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // This is just illustrative for the prototype
      console.log("Mensagem enviada:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md h-[600px] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-4 border-b bg-gradient-brasil text-white">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/src/assets/carla-mendes-profile.jpg" alt="Lucas" />
              <AvatarFallback className="bg-white text-primary font-semibold">LC</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-white">Lucas</h3>
              <p className="text-sm text-white/80">Especialista em Viagens</p>
            </div>
          </div>
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-muted/20 space-y-4">
          {initialMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-background border rounded-bl-sm"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-background">
          <div className="flex space-x-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="bg-gradient-brasil hover:opacity-90 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;