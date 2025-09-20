import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CreditCard, MapPin, QrCode, Receipt, ShieldCheck, Users } from "lucide-react";

interface PaymentTripDetails {
  title: string;
  sport?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  price?: string;
  people?: number;
  description?: string;
  partnerships?: {
    transport: string;
    accommodation: string;
    restaurant: {
      name: string;
      discount: string;
    };
  };
  image?: string;
  source: "custom" | "package";
}

interface PaymentLocationState {
  tripDetails?: PaymentTripDetails;
}

const parseCurrencyValue = (value?: string) => {
  if (!value) {
    return 0;
  }

  const sanitized = value.replace(/[^0-9,.-]/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(sanitized);

  return Number.isNaN(parsed) ? 0 : parsed;
};

const Pagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripDetails } = (location.state as PaymentLocationState | undefined) ?? {};
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    if (!tripDetails) {
      navigate("/viagens", { replace: true });
    }
  }, [navigate, tripDetails]);

  const currencyFormatter = useMemo(
    () => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }),
    []
  );

  const baseAmount = useMemo(() => parseCurrencyValue(tripDetails?.price), [tripDetails?.price]);
  const serviceFee = useMemo(() => (baseAmount > 0 ? baseAmount * 0.05 : 0), [baseAmount]);
  const insurance = useMemo(() => (baseAmount > 0 ? Math.max(25, baseAmount * 0.02) : 0), [baseAmount]);
  const totalAmount = useMemo(() => baseAmount + serviceFee + insurance, [baseAmount, serviceFee, insurance]);

  if (!tripDetails) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Pagamento | TripNation" description="Finalize sua reserva e confirme sua presença na viagem escolhida." />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Voltar
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Revisar detalhes da viagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {tripDetails.image && (
                    <div className="md:w-40 md:h-32 w-full h-48 overflow-hidden rounded-lg">
                      <img
                        src={tripDetails.image}
                        alt={`Imagem ilustrativa de ${tripDetails.title}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-xl font-semibold text-foreground">{tripDetails.title}</h1>
                      {tripDetails.sport && <Badge variant="secondary">{tripDetails.sport}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                      {tripDetails.description ?? "Revise as informações da experiência escolhida antes de confirmar sua presença."}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                      {(tripDetails.startDate || tripDetails.endDate || tripDetails.duration) && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" aria-hidden="true" />
                          <span>
                            {tripDetails.startDate && tripDetails.endDate
                              ? `${tripDetails.startDate} até ${tripDetails.endDate}`
                              : tripDetails.duration}
                          </span>
                        </div>
                      )}
                      {tripDetails.people && (
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" aria-hidden="true" />
                          <span>{tripDetails.people} viajantes</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        <span>{tripDetails.source === "package" ? "Pacote TripNation" : "Viagem personalizada"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {tripDetails.partnerships && (
                  <div className="rounded-lg border border-dashed border-primary/40 p-4">
                    <h2 className="text-sm font-semibold text-foreground mb-2">Parcerias inclusas</h2>
                    <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
                      <span>
                        <strong className="text-foreground">Transporte:</strong> {tripDetails.partnerships.transport}
                      </span>
                      <span>
                        <strong className="text-foreground">Hospedagem:</strong> {tripDetails.partnerships.accommodation}
                      </span>
                      <span>
                        <strong className="text-foreground">Gastronomia:</strong> {tripDetails.partnerships.restaurant.name} ({tripDetails.partnerships.restaurant.discount})
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Informações dos viajantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome completo</Label>
                    <Input id="fullName" placeholder="Digite o nome como está no documento" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="document">Documento (RG ou Passaporte)</Label>
                    <Input id="document" placeholder="000.000.000-00" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seuemail@exemplo.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observations">Observações adicionais</Label>
                  <Textarea id="observations" placeholder="Descreva necessidades especiais ou preferências." rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Forma de pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-3 md:grid-cols-3">
                  <div
                    className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                      paymentMethod === "credit" ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                  >
                    <RadioGroupItem value="credit" id="payment-credit" />
                    <Label htmlFor="payment-credit" className="cursor-pointer flex-1 space-y-1">
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <CreditCard className="h-4 w-4" /> Cartão de crédito
                      </span>
                      <span className="text-sm text-muted-foreground">Parcelamento em até 12x sem juros.</span>
                    </Label>
                  </div>
                  <div
                    className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                      paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                  >
                    <RadioGroupItem value="pix" id="payment-pix" />
                    <Label htmlFor="payment-pix" className="cursor-pointer flex-1 space-y-1">
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <QrCode className="h-4 w-4" /> Pix
                      </span>
                      <span className="text-sm text-muted-foreground">Confirmação imediata com QR Code.</span>
                    </Label>
                  </div>
                  <div
                    className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                      paymentMethod === "boleto" ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                  >
                    <RadioGroupItem value="boleto" id="payment-boleto" />
                    <Label htmlFor="payment-boleto" className="cursor-pointer flex-1 space-y-1">
                      <span className="flex items-center gap-2 font-medium text-foreground">
                        <Receipt className="h-4 w-4" /> Boleto bancário
                      </span>
                      <span className="text-sm text-muted-foreground">Válido por 48 horas após a emissão.</span>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit" && (
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nome impresso no cartão</Label>
                        <Input id="cardName" placeholder="Como está no cartão" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número do cartão</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" inputMode="numeric" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Validade</Label>
                        <Input id="expiry" placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" inputMode="numeric" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="installments">Parcelas</Label>
                        <Select defaultValue="1x">
                          <SelectTrigger id="installments">
                            <SelectValue placeholder="Escolha" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1x">1x de {currencyFormatter.format(totalAmount)}</SelectItem>
                            <SelectItem value="3x">3x de {currencyFormatter.format(totalAmount / 3)}</SelectItem>
                            <SelectItem value="6x">6x de {currencyFormatter.format(totalAmount / 6)}</SelectItem>
                            <SelectItem value="12x">12x de {currencyFormatter.format(totalAmount / 12)}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="rounded-lg border border-dashed border-primary/40 p-4 text-sm text-muted-foreground">
                    Ao finalizar, geraremos um QR Code Pix com validade de 15 minutos para confirmação imediata.
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="rounded-lg border border-dashed border-primary/40 p-4 text-sm text-muted-foreground">
                    O boleto será enviado por e-mail com vencimento em 2 dias úteis. A reserva é confirmada após a compensação.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Resumo do pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Valor base</span>
                    <span className="font-medium text-foreground">{tripDetails.price ?? currencyFormatter.format(baseAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Taxa de serviço (5%)</span>
                    <span className="font-medium text-foreground">{currencyFormatter.format(serviceFee)}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Seguro viagem</span>
                    <span className="font-medium text-foreground">{currencyFormatter.format(insurance)}</span>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-semibold text-foreground">
                  <span>Total</span>
                  <span>{currencyFormatter.format(totalAmount)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={(value) => setAcceptedTerms(Boolean(value))} />
                  <Label htmlFor="terms" className="text-xs sm:text-sm">
                    Confirmo que li e concordo com os termos da viagem, políticas de cancelamento e seguro contratado.
                  </Label>
                </div>
                <Button
                  className="w-full bg-gradient-brasil hover:opacity-90"
                  disabled={!acceptedTerms}
                  onClick={() => navigate("/viagens")}
                >
                  Finalizar pagamento
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="flex items-start gap-3 p-4">
                <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-foreground">Compra segura</p>
                  <p className="text-muted-foreground">
                    Seus dados são protegidos com criptografia ponta a ponta e nossas políticas oferecem suporte 24h para qualquer
                    eventualidade.
                  </p>
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

export default Pagamento;
