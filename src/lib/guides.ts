export type Guide = {
  id: string;
  name: string;
  location: string;
  description: string;
  photo: string;
};

export const guides: Guide[] = [
  {
    id: "joao",
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
    photo: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: "carlos",
    name: "Carla Pereira",
    location: "Bonito, MS",
    description: "Mergulhadora certificada que guia roteiros de ecoturismo e rios cristalinos.",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b742?auto=format&fit=crop&w=256&q=80"
  },
  {
    id: "luana",
    name: "Luana Ribeiro",
    location: "Florianópolis, SC",
    description: "Instrutora de surf e trilhas costeiras com foco em experiências sustentáveis.",
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=256&q=80"
  }
];
