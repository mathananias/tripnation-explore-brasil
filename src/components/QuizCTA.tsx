import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

/**
 * Este componente fornece um CTA de quiz que abre um modal para descobrir
 * qual tipo de viagem mais combina com o usuário. Ele segue os padrões de
 * estilo e estrutura utilizados no repositório TripNation, usando os
 * componentes de UI (Button, Dialog, RadioGroup) e utilitários de navegação.
 */
const QUESTIONS = [{
  id: "q1",
  title: "Qual cenário mais combina com você?",
  options: [{
    value: "praia",
    label: "Praia e mar",
    profile: "radical"
  }, {
    value: "montanha",
    label: "Montanhas e trilhas",
    profile: "radical"
  }, {
    value: "cidade",
    label: "Cidades culturais",
    profile: "consciente"
  }, {
    value: "natureza_tranquila",
    label: "Natureza tranquila (cachoeiras, vilas)",
    profile: "social"
  }]
}, {
  id: "q2",
  title: "Qual atividade você quer praticar?",
  options: [{
    value: "surf",
    label: "Surf / esportes aquáticos",
    profile: "radical"
  }, {
    value: "trilhas",
    label: "Trekking / trilhas",
    profile: "radical"
  }, {
    value: "ciclismo",
    label: "Ciclismo / corrida",
    profile: "radical"
  }, {
    value: "yoga",
    label: "Yoga / bem-estar",
    profile: "consciente"
  }, {
    value: "cultural",
    label: "Atividades culturais / gastronômicas",
    profile: "social"
  }]
}, {
  id: "q3",
  title: "Sobre o preço, o que pesa mais?",
  options: [{
    value: "acessivel",
    label: "Preço acessível acima de tudo",
    profile: "social"
  }, {
    value: "custo_beneficio",
    label: "Bom custo-benefício",
    profile: "consciente"
  }, {
    value: "conforto",
    label: "Conforto e exclusividade",
    profile: "consciente"
  }]
}, {
  id: "q4",
  title: "Você prefere viajar com guia local?",
  options: [{
    value: "guia_sim",
    label: "Sim, para me sentir seguro(a)",
    profile: "consciente"
  }, {
    value: "guia_depende",
    label: "Depende do destino",
    profile: "social"
  }, {
    value: "guia_nao",
    label: "Não, prefiro explorar sozinho(a)",
    profile: "solo"
  }]
}, {
  id: "q5",
  title: "O quanto a segurança influencia na sua escolha?",
  options: [{
    value: "seg_essencial",
    label: "Essencial: prioridade máxima",
    profile: "consciente"
  }, {
    value: "seg_importante",
    label: "Importante, mas não decisiva",
    profile: "social"
  }, {
    value: "seg_aventura",
    label: "Procuro aventura, sem tanta preocupação",
    profile: "radical"
  }]
}, {
  id: "q6",
  title: "Qual é o seu estilo de viagem?",
  options: [{
    value: "grupo_desconhecidos",
    label: "Grupos com pessoas novas",
    profile: "social"
  }, {
    value: "grupo_pequeno",
    label: "Poucas pessoas e boas conexões",
    profile: "consciente"
  }, {
    value: "solo_suporte",
    label: "Sozinho(a), com suporte da TripNation",
    profile: "solo"
  }]
}, {
  id: "q7",
  title: "O que mais te motiva a viajar?",
  options: [{
    value: "mot_pessoas",
    label: "Conhecer novas pessoas",
    profile: "social"
  }, {
    value: "mot_natureza",
    label: "Conexão com a natureza",
    profile: "consciente"
  }, {
    value: "mot_desafio",
    label: "Superar desafios / aventura",
    profile: "radical"
  }, {
    value: "mot_rotina",
    label: "Sair da rotina / relaxar",
    profile: "social"
  }]
}] as const;

// Definição dos perfis de resultado com título, descrição e CTAs.
const PROFILES = {
  social: {
    title: "Explorador Social",
    description: "Você vibra com grupos, novas amizades e experiências leves. Perfeito para viagens em grupo, trilhas tranquilas, yoga e passeios culturais.",
    ctas: [{
      label: "Ver viagens em grupo",
      to: "/viagens?tipo=grupo"
    }, {
      label: "Entrar em grupos abertos",
      to: "/comunidade?grupos=abertos"
    }]
  },
  radical: {
    title: "Aventureiro Radical",
    description: "Adrenalina na veia! Surf trips, trekking em montanhas, pedal e esportes outdoor com aquele friozinho bom na barriga.",
    ctas: [{
      label: "Explorar esportes de aventura",
      to: "/viagens?tema=aventura&nivel=intermediario%2B"
    }, {
      label: "Ver surf trips",
      to: "/viagens?atividade=surf"
    }]
  },
  consciente: {
    title: "Viajante Consciente",
    description: "Impacto positivo e segurança em primeiro lugar. Curadoria local, guias certificados e vivências sustentáveis.",
    ctas: [{
      label: "Experiências sustentáveis",
      to: "/viagens?filtro=sustentavel&guia=sim"
    }, {
      label: "Projetos de comunidade",
      to: "/viagens?tema=comunidade"
    }]
  },
  solo: {
    title: "Descobridor Solo",
    description: "Você curte autonomia com suporte quando precisa. Viagens curtas, organização simples e segurança sem abrir mão da liberdade.",
    ctas: [{
      label: "Viagens solo com suporte",
      to: "/viagens?modo=solo&suporte=tripnation"
    }, {
      label: "Dicas da comunidade",
      to: "/comunidade?topico=solo"
    }]
  }
} as const;

