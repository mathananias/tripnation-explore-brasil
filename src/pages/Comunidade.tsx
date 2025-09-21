import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, PlayCircle, Star, Plus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import amanhecerSerraImage from "@/assets/amanhecer-serra-estrelas.jpg";
import surfPraiaImage from "@/assets/surf-praia-atoba.jpg";
import trilhaPicoHorizonte from "@/assets/trilha-pico-horizonte.svg";
import escalaChapada from "@/assets/escalada-chapada.jpg";
import SEO from "@/components/SEO";
import { toast } from "@/hooks/use-toast";

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
  slug?: string;
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
  slug?: string;
};

type CommunityFeedItem = CommunityPost | ReviewItem;

const communityPosts: CommunityPost[] = [
  {
    type: "comunidade",
    id: 1,
    user: {
      name: "Marcos S.",
      location: "RJ"
    },
    content: "Uma das melhores experiências da minha vida",
    image: amanhecerSerraImage,
    location: "Amanhecer na Serra das Estrelas",
    likes: 120,
    comments: 15,
    timeAgo: "2h",
    slug: "serra-das-estrelas"
  },
  {
    type: "comunidade",
    id: 2,
    user: {
      name: "Edinaldo S.",
      location: "SP"
    },
    content: "Ondas perfeitas e muita energia boa",
    video: surfPraiaImage,
    location: "Surf na Praia do Atobá",
    likes: 98,
    comments: 8,
    timeAgo: "4h",
    slug: "praia-do-atoba"
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
    images: [trilhaPicoHorizonte]
  },
  {
    type: "avaliacao",
    id: 2,
    user: {
      name: "Pietra H.",
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
    images: [surfPraiaImage],
    slug: "praia-do-atoba"
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

type PostFormState = {
  title: string;
  location: string;
  content: string;
  tags: string;
};

const initialPostFormState: PostFormState = {
  title: "",
  location: "",
  content: "",
  tags: ""
};

const Comunidade = () => {
  const [searchParams] = useSearchParams();
  const tripFilter = searchParams.get("trip");
  const normalizedTripFilter = tripFilter?.trim().toLowerCase() ?? "";
  const hasTripFilter = normalizedTripFilter.length > 0;
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [showOnlyReviews, setShowOnlyReviews] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [postForm, setPostForm] = useState<PostFormState>(initialPostFormState);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);

  const handleResetPostForm = () => {
    setPostForm(initialPostFormState);
    setMediaFile(null);
    setIsSubmittingPost(false);
  };

  const handlePostFieldChange = (field: keyof PostFormState, value: string) => {
    setPostForm(prev => ({ ...prev, [field]: value }));
  };

  const handleMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setMediaFile(file);
  };

  const handleSubmitNewPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingPost(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Post criado com sucesso!",
        description: "Seu conteúdo foi enviado para análise e será publicado em breve."
      });

      handleResetPostForm();
      setIsCreatePostOpen(false);
    } catch (error) {
      console.error("Erro ao criar post", error);
      toast({
        title: "Não foi possível criar o post",
        description: "Tente novamente em instantes.",
        variant: "destructive"
      });
      setIsSubmittingPost(false);
    }
  };

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

  const feedBySlug = hasTripFilter
    ? communityFeed.filter(item => item.slug?.toLowerCase() === normalizedTripFilter)
    : communityFeed;

  const filteredFeed = feedBySlug.filter(item => {
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

  const noResultsWithSlug = hasTripFilter && filteredFeed.length === 0;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Comunidade | TripNation" description="Veja posts e conecte-se com aventureiros pelo Brasil." />
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-8">
            <div className="text-center md:text-left md:flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-laranja to-amarelo bg-clip-text text-transparent mb-4">
                Comunidade TripNation
              </h1>
              <p className="text-lg text-muted-foreground">
                Compartilhe suas aventuras e inspire outros viajantes
              </p>
              {hasTripFilter && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Mostrando conteúdos relacionados a
                  <Badge className="ml-2">{tripFilter}</Badge>
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 md:gap-5 mb-6">
            <Button
              variant={showOnlyReviews ? "default" : "outline"}
              size="sm"
              className="order-1 w-full md:order-none md:w-auto"
              onClick={handleToggleReviews}
            >
              {showOnlyReviews ? "Mostrando avaliações" : "Ver apenas avaliações"}
            </Button>

            {showOnlyReviews && (
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="order-2 w-full md:order-none md:w-[200px]">
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

            <Dialog
              open={isCreatePostOpen}
              onOpenChange={(open) => {
                setIsCreatePostOpen(open);
                if (!open) {
                  handleResetPostForm();
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="order-3 w-full md:order-none md:w-auto bg-gradient-brasil hover:opacity-90 transition-opacity shrink-0"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Criar Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Compartilhe sua aventura</DialogTitle>
                  <DialogDescription>
                    Preencha os detalhes da sua experiência para inspirar outros viajantes da comunidade.
                  </DialogDescription>
                </DialogHeader>

                <form className="space-y-4" onSubmit={handleSubmitNewPost}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="post-title">Título do post</Label>
                      <Input
                        id="post-title"
                        placeholder="Ex: Amanhecer inesquecível"
                        value={postForm.title}
                        onChange={(event) => handlePostFieldChange("title", event.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-location">Local</Label>
                      <Input
                        id="post-location"
                        placeholder="Cidade / destino"
                        value={postForm.location}
                        onChange={(event) => handlePostFieldChange("location", event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="post-content">Descrição</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Conte para a comunidade como foi a experiência"
                      value={postForm.content}
                      onChange={(event) => handlePostFieldChange("content", event.target.value)}
                      required
                      rows={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="post-tags">Tags (opcional)</Label>
                    <Input
                      id="post-tags"
                      placeholder="Ex: trilha, surf, camping"
                      value={postForm.tags}
                      onChange={(event) => handlePostFieldChange("tags", event.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Separe as tags por vírgulas para ajudar outros viajantes a encontrarem seu post.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="post-media">Foto ou vídeo</Label>
                    <Input
                      id="post-media"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleMediaChange}
                    />
                    {mediaFile && (
                      <p className="text-xs text-muted-foreground">Arquivo selecionado: {mediaFile.name}</p>
                    )}
                  </div>

                  <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsCreatePostOpen(false);
                        handleResetPostForm();
                      }}
                      disabled={isSubmittingPost}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={isSubmittingPost} className="bg-gradient-brasil hover:opacity-90">
                      {isSubmittingPost ? "Enviando..." : "Publicar post"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-6">
            {noResultsWithSlug && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Nenhum conteúdo encontrado para a viagem selecionada.
                </CardContent>
              </Card>
            )}

            {filteredFeed.map((item) => {
              const cardKey = `${item.type}-${item.id}`;
              const isHighlighted = hasTripFilter && item.slug?.toLowerCase() === normalizedTripFilter;

              if (item.type === "comunidade") {
                const post = item;

                return (
                  <Card
                    key={cardKey}
                    className={`overflow-hidden ${isHighlighted ? "border-2 border-primary shadow-lg" : ""}`}
                  >
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
                <Card
                  key={cardKey}
                  className={`overflow-hidden ${isHighlighted ? "border-2 border-primary shadow-lg" : ""}`}
                >
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
