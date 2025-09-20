import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, PlayCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import amanhecerSerraImage from "@/assets/amanhecer-serra-estrelas.jpg";
import surfPraiaImage from "@/assets/surf-praia-atoba.jpg";
import placeholderAvatar from "@/assets/placeholder.svg";
import SEO from "@/components/SEO";

const mockPosts = [
  {
    id: 1,
    user: {
      name: "João R.",
      location: "RJ",
      avatar: placeholderAvatar
    },
    content: "Uma das melhores experiências da minha vida",
    image: amanhecerSerraImage,
    location: "Amanhecer na Serra das Estrelas",
    likes: 120,
    comments: 15,
    timeAgo: "2h"
  },
  {
    id: 2,
    user: {
      name: "Marina S.",
      location: "SP",
      avatar: placeholderAvatar
    },
    content: "Ondas perfeitas e muita energia boa",
    video: surfPraiaImage,
    location: "Surf na Praia do Atobá",
    likes: 98,
    comments: 8,
    timeAgo: "4h"
  }
];

const Comunidade = () => {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

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

          <div className="space-y-6">
            {mockPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback>
                          {post.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{post.user.name}</p>
                        <p className="text-sm text-muted-foreground">{post.user.location} • {post.timeAgo}</p>
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
                        onClick={() => handleLike(post.id)}
                        className={likedPosts.includes(post.id) ? "text-red-500" : ""}
                      >
                        <Heart aria-hidden="true" className={`h-4 w-4 mr-1 ${likedPosts.includes(post.id) ? "fill-current" : ""}`} />
                        {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
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
            ))}
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
