import { MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-brasil p-2 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-brasil bg-clip-text text-transparent">
                TripNation
              </span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              Conectamos aventureiros a destinos únicos e inexplorados do Brasil. 
              Sua próxima aventura épica está aqui.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-primary hover:bg-background/10">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-bold mb-4 text-yellow">Explorar</h4>
            <ul className="space-y-2">
              <li><a href="#destinos" className="text-background/80 hover:text-yellow transition-colors">Destinos</a></li>
              <li><a href="#experiencias" className="text-background/80 hover:text-yellow transition-colors">Experiências</a></li>
              <li><a href="#blog" className="text-background/80 hover:text-yellow transition-colors">Blog</a></li>
              <li><a href="#ofertas" className="text-background/80 hover:text-yellow transition-colors">Ofertas</a></li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-bold mb-4 text-yellow">Suporte</h4>
            <ul className="space-y-2">
              <li><a href="#sobre" className="text-background/80 hover:text-yellow transition-colors">Sobre nós</a></li>
              <li><a href="#contato" className="text-background/80 hover:text-yellow transition-colors">Contato</a></li>
              <li><a href="#faq" className="text-background/80 hover:text-yellow transition-colors">FAQ</a></li>
              <li><a href="#termos" className="text-background/80 hover:text-yellow transition-colors">Termos</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/60 text-sm">
            © 2024 TripNation. Todos os direitos reservados.
          </p>
          <p className="text-background/60 text-sm mt-4 md:mt-0">
            Feito com ❤️ para aventureiros brasileiros
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;