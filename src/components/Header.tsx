import { Button } from "@/components/ui/button";
import { Menu, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-brasil p-2 rounded-lg">
              <MapPin aria-hidden="true" className="w-6 h-6 text-white" />
            </div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-brasil bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              TripNation
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/viagens" className="text-foreground hover:text-primary transition-colors font-medium">
              Viagens
            </Link>
            <Link to="/guias" className="text-foreground hover:text-primary transition-colors font-medium">
              Guias
            </Link>
            <Link to="/comunidade" className="text-foreground hover:text-primary transition-colors font-medium">
              Comunidade
            </Link>
            <Link to="/chat" className="text-foreground hover:text-primary transition-colors font-medium">
              Chat
            </Link>
            <Link to="/perfil" className="text-foreground hover:text-primary transition-colors font-medium">
              Perfil
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              aria-label="Pesquisar"
            >
              <Search aria-hidden="true" className="w-5 h-5" />
            </Button>
            <Button asChild className="hidden md:flex bg-gradient-brasil hover:opacity-90 transition-opacity">
              <Link to="/auth">Entrar / Cadastrar</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menu"
            >
              <Menu aria-hidden="true" className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link to="/viagens" className="text-foreground hover:text-primary transition-colors font-medium">
                Viagens
              </Link>
              <Link to="/guias" className="text-foreground hover:text-primary transition-colors font-medium">
                Guias
              </Link>
              <Link to="/comunidade" className="text-foreground hover:text-primary transition-colors font-medium">
                Comunidade
              </Link>
              <Link to="/chat" className="text-foreground hover:text-primary transition-colors font-medium">
                Chat
              </Link>
              <Link to="/perfil" className="text-foreground hover:text-primary transition-colors font-medium">
                Perfil
              </Link>
              <div className="flex space-x-2 pt-2">
                <Button variant="ghost" size="icon" aria-label="Pesquisar">
                  <Search aria-hidden="true" className="w-5 h-5" />
                </Button>
                <Button asChild className="flex-1 bg-gradient-brasil hover:opacity-90 transition-opacity">
                  <Link to="/auth">Entrar / Cadastrar</Link>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
