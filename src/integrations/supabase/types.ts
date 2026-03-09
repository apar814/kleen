export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      allergen_ingredients: {
        Row: {
          aliases: string[] | null
          allergen_category: string
          created_at: string
          id: string
          ingredient_name: string
          severity_note: string | null
        }
        Insert: {
          aliases?: string[] | null
          allergen_category: string
          created_at?: string
          id?: string
          ingredient_name: string
          severity_note?: string | null
        }
        Update: {
          aliases?: string[] | null
          allergen_category?: string
          created_at?: string
          id?: string
          ingredient_name?: string
          severity_note?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges: {
        Row: {
          badge_emoji: string | null
          category: string
          created_at: string
          description: string | null
          difficulty: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          points: number | null
          start_date: string | null
        }
        Insert: {
          badge_emoji?: string | null
          category: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          points?: number | null
          start_date?: string | null
        }
        Update: {
          badge_emoji?: string | null
          category?: string
          created_at?: string
          description?: string | null
          difficulty?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          points?: number | null
          start_date?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          product_context_id: string | null
          role: string
          session_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          product_context_id?: string | null
          role: string
          session_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          product_context_id?: string | null
          role?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string
          id: string
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      grocery_lists: {
        Row: {
          cart_score: number | null
          created_at: string
          flagged_items: number | null
          id: string
          items: Json
          name: string
          total_items: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cart_score?: number | null
          created_at?: string
          flagged_items?: number | null
          id?: string
          items?: Json
          name?: string
          total_items?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cart_score?: number | null
          created_at?: string
          flagged_items?: number | null
          id?: string
          items?: Json
          name?: string
          total_items?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_goals: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          recommended_categories: string[] | null
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          recommended_categories?: string[] | null
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          recommended_categories?: string[] | null
          slug?: string
        }
        Relationships: []
      }
      households: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          owner_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      ingredients: {
        Row: {
          ai_summary: string
          aliases: string[] | null
          banned_in: string[] | null
          category: string
          clean_alternatives: string[] | null
          created_at: string
          description: string
          found_in: string[] | null
          health_risks: string[] | null
          id: string
          name: string
          risk_level: number
          sources: string[] | null
          updated_at: string
        }
        Insert: {
          ai_summary: string
          aliases?: string[] | null
          banned_in?: string[] | null
          category: string
          clean_alternatives?: string[] | null
          created_at?: string
          description: string
          found_in?: string[] | null
          health_risks?: string[] | null
          id?: string
          name: string
          risk_level: number
          sources?: string[] | null
          updated_at?: string
        }
        Update: {
          ai_summary?: string
          aliases?: string[] | null
          banned_in?: string[] | null
          category?: string
          clean_alternatives?: string[] | null
          created_at?: string
          description?: string
          found_in?: string[] | null
          health_risks?: string[] | null
          id?: string
          name?: string
          risk_level?: number
          sources?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          challenge_reminders: boolean | null
          created_at: string
          id: string
          product_alerts: boolean | null
          social_notifications: boolean | null
          streak_alerts: boolean | null
          user_id: string
          weekly_report: boolean | null
        }
        Insert: {
          challenge_reminders?: boolean | null
          created_at?: string
          id?: string
          product_alerts?: boolean | null
          social_notifications?: boolean | null
          streak_alerts?: boolean | null
          user_id: string
          weekly_report?: boolean | null
        }
        Update: {
          challenge_reminders?: boolean | null
          created_at?: string
          id?: string
          product_alerts?: boolean | null
          social_notifications?: boolean | null
          streak_alerts?: boolean | null
          user_id?: string
          weekly_report?: boolean | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          data: Json | null
          id: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          data?: Json | null
          id?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      product_ingredients: {
        Row: {
          amount: string | null
          id: string
          ingredient_id: string
          is_active: boolean | null
          product_id: string
        }
        Insert: {
          amount?: string | null
          id?: string
          ingredient_id: string
          is_active?: boolean | null
          product_id: string
        }
        Update: {
          amount?: string | null
          id?: string
          ingredient_id?: string
          is_active?: boolean | null
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_ingredients_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          affiliate_link: string | null
          asin: string | null
          brand_id: string | null
          category_id: string | null
          certifications: string[] | null
          created_at: string
          id: string
          image_url: string | null
          kleen_score: number | null
          name: string
          price: number | null
          score_band: string | null
          score_concerns: string[] | null
          score_drivers: string[] | null
          serving_size: string | null
          servings_per_container: number | null
          upc: string | null
          updated_at: string
        }
        Insert: {
          affiliate_link?: string | null
          asin?: string | null
          brand_id?: string | null
          category_id?: string | null
          certifications?: string[] | null
          created_at?: string
          id?: string
          image_url?: string | null
          kleen_score?: number | null
          name: string
          price?: number | null
          score_band?: string | null
          score_concerns?: string[] | null
          score_drivers?: string[] | null
          serving_size?: string | null
          servings_per_container?: number | null
          upc?: string | null
          updated_at?: string
        }
        Update: {
          affiliate_link?: string | null
          asin?: string | null
          brand_id?: string | null
          category_id?: string | null
          certifications?: string[] | null
          created_at?: string
          id?: string
          image_url?: string | null
          kleen_score?: number | null
          name?: string
          price?: number | null
          score_band?: string | null
          score_concerns?: string[] | null
          score_drivers?: string[] | null
          serving_size?: string | null
          servings_per_container?: number | null
          upc?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          allergen_severities: Json | null
          allergens: string[] | null
          avatar_url: string | null
          community: string | null
          created_at: string
          dietary_needs: string[] | null
          dietary_restrictions: string[] | null
          display_name: string | null
          health_goals: string[] | null
          household_id: string | null
          id: string
          updated_at: string
          user_id: string
          values: string[] | null
        }
        Insert: {
          allergen_severities?: Json | null
          allergens?: string[] | null
          avatar_url?: string | null
          community?: string | null
          created_at?: string
          dietary_needs?: string[] | null
          dietary_restrictions?: string[] | null
          display_name?: string | null
          health_goals?: string[] | null
          household_id?: string | null
          id?: string
          updated_at?: string
          user_id: string
          values?: string[] | null
        }
        Update: {
          allergen_severities?: Json | null
          allergens?: string[] | null
          avatar_url?: string | null
          community?: string | null
          created_at?: string
          dietary_needs?: string[] | null
          dietary_restrictions?: string[] | null
          display_name?: string | null
          health_goals?: string[] | null
          household_id?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          values?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          ingredients: Json
          is_public: boolean | null
          name: string
          recipe_score: number | null
          source_url: string | null
          swaps_suggested: Json | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          ingredients?: Json
          is_public?: boolean | null
          name: string
          recipe_score?: number | null
          source_url?: string | null
          swaps_suggested?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          ingredients?: Json
          is_public?: boolean | null
          name?: string
          recipe_score?: number | null
          source_url?: string | null
          swaps_suggested?: Json | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      saved_comparisons: {
        Row: {
          created_at: string
          id: string
          product_ids: string[]
          title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_ids: string[]
          title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_ids?: string[]
          title?: string | null
          user_id?: string
        }
        Relationships: []
      }
      saved_products: {
        Row: {
          created_at: string
          id: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      scan_history: {
        Row: {
          cart_score: number | null
          created_at: string
          flagged_products: number | null
          id: string
          product_ids: string[]
          source: string | null
          swaps_suggested: number | null
          total_products: number | null
          user_id: string
        }
        Insert: {
          cart_score?: number | null
          created_at?: string
          flagged_products?: number | null
          id?: string
          product_ids: string[]
          source?: string | null
          swaps_suggested?: number | null
          total_products?: number | null
          user_id: string
        }
        Update: {
          cart_score?: number | null
          created_at?: string
          flagged_products?: number | null
          id?: string
          product_ids?: string[]
          source?: string | null
          swaps_suggested?: number | null
          total_products?: number | null
          user_id?: string
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          comments_count: number | null
          community: string | null
          content: Json
          created_at: string
          id: string
          is_featured: boolean | null
          likes_count: number | null
          post_type: string
          user_id: string
        }
        Insert: {
          comments_count?: number | null
          community?: string | null
          content?: Json
          created_at?: string
          id?: string
          is_featured?: boolean | null
          likes_count?: number | null
          post_type: string
          user_id: string
        }
        Update: {
          comments_count?: number | null
          community?: string | null
          content?: Json
          created_at?: string
          id?: string
          is_featured?: boolean | null
          likes_count?: number | null
          post_type?: string
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          chat_messages_used: number | null
          created_at: string
          date: string
          id: string
          receipt_scans_used: number | null
          scans_used: number | null
          user_id: string
        }
        Insert: {
          chat_messages_used?: number | null
          created_at?: string
          date?: string
          id?: string
          receipt_scans_used?: number | null
          scans_used?: number | null
          user_id: string
        }
        Update: {
          chat_messages_used?: number | null
          created_at?: string
          date?: string
          id?: string
          receipt_scans_used?: number | null
          scans_used?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_challenges: {
        Row: {
          challenge_id: string
          completed_at: string | null
          created_at: string
          id: string
          progress: number | null
          status: string
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          status?: string
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string | null
          created_at?: string
          id?: string
          progress?: number | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_challenges_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_points: {
        Row: {
          current_streak: number | null
          id: string
          last_scan_date: string | null
          level: number | null
          level_name: string | null
          longest_streak: number | null
          streak_freeze_available: boolean | null
          total_points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          current_streak?: number | null
          id?: string
          last_scan_date?: string | null
          level?: number | null
          level_name?: string | null
          longest_streak?: number | null
          streak_freeze_available?: boolean | null
          total_points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          current_streak?: number | null
          id?: string
          last_scan_date?: string | null
          level?: number | null
          level_name?: string | null
          longest_streak?: number | null
          streak_freeze_available?: boolean | null
          total_points?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      weekly_reports: {
        Row: {
          data: Json
          generated_at: string
          id: string
          overall_score: number | null
          user_id: string
          week_end: string
          week_start: string
        }
        Insert: {
          data?: Json
          generated_at?: string
          id?: string
          overall_score?: number | null
          user_id: string
          week_end: string
          week_start: string
        }
        Update: {
          data?: Json
          generated_at?: string
          id?: string
          overall_score?: number | null
          user_id?: string
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_chat_usage: {
        Args: { usage_date?: string; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
