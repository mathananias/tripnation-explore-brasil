import { FormEvent, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { guides, type Guide } from "@/lib/guides";

const initialFormState = {
  name: "",
  email: "",
  message: ""
};

const GuidesPage = () => {
  const [openGuideId, setOpenGuideId] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState(initialFormState);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const guideParam = searchParams.get("guia");
    if (!guideParam) {
      setOpenGuideId(null);
      setContactForm(initialFormState);
      return;
    }

    const guideExists = guides.some(guide => guide.id === guideParam);
    if (!guideExists) {
      return;
    }

    setOpenGuideId(guideParam);
    setContactForm(initialFormState);

    const card = document.getElementById(`guia-${guideParam}`);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [searchParams]);

  const handleDialogOpenChange = (guideId: string, open: boolean) => {
    if (open) {
      setOpenGuideId(guideId);
      setContactForm(initialFormState);
      setSearchParams(prevParams => {
        const params = new URLSearchParams(prevParams);
        params.set("guia", guideId);
        return params;
      });
    } else {
      setOpenGuideId(null);
      setContactForm(initialFormState);
      setSearchParams(prevParams => {
        const params = new URLSearchParams(prevParams);
        params.delete("guia");
        return params;
      });
    }
  };

  const handleInputChange = (field: "name" | "email" | "message", value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>, guide: Guide) => {
    event.preventDefault();
    toast({
      title: "Mensagem enviada!",
      description: `Sua mensagem foi encaminhada para ${guide.name}.`
    });
    setContactForm(initialFormState);
    setOpenGuideId(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SEO
        title="Guias | TripNation"
        description="Conheça guias especializados pelo Brasil e conecte-se para planejar sua próxima aventura."
      />
      <Header />

      <main className="container mx-auto flex-1 px-4 pb-16 pt-32">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-brasil bg-clip-text text-transparent">Conheça nossos guias</h1>
            <p className="mt-3 text-muted-foreground">
              Conecte-se com profissionais apaixonados por turismo de aventura em todas as regiões do Brasil.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {guides.map(guide => (
              <Card key={guide.id} id={`guia-${guide.id}`} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={guide.photo}
                      alt={`Foto de ${guide.name}`}
                      className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/50"
                    />
                    <div>
                      <CardTitle className="text-xl">{guide.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{guide.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{guide.description}</p>
                </CardContent>
                <CardFooter className="flex-col gap-3">
                  <Dialog
                    open={openGuideId === guide.id}
                    onOpenChange={open => handleDialogOpenChange(guide.id, open)}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full">Fale com o guia</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enviar mensagem para {guide.name}</DialogTitle>
                        <DialogDescription>
                          Preencha o formulário abaixo e o guia retornará o contato assim que possível.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        className="space-y-4"
                        onSubmit={event => handleSubmit(event, guide)}
                      >
                        <div className="space-y-2">
                          <Label htmlFor={`${guide.id}-name`}>Nome</Label>
                          <Input
                            id={`${guide.id}-name`}
                            value={contactForm.name}
                            onChange={event => handleInputChange("name", event.target.value)}
                            placeholder="Seu nome completo"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${guide.id}-email`}>E-mail</Label>
                          <Input
                            id={`${guide.id}-email`}
                            type="email"
                            value={contactForm.email}
                            onChange={event => handleInputChange("email", event.target.value)}
                            placeholder="seuemail@exemplo.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${guide.id}-message`}>Mensagem</Label>
                          <Textarea
                            id={`${guide.id}-message`}
                            value={contactForm.message}
                            onChange={event => handleInputChange("message", event.target.value)}
                            placeholder="Conte ao guia sobre sua viagem dos sonhos"
                            required
                            rows={4}
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="w-full sm:w-auto">
                            Enviar mensagem
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <div className="flex w-full flex-col gap-2 sm:flex-row">
                    <Button variant="outline" className="flex-1">
                      Ver perfil
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      Avaliar
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuidesPage;
