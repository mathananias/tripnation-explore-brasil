import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar } from "lucide-react";
import surfImage from "@/assets/surf-brasil.jpg";
import mountainBikeImage from "@/assets/mountain-bike-mata-atlantica.jpg";
import escaladaImage from "@/assets/escalada-chapada.jpg";
const destinos = [{
  id: 1,
  nome: "Praia do Espelho",
  local: "Bahia",
  categoria: "Surf",
  nivel: "Intermediário",
  duracao: "3-5 dias",
  rating: 4.9,
  preco: "R$ 1.200",
  imagem: surfImage,
  descricao: "Ondas perfeitas em uma das praias mais preservadas do Brasil"
}, {
  id: 2,
  nome: "Trilha da Pedra Bonita",
  local: "Rio de Janeiro",
  categoria: "Trekking",
  nivel: "Avançado",
  duracao: "1 dia",
  rating: 4.8,
  preco: "R$ 350",
  imagem: mountainBikeImage,
  descricao: "Vista panorâmica incrível da cidade maravilhosa"
}, {
  id: 3,
  nome: "Chapada dos Guimarães",
  local: "Mato Grosso",
  categoria: "Escalada",
  nivel: "Intermediário",
  duracao: "2-3 dias",
  rating: 4.7,
  preco: "R$ 950",
  imagem: escaladaImage,
  descricao: "Formações rochosas únicas e cachoeiras cristalinas"
}];
const DestinosDestaque = () => {
  return;
};
export default DestinosDestaque;