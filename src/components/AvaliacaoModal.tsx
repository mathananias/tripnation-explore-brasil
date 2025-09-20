import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { Star, Upload, X } from "lucide-react";
import placeholderSvg from "@/assets/placeholder.svg";

interface AvaliacaoModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const viagens = [
  "Trilha na Serra das Estrelas",
  "Surf na Praia do Atobá", 
  "Ciclismo no Vale Encantado",
  "Chapada dos Veadeiros"
];

const AvaliacaoModal = ({ isOpen, onOpenChange }: AvaliacaoModalProps) => {
  const [selectedTrip, setSelectedTrip] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSubmit = () => {
    // Simular envio da avaliação
    console.log({ selectedTrip, rating, comment, uploadedFiles });
    onOpenChange(false);
    // Reset form
    setSelectedTrip("");
    setRating(0);
    setComment("");
    setUploadedFiles([]);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-6 w-6 cursor-pointer transition-colors ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
        }`}
        onClick={() => setRating(i + 1)}
      />
    ));
  };

  const simulateFileUpload = () => {
    // Simular upload de arquivo
    const mockFile = `${placeholderSvg}?${Date.now()}`;
    setUploadedFiles([...uploadedFiles, mockFile]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Escrever Avaliação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="viagem">Selecione a viagem realizada</Label>
            <Select value={selectedTrip} onValueChange={setSelectedTrip}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha uma viagem..." />
              </SelectTrigger>
              <SelectContent>
                {viagens.map((viagem) => (
                  <SelectItem key={viagem} value={viagem}>
                    {viagem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Avaliação</Label>
            <div className="flex items-center space-x-1 mt-2">
              {renderStars()}
              <span className="ml-2 text-sm text-muted-foreground">
                {rating > 0 ? `${rating}/5` : "Clique nas estrelas"}
              </span>
            </div>
          </div>

          <div>
            <Label htmlFor="comentario">Comentário</Label>
            <Textarea
              id="comentario"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte sobre sua experiência..."
              rows={4}
            />
          </div>

          <div>
            <Label>Fotos e Vídeos</Label>
            <div className="mt-2">
              <Button
                variant="outline"
                onClick={simulateFileUpload}
                className="w-full border-dashed"
              >
                <Upload className="h-4 w-4 mr-2" />
                Fazer upload de mídia
              </Button>
              
              {uploadedFiles.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <OptimizedImage
                        src={file}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg border"
                        lazy={false}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 p-0"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Exemplo preenchido */}
          {selectedTrip === "Surf na Praia do Atobá" && rating === 4 && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-1">Exemplo:</p>
              <p className="text-sm">"Ondas perfeitas, mas faltaram opções de restaurantes próximos."</p>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedTrip || rating === 0 || !comment.trim()}
            className="bg-gradient-to-r from-laranja to-amarelo hover:opacity-90"
          >
            Publicar Avaliação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvaliacaoModal;