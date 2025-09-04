import { MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo e descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-brasil p-2 rounded-lg">
                <MapPin aria-hidden="true" className="w-6 h-6 text-white" />
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
              <Button
                variant="ghost"
                size="icon"
                className="text-background hover:text-primary hover:bg-background/10"
                aria-label="Instagram"
              >
                <Instagram aria-hidden="true" className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background hover:text-primary hover:bg-background/10"
                aria-label="Facebook"
              >
                <Facebook aria-hidden="true" className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-background hover:text-primary hover:bg-background/10"
                aria-label="YouTube"
              >
                <Youtube aria-hidden="true" className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-bold mb-4 text-yellow">Explorar</h4>
            <ul className="space-y-2">
              <li>
                <a href="#destinos" className="text-background/80 hover:text-yellow transition-colors">
                  Destinos
                </a>
              </li>
              <li>
                <a href="#experiencias" className="text-background/80 hover:text-yellow transition-colors">
                  Experiências
                </a>
              </li>
              <li>
                <Link to="/" className="text-background/80 hover:text-yellow transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/viagens" className="text-background/80 hover:text-yellow transition-colors">
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="font-bold mb-4 text-yellow">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-background/80 hover:text-yellow transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-background/80 hover:text-yellow transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-background/80 hover:text-yellow transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-background/80 hover:text-yellow transition-colors">
                  Termos
                </Link>
              </li>
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
