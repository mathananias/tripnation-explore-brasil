import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Heart, MessageCircle, Share2, PlayCircle, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import amanhecerSerraImage from "@/assets/amanhecer-serra-estrelas.jpg";
import surfPraiaImage from "@/assets/surf-praia-atoba.jpg";
import placeholderAvatar from "@/assets/placeholder.svg";
import escalaChapada from "@/assets/escalada-chapada.jpg";
import SEO from "@/components/SEO";

type CommunityPost = {
  type: "comunidade";
  id: number;
  user: {
    name: string;
    location: string;
    avatar?: string;
  };
  content: string;
  image?: string;
  video?: string;
  location: string;
  likes: number;
  comments: number;
  timeAgo: string;
};

type ReviewItem = {
  type: "avaliacao";
  id: number;
  user: {
    name: string;
    location: string;
    avatar?: string;
  };
  destination: string;
  rating: number;
  comment: string;
  date: string;
  images: string[];
};

type CommunityFeedItem = CommunityPost | ReviewItem;

const communityPosts: CommunityPost[] = [
  {
    type: "comunidade",
    id: 1,
    user: {
      name: "João R.",
      location: "RJ"
    },
    content: "Uma das melhores experiências da minha vida",
    image: amanhecerSerraImage,
    location: "Amanhecer na Serra das Estrelas",
    likes: 120,
    comments: 15,
    timeAgo: "2h"
  },
  {
    type: "comunidade",
    id: 2,
    user: {
      name: "Marina S.",
      location: "SP"
    },
    content: "Ondas perfeitas e muita energia boa",
    video: surfPraiaImage,
    location: "Surf na Praia do Atobá",
    likes: 98,
    comments: 8,
    timeAgo: "4h"
  },
  {
    type: "comunidade",
    id: 3,
    user: {
      name: "Camila P.",
      location: "SP"
    },
    content: "alguém recomenda uma cidade com trilhas dentro de umas 3h de São Paulo?",
    location: "Perguntas da Comunidade",
    likes: 32,
    comments: 12,
    timeAgo: "1d"
  }
];

const mockReviews: ReviewItem[] = [
  {
    type: "avaliacao",
    id: 1,
    user: {
      name: "Camila P.",
      location: "SP"
    },
    destination: "Trilha do Pico do Horizonte",
    rating: 5,
    comment: "Passeio incrível, guia muito atencioso",
    date: "15 Jan 2024",
    images: [placeholderAvatar]
  },
  {
    type: "avaliacao",
    id: 2,
    user: {
      name: "Pedro H.",
      location: "RJ"
    },
    destination: "Cachoeira das Águas Claras",
    rating: 4,
    comment: "Lugar lindo, mas acesso um pouco difícil",
    date: "10 Jan 2024",
    images: []
  },
  {
    type: "avaliacao",
    id: 3,
    user: {
      name: "Ana Clara M.",
      location: "MG"
    },
    destination: "Surf na Praia do Atobá",
    rating: 5,
    comment:
      "Experiência única! As ondas estavam perfeitas e o instrutor foi excepcional. Recomendo muito para quem quer aprender ou aperfeiçoar o surf.",
    date: "8 Jan 2024",
    images: [surfPraiaImage, placeholderAvatar]
  },
  {
    type: "avaliacao",
    id: 4,
    user: {
      name: "Lucas R.",
      location: "RS"
    },
    destination: "Escalada na Chapada Encantada",
    rating: 4,
    comment: "Vista espetacular no topo! Equipamentos de segurança em perfeito estado.",
    date: "5 Jan 2024",
    images: [escalaChapada]
  }
];

const communityFeed: CommunityFeedItem[] = [...communityPosts, ...mockReviews];

const getAvatarUrl = (name: string, avatarUrl?: string) => {
  if (avatarUrl && avatarUrl.trim().length > 0) {
    return avatarUrl;
  }

  return `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}`;
};

const Comunidade = () => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [showOnlyReviews, setShowOnlyReviews] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("all");

  const handleToggleReviews = () => {
    setShowOnlyReviews(prev => {
      const next = !prev;
      if (!next) {
        setRatingFilter("all");
      }
      return next;
    });
  };

  const handleLike = (postKey: string) => {
    setLikedPosts(prev =>
      prev.includes(postKey)
        ? prev.filter(id => id !== postKey)
        : [...prev, postKey]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  const filteredFeed = communityFeed.filter(item => {
    if (showOnlyReviews) {
      if (item.type !== "avaliacao") {
        return false;
      }

      if (ratingFilter !== "all") {
        return item.rating === Number(ratingFilter);
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Comunidade | TripNation" description="Veja posts e conecte-se com aventureiros pelo Brasil." />
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-laranja to-amarelo bg-clip-text text-transparent mb-4">
              Comunidade TripNation
            </h1>
            <p className="text-lg text-muted-foreground">
              Compartilhe suas aventuras e inspire outros viajantes
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Button
              variant={showOnlyReviews ? "default" : "outline"}
              size="sm"
              onClick={handleToggleReviews}
            >
              {showOnlyReviews ? "Mostrando avaliações" : "Ver apenas avaliações"}
            </Button>

            {showOnlyReviews && (
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por nota" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as notas</SelectItem>
                  {[5, 4, 3, 2, 1].map(rating => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating} estrelas
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="space-y-6">
            {filteredFeed.map((item) => {
              const cardKey = `${item.type}-${item.id}`;

              if (item.type === "comunidade") {
                const post = item;

                return (
                  <Card key={cardKey} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={getAvatarUrl(post.user.name, post.user.avatar)}
                              alt={`Avatar de ${post.user.name}`}
                            />
                            <AvatarFallback>
                              {post.user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{post.user.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {post.user.location} • {post.timeAgo}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{post.location}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <p className="text-foreground mb-4">{post.content}</p>

                      <div className="relative mb-4">
                        {post.image && (
                          <img
                            src={post.image}
                            alt={post.location}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        )}
                        {post.video && (
                          <div className="relative">
                            <img
                              src={post.video}
                              alt={post.location}
                              className="w-full h-64 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button
                                size="icon"
                                className="h-16 w-16 rounded-full bg-black/50 hover:bg-black/70"
                                aria-label="Reproduzir vídeo"
                              >
                                <PlayCircle aria-hidden="true" className="h-8 w-8 text-white" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(cardKey)}
                            className={likedPosts.includes(cardKey) ? "text-red-500" : ""}
                          >
                            <Heart
                              aria-hidden="true"
                              className={`h-4 w-4 mr-1 ${likedPosts.includes(cardKey) ? "fill-current" : ""}`}
                            />
                            {post.likes + (likedPosts.includes(cardKey) ? 1 : 0)}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle aria-hidden="true" className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 aria-hidden="true" className="h-4 w-4 mr-1" />
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }

              const review = item;

              return (
                <Card key={cardKey} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={getAvatarUrl(review.user.name, review.user.avatar)}
                            alt={`Avatar de ${review.user.name}`}
                          />
                          <AvatarFallback>
                            {review.user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{review.user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {review.user.location} • {review.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{review.destination}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex space-x-1 text-yellow-400">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm font-medium">{review.rating}/5</span>
                    </div>

                    <p className="text-foreground mb-4">{review.comment}</p>

                    {review.images.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {review.images.map((image, index) => (
                          <img
                            key={`${cardKey}-image-${index}`}
                            src={image}
                            alt={`Foto ${index + 1} da avaliação`}
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-gradient-to-r from-laranja to-amarelo hover:from-laranja/90 hover:to-amarelo/90">
              Carregar mais posts
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Comunidade;
