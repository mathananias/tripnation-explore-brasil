export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      community_posts: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          image_url: string | null;
          likes_count: number | null;
          location: string | null;
          user_id: string;
          video_url: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          likes_count?: number | null;
          location?: string | null;
          user_id: string;
          video_url?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          image_url?: string | null;
          likes_count?: number | null;
          location?: string | null;
          user_id?: string;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "community_posts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      document_uploads: {
        Row: {
          created_at: string;
          document_type: string;
          file_url: string;
          id: string;
          user_id: string;
          verified: boolean | null;
        };
        Insert: {
          created_at?: string;
          document_type: string;
          file_url: string;
          id?: string;
          user_id: string;
          verified?: boolean | null;
        };
        Update: {
          created_at?: string;
          document_type?: string;
          file_url?: string;
          id?: string;
          user_id?: string;
          verified?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "document_uploads_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          cep: string;
          complemento: string;
          created_at: string;
          cpf: string;
          engagement_points: number | null;
          favorite_sports: string[] | null;
          full_name: string | null;
          id: string;
          rua: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          cep?: string;
          complemento?: string;
          created_at?: string;
          cpf?: string;
          engagement_points?: number | null;
          favorite_sports?: string[] | null;
          full_name?: string | null;
          id?: string;
          rua?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          cep?: string;
          complemento?: string;
          created_at?: string;
          cpf?: string;
          engagement_points?: number | null;
          favorite_sports?: string[] | null;
          full_name?: string | null;
          id?: string;
          rua?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      reviews: {
        Row: {
          comment: string;
          created_at: string;
          destination: string;
          id: string;
          image_url: string | null;
          rating: number;
          user_id: string;
        };
        Insert: {
          comment: string;
          created_at?: string;
          destination: string;
          id?: string;
          image_url?: string | null;
          rating: number;
          user_id: string;
        };
        Update: {
          comment?: string;
          created_at?: string;
          destination?: string;
          id?: string;
          image_url?: string | null;
          rating?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reviews_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      trips: {
        Row: {
          completed: boolean | null;
          completed_date: string | null;
          created_at: string;
          destination: string;
          id: string;
          user_id: string;
        };
        Insert: {
          completed?: boolean | null;
          completed_date?: string | null;
          created_at?: string;
          destination: string;
          id?: string;
          user_id: string;
        };
        Update: {
          completed?: boolean | null;
          completed_date?: string | null;
          created_at?: string;
          destination?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trips_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      update_updated_at_column: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
