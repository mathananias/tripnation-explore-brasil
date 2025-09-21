export type Guide = {
  id: string;
  name: string;
  location: string;
  description: string;
  photo: string;
};

export const guides: Guide[] = [
  {
    id: "Maria",
    name: "Maria Silva",
    location: "Manaus, AM",
    description: "Especialista em expedições pela floresta amazônica e culturas ribeirinhas.",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: "mariana",
    name: "Mariana Castro",
    location: "Lençóis, BA",
    description: "Conhecedora das trilhas da Chapada Diamantina e apaixonada por fotografia.",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=500&h=500&fit=crop&crop=faces"
  },
  {
    id: "carlos",
    name: "Carlos Pereira",
    location: "Bonito, MS",
    description: "Mergulhador certificado que guia roteiros de ecoturismo e rios cristalinos.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: "luana",
    name: "Luana Ribeiro",
    location: "Florianópolis, SC",
    description: "Instrutora de surf e trilhas costeiras com foco em experiências sustentáveis.",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80"
  }
];
