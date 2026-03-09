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
          allergens: string[] | null
          avatar_url: string | null
          created_at: string
          dietary_needs: string[] | null
          display_name: string | null
          health_goals: string[] | null
          id: string
          updated_at: string
          user_id: string
          values: string[] | null
        }
        Insert: {
          allergens?: string[] | null
          avatar_url?: string | null
          created_at?: string
          dietary_needs?: string[] | null
          display_name?: string | null
          health_goals?: string[] | null
          id?: string
          updated_at?: string
          user_id: string
          values?: string[] | null
        }
        Update: {
          allergens?: string[] | null
          avatar_url?: string | null
          created_at?: string
          dietary_needs?: string[] | null
          display_name?: string | null
          health_goals?: string[] | null
          id?: string
          updated_at?: string
          user_id?: string
          values?: string[] | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
