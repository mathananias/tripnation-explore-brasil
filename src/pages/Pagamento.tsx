import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import {
  packagedTrips,
  PackagedTrip,
  TripPricing,
  UserTrip,
  calculateServiceFeeAmount,
  calculateTotalAmount,
  formatPricingValue
} from "./Viagens";

type CheckoutState = {
  tripId?: number;
  trip?: UserTrip | PackagedTrip;
};

const isPackagedTrip = (trip: UserTrip | PackagedTrip): trip is PackagedTrip => {
  return (trip as PackagedTrip).partnerships !== undefined;
};

const parseCurrencyToNumber = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const normalized = value
    .toString()
    .replace(/[^0-9.,-]/g, "")
    .replace(/\.(?=\d{3}(?:\D|$))/g, "")
    .replace(/,/g, ".");

  const parsed = Number.parseFloat(normalized);

  return Number.isNaN(parsed) ? null : parsed;
};

const Pagamento = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state as CheckoutState | null) ?? {};

  const trip = useMemo(() => {
    if (state.trip) {
      return state.trip;
    }

    if (state.tripId) {
      return packagedTrips.find(pkg => pkg.id === state.tripId) ?? null;
    }

    return null;
  }, [state.trip, state.tripId]);

  const tripTitle = trip
    ? isPackagedTrip(trip)
      ? trip.title
      : trip.destination
    : "";

  const tripPeriod = trip
    ? isPackagedTrip(trip)
      ? trip.duration
      : `${trip.startDate} - ${trip.endDate}`
    : "";

  const participantCount = trip && "people" in trip ? trip.people : 1;

  const pricingDetails = useMemo<TripPricing | null>(() => {
    if (!trip) {
      return null;
    }

    const sourcePricing = isPackagedTrip(trip) ? trip.pricing : trip.pricing;

    let basePrice = sourcePricing.basePrice;
    let transportCost = sourcePricing.transportCost;
    let extras = sourcePricing.extras;
    const serviceFeePercent = sourcePricing.serviceFeePercent ?? 8;

    if (!isPackagedTrip(trip) && basePrice == null) {
      const parsedBudget = parseCurrencyToNumber(trip.budget);
      if (parsedBudget != null) {
        basePrice = parsedBudget;
      }
    }

    return {
      basePrice,
      transportCost,
      extras,
      serviceFeePercent
    };
  }, [trip]);

  const serviceFeeAmount = pricingDetails ? calculateServiceFeeAmount(pricingDetails) : null;
  const totalAmount = pricingDetails ? calculateTotalAmount(pricingDetails) : null;
  const serviceFeePercentLabel = pricingDetails?.serviceFeePercent ?? 8;
  const serviceFeePercentDisplay = `${serviceFeePercentLabel.toString().replace(".", ",")}%`;
  const basePriceDisplay = formatPricingValue(pricingDetails?.basePrice);
  const transportDisplay = formatPricingValue(pricingDetails?.transportCost);
  const extrasDisplay = formatPricingValue(pricingDetails?.extras);
  const serviceFeeDisplay = formatPricingValue(serviceFeeAmount);
  const totalDisplay = formatPricingValue(totalAmount);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Pagamento | TripNation"
        description="Finalize sua participação confirmando presença na viagem escolhida."
      />
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Checkout da viagem</h1>
              <p className="text-muted-foreground">
                Confirme sua presença preenchendo os dados abaixo e escolhendo a melhor forma de pagamento.
              </p>
            </div>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </div>

          {trip ? (
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Dados do participante</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="participant-name">Nome completo</Label>
                        <Input id="participant-name" placeholder="Digite seu nome" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="participant-email">E-mail</Label>
                        <Input id="participant-email" type="email" placeholder="nome@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="participant-document">Documento (CPF ou passaporte)</Label>
                        <Input id="participant-document" placeholder="000.000.000-00" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="participant-phone">Telefone</Label>
                        <Input id="participant-phone" placeholder="(00) 90000-0000" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="participant-emergency">Contato de emergência</Label>
                        <Input id="participant-emergency" placeholder="Nome e telefone" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="participant-health">Informações de saúde</Label>
                        <Input id="participant-health" placeholder="Alergias, restrições, etc." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="participant-observations">Observações adicionais</Label>
                      <Textarea
                        id="participant-observations"
                        placeholder="Inclua observações importantes para a equipe organizadora"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Forma de pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup defaultValue="credit" className="space-y-3">
                      <div className="flex items-start space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value="credit" id="credit" />
                        <div>
                          <Label htmlFor="credit" className="font-medium text-foreground">
                            Cartão de crédito
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Pague em até 12x sem juros com os principais cartões.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value="pix" id="pix" />
                        <div>
                          <Label htmlFor="pix" className="font-medium text-foreground">
                            Pix
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Gere um QR Code e confirme sua reserva instantaneamente.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 rounded-lg border p-4">
                        <RadioGroupItem value="boleto" id="boleto" />
                        <div>
                          <Label htmlFor="boleto" className="font-medium text-foreground">
                            Boleto bancário
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Disponível até 7 dias antes do início da viagem.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Número do cartão</Label>
                        <Input id="card-number" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Nome impresso no cartão</Label>
                        <Input id="card-name" placeholder="Como aparece no cartão" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-expiration">Validade</Label>
                        <Input id="card-expiration" placeholder="MM/AA" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="card-cvv">CVV</Label>
                        <Input id="card-cvv" placeholder="123" />
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-brasil hover:opacity-90">
                      Confirmar pagamento
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {isPackagedTrip(trip) ? (
                  <div className="overflow-hidden rounded-xl border">
                    <img
                      src={trip.image}
                      alt={`Imagem do pacote ${trip.title}`}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                ) : null}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Resumo da viagem</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5 text-sm text-muted-foreground">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-foreground">
                        <span className="font-medium">Viagem</span>
                        <span className="text-right">{tripTitle}</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span>Período</span>
                        <span className="text-right">{tripPeriod || "A confirmar"}</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span>Participantes</span>
                        <span className="text-right">{participantCount} pessoa(s)</span>
                      </div>
                      {"notes" in trip && trip.notes ? (
                        <div className="rounded-md bg-muted/40 p-3 text-foreground">
                          <p className="font-medium">Observações</p>
                          <p className="text-sm leading-relaxed">{trip.notes}</p>
                        </div>
                      ) : null}
                      {isPackagedTrip(trip) ? (
                        <div className="rounded-md bg-muted/40 p-3 text-foreground">
                          <p className="font-medium">Parcerias incluídas</p>
                          <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                            <li>Transporte: {trip.partnerships.transport}</li>
                            <li>Hospedagem: {trip.partnerships.accommodation}</li>
                            <li>
                              Restaurante: {trip.partnerships.restaurant.name} ({trip.partnerships.restaurant.discount})
                            </li>
                          </ul>
                        </div>
                      ) : null}
                    </div>
                    <div className="space-y-3 rounded-lg border border-dashed border-muted-foreground/40 p-4 text-foreground">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          Detalhamento financeiro
                        </span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {serviceFeePercentDisplay}
                        </span>
                      </div>
                      <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                        <div className="flex items-center justify-between rounded-md bg-muted/60 p-3">
                          <dt className="text-muted-foreground">Custo base</dt>
                          <dd className="font-medium text-foreground">{basePriceDisplay}</dd>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-muted/60 p-3">
                          <dt className="text-muted-foreground">Transporte</dt>
                          <dd className="font-medium text-foreground">{transportDisplay}</dd>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-muted/60 p-3">
                          <dt className="text-muted-foreground">Custos extras</dt>
                          <dd className="font-medium text-foreground">{extrasDisplay}</dd>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-muted/60 p-3">
                          <dt className="text-muted-foreground">Taxa de serviço</dt>
                          <dd className="font-medium text-foreground">{serviceFeeDisplay}</dd>
                        </div>
                      </dl>
                      <div className="flex flex-col gap-1 rounded-md bg-primary/10 p-4 text-base font-semibold text-foreground sm:flex-row sm:items-center sm:justify-between">
                        <span>Total estimado</span>
                        <span>{totalDisplay}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Próximos passos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Após a confirmação do pagamento, você receberá um e-mail com o comprovante e todas as
                      informações necessárias para embarcar nessa experiência.
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Apresente o comprovante no ponto de encontro;</li>
                      <li>Chegue com 30 minutos de antecedência no primeiro dia de atividade;</li>
                      <li>Em caso de dúvidas, fale com nosso time pelo chat.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="border-dashed border-muted bg-muted/30">
              <CardContent className="py-12 text-center space-y-3">
                <CardTitle className="text-foreground">Nenhuma viagem selecionada</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Volte para a página de viagens para escolher um pacote ou confirmar seu interesse.
                </p>
                <Button className="bg-gradient-brasil hover:opacity-90" onClick={() => navigate("/viagens")}>
                  Explorar viagens
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pagamento;
