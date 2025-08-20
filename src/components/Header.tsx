import { Button } from "@/components/ui/button";
import { Menu, Search, MapPin } from "lucide-react";
import { useState } from "react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-brasil p-2 rounded-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <a href="/" className="text-2xl font-bold bg-gradient-brasil bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              TripNation
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/viagens" className="text-foreground hover:text-primary transition-colors font-medium">
              Viagens
            </a>
            <a href="/comunidade" className="text-foreground hover:text-primary transition-colors font-medium">
              Comunidade
            </a>
            <a href="/avaliacoes" className="text-foreground hover:text-primary transition-colors font-medium">
              Avaliações
            </a>
            
            <a href="/chat" className="text-foreground hover:text-primary transition-colors font-medium">
              Chat
            </a>
            <a href="/perfil" className="text-foreground hover:text-primary transition-colors font-medium">
              Perfil
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>
            <Button asChild className="hidden md:flex bg-gradient-brasil hover:opacity-90 transition-opacity">
              <a href="/auth">Entrar / Cadastrar</a>
            </Button>
            
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <nav className="md:hidden mt-4 pt-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="/viagens" className="text-foreground hover:text-primary transition-colors font-medium">
                Viagens
              </a>
              <a href="/comunidade" className="text-foreground hover:text-primary transition-colors font-medium">
                Comunidade
              </a>
              <a href="/avaliacoes" className="text-foreground hover:text-primary transition-colors font-medium">
                Avaliações
              </a>
              <a href="/sobre" className="text-foreground hover:text-primary transition-colors font-medium">
                Sobre Nós
              </a>
              <a href="/chat" className="text-foreground hover:text-primary transition-colors font-medium">
                Chat
              </a>
              <a href="/perfil" className="text-foreground hover:text-primary transition-colors font-medium">
                Perfil
              </a>
              <div className="flex space-x-2 pt-2">
                <Button variant="ghost" size="icon">
                  <Search className="w-5 h-5" />
                </Button>
                <Button asChild className="flex-1 bg-gradient-brasil hover:opacity-90 transition-opacity">
                  <a href="/auth">Entrar / Cadastrar</a>
                </Button>
              </div>
            </div>
          </nav>}
      </div>
    </header>;
};
export default Header;