/**
 * Função auxiliar para calcular o perfil com base nas respostas.
 * Percorre cada pergunta e incrementa a pontuação do perfil correspondente.
 */
function computeProfile(answers: Record<string, string>): keyof typeof PROFILES {
  const scores: Record<string, number> = {
    social: 0,
    radical: 0,
    consciente: 0,
    solo: 0
  };
  for (const question of QUESTIONS) {
    const answer = answers[question.id];
    const option = question.options.find(opt => opt.value === answer);
    if (option) {
      scores[option.profile] += 1;
    }
  }
  // Ordem de desempate: consciente > social > radical > solo
  const order: (keyof typeof PROFILES)[] = ["consciente", "social", "radical", "solo"];
  return order.reduce((best, current) => scores[current] > scores[best] ? current : best, order[0]);
}
const QuizCTA = () => {
  // Controle de abertura do modal
  const [open, setOpen] = useState<boolean>(false);
  // Etapa atual do quiz: 0 = introdução, 1..7 = perguntas, 8 = resultado
  const [step, setStep] = useState<number>(0);
  // Respostas selecionadas
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Determina se o botão Próxima está habilitado
  const currentQuestion = step >= 1 && step <= QUESTIONS.length ? QUESTIONS[step - 1] : null;
  const canAdvance = !currentQuestion || Boolean(answers[currentQuestion.id]);

  // Calcula o perfil apenas quando na etapa de resultado
  const resultKey: keyof typeof PROFILES | null = step === QUESTIONS.length + 1 ? computeProfile(answers) : null;
  const handleNext = () => {
    // avançar para próxima etapa ou fechar
    if (step === 0) {
      setStep(1);
    } else if (step >= 1 && step < QUESTIONS.length) {
      setStep(step + 1);
    } else if (step === QUESTIONS.length) {
      setStep(QUESTIONS.length + 1);
    } else if (step === QUESTIONS.length + 1) {
      // concluir
      setOpen(false);
      setStep(0);
      setAnswers({});
    }
  };
  const handleBack = () => {
    if (step > 1 && step <= QUESTIONS.length) {
      setStep(step - 1);
    }
  };
  const startQuiz = () => {
    setOpen(true);
    setStep(1);
  };
  return <div className="flex flex-col items-center">
      {/* Botão CTA para abrir o quiz */}
      <Button variant="secondary" onClick={startQuiz} className="mt-6 my-[45px] mx-0 px-[58px]">
        Descubra sua viagem ideal
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl w-full">
          {step === 0 && <div className="space-y-4 text-center">
              <DialogHeader>
                <DialogTitle>Quiz TripNation</DialogTitle>
                <DialogDescription>
                  Responda 7 perguntas rápidas e descubra qual experiência combina melhor com você.
                </DialogDescription>
              </DialogHeader>
              <Button onClick={() => setStep(1)}>Começar</Button>
            </div>}
          {step >= 1 && step <= QUESTIONS.length && currentQuestion && <div className="space-y-6">
              <DialogHeader className="mb-2">
                <DialogTitle className="text-lg font-bold">
                  {currentQuestion.title}
                </DialogTitle>
              </DialogHeader>
              <RadioGroup value={answers[currentQuestion.id] ?? ""} onValueChange={(val: string) => setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: val
          }))} className="grid gap-3">
                {currentQuestion.options.map(opt => <label key={opt.value} htmlFor={`${currentQuestion.id}-${opt.value}`} className="flex items-center space-x-3 p-3 border rounded-md cursor-pointer hover:bg-accent/40">
                    <RadioGroupItem value={opt.value} id={`${currentQuestion.id}-${opt.value}`} className="" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {opt.label}
                    </span>
                  </label>)}
              </RadioGroup>
              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" disabled={step === 1} onClick={handleBack}>
                  Voltar
                </Button>
                <Button onClick={handleNext} disabled={!canAdvance}>
                  {step === QUESTIONS.length ? "Ver resultado" : "Próxima"}
                </Button>
              </div>
            </div>}
          {step === QUESTIONS.length + 1 && resultKey && <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">
                  Seu perfil: {PROFILES[resultKey].title}
                </DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                {PROFILES[resultKey].description}
              </p>
              <div className="grid gap-3">
                {PROFILES[resultKey].ctas.map(cta => <Button key={cta.to} className="w-full" onClick={() => {
              // fecha o modal antes de navegar
              setOpen(false);
              navigate(cta.to);
            }}>
                    {cta.label}
                  </Button>)}
              </div>
              <div className="flex items-center justify-between pt-4">
                <Button variant="outline" onClick={() => {
              setStep(1);
              setAnswers({});
            }}>
                  Refazer
                </Button>
                <Button onClick={() => {
              setOpen(false);
              setStep(0);
              setAnswers({});
            }}>Concluir</Button>
              </div>
            </div>}
        </DialogContent>
      </Dialog>
    </div>;
};
export default QuizCTA;