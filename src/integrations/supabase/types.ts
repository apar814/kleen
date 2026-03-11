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
      auto_shop_feedback: {
        Row: {
          created_at: string
          feedback_type: string
          id: string
          item_name: string
          notes: string | null
          order_id: string
          product_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          feedback_type?: string
          id?: string
          item_name: string
          notes?: string | null
          order_id: string
          product_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          feedback_type?: string
          id?: string
          item_name?: string
          notes?: string | null
          order_id?: string
          product_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auto_shop_feedback_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "auto_shop_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "auto_shop_feedback_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_shop_orders: {
        Row: {
          average_score: number | null
          created_at: string
          generated_items: Json
          id: string
          notes: string | null
          profile_id: string
          review_deadline: string | null
          status: string
          store_name: string | null
          total_cost: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          average_score?: number | null
          created_at?: string
          generated_items?: Json
          id?: string
          notes?: string | null
          profile_id: string
          review_deadline?: string | null
          status?: string
          store_name?: string | null
          total_cost?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          average_score?: number | null
          created_at?: string
          generated_items?: Json
          id?: string
          notes?: string | null
          profile_id?: string
          review_deadline?: string | null
          status?: string
          store_name?: string | null
          total_cost?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "auto_shop_orders_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "auto_shop_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      auto_shop_profiles: {
        Row: {
          active: boolean
          budget: number
          created_at: string
          delivery_day: string | null
          dietary_preferences: Json
          household_size: number
          id: string
          min_score: number
          must_haves: Json
          never_buy: Json
          preferred_stores: Json
          schedule: string
          updated_at: string
          user_id: string
        }
        Insert: {
          active?: boolean
          budget?: number
          created_at?: string
          delivery_day?: string | null
          dietary_preferences?: Json
          household_size?: number
          id?: string
          min_score?: number
          must_haves?: Json
          never_buy?: Json
          preferred_stores?: Json
          schedule?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          active?: boolean
          budget?: number
          created_at?: string
          delivery_day?: string | null
          dietary_preferences?: Json
          household_size?: number
          id?: string
          min_score?: number
          must_haves?: Json
          never_buy?: Json
          preferred_stores?: Json
          schedule?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      baby_allergen_tracking: {
        Row: {
          allergen_name: string
          baby_id: string
          created_at: string
          id: string
          introduced_at: string | null
          reaction_noted: string | null
          status: string | null
        }
        Insert: {
          allergen_name: string
          baby_id: string
          created_at?: string
          id?: string
          introduced_at?: string | null
          reaction_noted?: string | null
          status?: string | null
        }
        Update: {
          allergen_name?: string
          baby_id?: string
          created_at?: string
          id?: string
          introduced_at?: string | null
          reaction_noted?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "baby_allergen_tracking_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "baby_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      baby_feeding_logs: {
        Row: {
          baby_id: string
          fed_at: string
          feeding_type: string | null
          food_name: string
          id: string
          notes: string | null
          product_id: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          baby_id: string
          fed_at?: string
          feeding_type?: string | null
          food_name: string
          id?: string
          notes?: string | null
          product_id?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          baby_id?: string
          fed_at?: string
          feeding_type?: string | null
          food_name?: string
          id?: string
          notes?: string | null
          product_id?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "baby_feeding_logs_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "baby_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "baby_feeding_logs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      baby_product_scores: {
        Row: {
          added_sugar_grams: number | null
          age_appropriate_from_months: number | null
          age_appropriate_to_months: number | null
          allergen_concerns: Json | null
          baby_score: number | null
          created_at: string
          heavy_metal_risk: string | null
          id: string
          missing_nutrients: Json | null
          organic_certified: boolean | null
          product_id: string | null
        }
        Insert: {
          added_sugar_grams?: number | null
          age_appropriate_from_months?: number | null
          age_appropriate_to_months?: number | null
          allergen_concerns?: Json | null
          baby_score?: number | null
          created_at?: string
          heavy_metal_risk?: string | null
          id?: string
          missing_nutrients?: Json | null
          organic_certified?: boolean | null
          product_id?: string | null
        }
        Update: {
          added_sugar_grams?: number | null
          age_appropriate_from_months?: number | null
          age_appropriate_to_months?: number | null
          allergen_concerns?: Json | null
          baby_score?: number | null
          created_at?: string
          heavy_metal_risk?: string | null
          id?: string
          missing_nutrients?: Json | null
          organic_certified?: boolean | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "baby_product_scores_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      baby_profiles: {
        Row: {
          allergies_identified: Json | null
          created_at: string
          date_of_birth: string | null
          feeding_stage: string | null
          household_id: string | null
          id: string
          name: string
          pediatrician_notes: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allergies_identified?: Json | null
          created_at?: string
          date_of_birth?: string | null
          feeding_stage?: string | null
          household_id?: string | null
          id?: string
          name: string
          pediatrician_notes?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allergies_identified?: Json | null
          created_at?: string
          date_of_birth?: string | null
          feeding_stage?: string | null
          household_id?: string | null
          id?: string
          name?: string
          pediatrician_notes?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "baby_profiles_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      beverage_scores: {
        Row: {
          artificial_sweeteners: Json | null
          beverage_type: string | null
          caffeine_mg: number | null
          created_at: string
          hydration_score: number | null
          id: string
          kleen_score: number | null
          product_id: string | null
          sugar_grams: number | null
        }
        Insert: {
          artificial_sweeteners?: Json | null
          beverage_type?: string | null
          caffeine_mg?: number | null
          created_at?: string
          hydration_score?: number | null
          id?: string
          kleen_score?: number | null
          product_id?: string | null
          sugar_grams?: number | null
        }
        Update: {
          artificial_sweeteners?: Json | null
          beverage_type?: string | null
          caffeine_mg?: number | null
          created_at?: string
          hydration_score?: number | null
          id?: string
          kleen_score?: number | null
          product_id?: string | null
          sugar_grams?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "beverage_scores_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      brand_pfas_commitments: {
        Row: {
          brand_name: string
          commitment_text: string | null
          deadline: string | null
          id: string
          source_url: string | null
          status: string | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          brand_name: string
          commitment_text?: string | null
          deadline?: string | null
          id?: string
          source_url?: string | null
          status?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          brand_name?: string
          commitment_text?: string | null
          deadline?: string | null
          id?: string
          source_url?: string | null
          status?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      brand_safety_scores: {
        Row: {
          brand_name: string
          certifications: Json | null
          community_rating: number | null
          id: string
          last_calculated: string | null
          overall_safety_grade: string | null
          recall_count_5yr: number | null
          recall_severity_avg: number | null
          testing_transparency: string | null
        }
        Insert: {
          brand_name: string
          certifications?: Json | null
          community_rating?: number | null
          id?: string
          last_calculated?: string | null
          overall_safety_grade?: string | null
          recall_count_5yr?: number | null
          recall_severity_avg?: number | null
          testing_transparency?: string | null
        }
        Update: {
          brand_name?: string
          certifications?: Json | null
          community_rating?: number | null
          id?: string
          last_calculated?: string | null
          overall_safety_grade?: string | null
          recall_count_5yr?: number | null
          recall_severity_avg?: number | null
          testing_transparency?: string | null
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
      category_microplastic_risk: {
        Row: {
          category: string
          id: string
          major_sources: Json | null
          microplastics_per_unit_estimate: string | null
          risk_level: string | null
          studies: Json | null
          subcategory: string | null
        }
        Insert: {
          category: string
          id?: string
          major_sources?: Json | null
          microplastics_per_unit_estimate?: string | null
          risk_level?: string | null
          studies?: Json | null
          subcategory?: string | null
        }
        Update: {
          category?: string
          id?: string
          major_sources?: Json | null
          microplastics_per_unit_estimate?: string | null
          risk_level?: string | null
          studies?: Json | null
          subcategory?: string | null
        }
        Relationships: []
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
      community_scores: {
        Row: {
          created_at: string
          id: string
          ingredient_notes: string | null
          product_id: string
          proposed_score: number
          reasoning: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ingredient_notes?: string | null
          product_id: string
          proposed_score: number
          reasoning?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ingredient_notes?: string | null
          product_id?: string
          proposed_score?: number
          reasoning?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_scores_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      container_chemicals: {
        Row: {
          carcinogen_classification: string | null
          chemical_name: string
          container_type: string
          endocrine_disruptor: boolean | null
          health_concern: string | null
          id: string
          migration_rate_at_heat: string | null
          migration_rate_at_room_temp: string | null
          regulatory_status: Json | null
          studies: Json | null
        }
        Insert: {
          carcinogen_classification?: string | null
          chemical_name: string
          container_type: string
          endocrine_disruptor?: boolean | null
          health_concern?: string | null
          id?: string
          migration_rate_at_heat?: string | null
          migration_rate_at_room_temp?: string | null
          regulatory_status?: Json | null
          studies?: Json | null
        }
        Update: {
          carcinogen_classification?: string | null
          chemical_name?: string
          container_type?: string
          endocrine_disruptor?: boolean | null
          health_concern?: string | null
          id?: string
          migration_rate_at_heat?: string | null
          migration_rate_at_room_temp?: string | null
          regulatory_status?: Json | null
          studies?: Json | null
        }
        Relationships: []
      }
      contaminant_encyclopedia: {
        Row: {
          contaminant_type: string
          created_at: string
          description_html: string | null
          exposure_reduction_tips: string | null
          health_effects: Json | null
          id: string
          key_studies: Json | null
          name: string
          regulatory_limits: Json | null
          related_products: Json | null
          slug: string
          sources_in_food: string | null
        }
        Insert: {
          contaminant_type: string
          created_at?: string
          description_html?: string | null
          exposure_reduction_tips?: string | null
          health_effects?: Json | null
          id?: string
          key_studies?: Json | null
          name: string
          regulatory_limits?: Json | null
          related_products?: Json | null
          slug: string
          sources_in_food?: string | null
        }
        Update: {
          contaminant_type?: string
          created_at?: string
          description_html?: string | null
          exposure_reduction_tips?: string | null
          health_effects?: Json | null
          id?: string
          key_studies?: Json | null
          name?: string
          regulatory_limits?: Json | null
          related_products?: Json | null
          slug?: string
          sources_in_food?: string | null
        }
        Relationships: []
      }
      cooking_safety_guides: {
        Row: {
          contaminant_risks: Json | null
          cooking_method: string
          food_type: string
          id: string
          risk_reduction_tips: Json | null
          safer_alternatives: Json | null
        }
        Insert: {
          contaminant_risks?: Json | null
          cooking_method: string
          food_type: string
          id?: string
          risk_reduction_tips?: Json | null
          safer_alternatives?: Json | null
        }
        Update: {
          contaminant_risks?: Json | null
          cooking_method?: string
          food_type?: string
          id?: string
          risk_reduction_tips?: Json | null
          safer_alternatives?: Json | null
        }
        Relationships: []
      }
      cookware_safety: {
        Row: {
          brand: string | null
          created_at: string
          id: string
          kleen_score: number | null
          material: string
          notes: string | null
          pfas_free_certified: boolean | null
          product_name: string
          safe_temperature_max: number | null
        }
        Insert: {
          brand?: string | null
          created_at?: string
          id?: string
          kleen_score?: number | null
          material: string
          notes?: string | null
          pfas_free_certified?: boolean | null
          product_name: string
          safe_temperature_max?: number | null
        }
        Update: {
          brand?: string | null
          created_at?: string
          id?: string
          kleen_score?: number | null
          material?: string
          notes?: string | null
          pfas_free_certified?: boolean | null
          product_name?: string
          safe_temperature_max?: number | null
        }
        Relationships: []
      }
      dining_logs: {
        Row: {
          id: string
          item_name: string
          logged_at: string
          menu_item_id: string | null
          restaurant_menu_id: string | null
          score: number | null
          user_id: string
        }
        Insert: {
          id?: string
          item_name: string
          logged_at?: string
          menu_item_id?: string | null
          restaurant_menu_id?: string | null
          score?: number | null
          user_id: string
        }
        Update: {
          id?: string
          item_name?: string
          logged_at?: string
          menu_item_id?: string | null
          restaurant_menu_id?: string | null
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dining_logs_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_item_scores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dining_logs_restaurant_menu_id_fkey"
            columns: ["restaurant_menu_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menus"
            referencedColumns: ["id"]
          },
        ]
      }
      emerging_research: {
        Row: {
          affected_products: Json | null
          contaminant_name: string
          first_flagged_date: string | null
          id: string
          kleen_recommendation: string | null
          latest_studies: Json | null
          regulatory_actions_pending: string | null
          risk_level_current: string | null
          risk_trajectory: string | null
          updated_at: string | null
        }
        Insert: {
          affected_products?: Json | null
          contaminant_name: string
          first_flagged_date?: string | null
          id?: string
          kleen_recommendation?: string | null
          latest_studies?: Json | null
          regulatory_actions_pending?: string | null
          risk_level_current?: string | null
          risk_trajectory?: string | null
          updated_at?: string | null
        }
        Update: {
          affected_products?: Json | null
          contaminant_name?: string
          first_flagged_date?: string | null
          id?: string
          kleen_recommendation?: string | null
          latest_studies?: Json | null
          regulatory_actions_pending?: string | null
          risk_level_current?: string | null
          risk_trajectory?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      exposure_reduction_actions: {
        Row: {
          action_type: string
          completed_at: string | null
          contaminant_targeted: string | null
          description: string
          estimated_reduction_percent: number | null
          id: string
          started_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          action_type: string
          completed_at?: string | null
          contaminant_targeted?: string | null
          description: string
          estimated_reduction_percent?: number | null
          id?: string
          started_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          action_type?: string
          completed_at?: string | null
          contaminant_targeted?: string | null
          description?: string
          estimated_reduction_percent?: number | null
          id?: string
          started_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      food_fraud_incidents: {
        Row: {
          brand: string | null
          created_at: string
          date_reported: string | null
          id: string
          incident_description: string
          product_category: string | null
          regulatory_action: string | null
          source_url: string | null
        }
        Insert: {
          brand?: string | null
          created_at?: string
          date_reported?: string | null
          id?: string
          incident_description: string
          product_category?: string | null
          regulatory_action?: string | null
          source_url?: string | null
        }
        Update: {
          brand?: string | null
          created_at?: string
          date_reported?: string | null
          id?: string
          incident_description?: string
          product_category?: string | null
          regulatory_action?: string | null
          source_url?: string | null
        }
        Relationships: []
      }
      food_fraud_scores: {
        Row: {
          brand_trust_score: number | null
          certifications_verified: Json | null
          created_at: string
          fraud_type_risks: Json | null
          id: string
          origin_verification_level: string | null
          overall_fraud_risk: string | null
          price_authenticity_check: string | null
          product_id: string | null
          third_party_testing: boolean | null
        }
        Insert: {
          brand_trust_score?: number | null
          certifications_verified?: Json | null
          created_at?: string
          fraud_type_risks?: Json | null
          id?: string
          origin_verification_level?: string | null
          overall_fraud_risk?: string | null
          price_authenticity_check?: string | null
          product_id?: string | null
          third_party_testing?: boolean | null
        }
        Update: {
          brand_trust_score?: number | null
          certifications_verified?: Json | null
          created_at?: string
          fraud_type_risks?: Json | null
          id?: string
          origin_verification_level?: string | null
          overall_fraud_risk?: string | null
          price_authenticity_check?: string | null
          product_id?: string | null
          third_party_testing?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "food_fraud_scores_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      food_safety_news: {
        Row: {
          category: string | null
          created_at: string
          id: string
          kleen_analysis: string | null
          published_date: string | null
          relevance_tags: Json | null
          source: string | null
          summary: string | null
          title: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          kleen_analysis?: string | null
          published_date?: string | null
          relevance_tags?: Json | null
          source?: string | null
          summary?: string | null
          title: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          kleen_analysis?: string | null
          published_date?: string | null
          relevance_tags?: Json | null
          source?: string | null
          summary?: string | null
          title?: string
          url?: string | null
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
      heavy_metal_details: {
        Row: {
          arsenic_risk: number | null
          cadmium_risk: number | null
          cumulative_exposure_note: string | null
          id: string
          lead_risk: number | null
          mercury_risk: number | null
          product_id: string | null
          risk_by_serving_size: string | null
          test_results: Json | null
        }
        Insert: {
          arsenic_risk?: number | null
          cadmium_risk?: number | null
          cumulative_exposure_note?: string | null
          id?: string
          lead_risk?: number | null
          mercury_risk?: number | null
          product_id?: string | null
          risk_by_serving_size?: string | null
          test_results?: Json | null
        }
        Update: {
          arsenic_risk?: number | null
          cadmium_risk?: number | null
          cumulative_exposure_note?: string | null
          id?: string
          lead_risk?: number | null
          mercury_risk?: number | null
          product_id?: string | null
          risk_by_serving_size?: string | null
          test_results?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "heavy_metal_details_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
      hydration_logs: {
        Row: {
          amount_ml: number | null
          beverage_type: string | null
          date: string
          id: string
          logged_at: string
          score: number | null
          user_id: string
        }
        Insert: {
          amount_ml?: number | null
          beverage_type?: string | null
          date?: string
          id?: string
          logged_at?: string
          score?: number | null
          user_id: string
        }
        Update: {
          amount_ml?: number | null
          beverage_type?: string | null
          date?: string
          id?: string
          logged_at?: string
          score?: number | null
          user_id?: string
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
      irradiation_data: {
        Row: {
          id: string
          impact_on_nutrition: Json | null
          irradiation_disclosed: boolean | null
          irradiation_likely: boolean | null
          irradiation_required: boolean | null
          product_id: string | null
        }
        Insert: {
          id?: string
          impact_on_nutrition?: Json | null
          irradiation_disclosed?: boolean | null
          irradiation_likely?: boolean | null
          irradiation_required?: boolean | null
          product_id?: string | null
        }
        Update: {
          id?: string
          impact_on_nutrition?: Json | null
          irradiation_disclosed?: boolean | null
          irradiation_likely?: boolean | null
          irradiation_required?: boolean | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "irradiation_data_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      kleen_certifications: {
        Row: {
          annual_fee_paid: boolean | null
          application_date: string | null
          brand_account_id: string | null
          certification_date: string | null
          created_at: string
          expiration_date: string | null
          id: string
          product_id: string | null
          review_status: string | null
          testing_results: Json | null
          tier: string | null
        }
        Insert: {
          annual_fee_paid?: boolean | null
          application_date?: string | null
          brand_account_id?: string | null
          certification_date?: string | null
          created_at?: string
          expiration_date?: string | null
          id?: string
          product_id?: string | null
          review_status?: string | null
          testing_results?: Json | null
          tier?: string | null
        }
        Update: {
          annual_fee_paid?: boolean | null
          application_date?: string | null
          brand_account_id?: string | null
          certification_date?: string | null
          created_at?: string
          expiration_date?: string | null
          id?: string
          product_id?: string | null
          review_status?: string | null
          testing_results?: Json | null
          tier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kleen_certifications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      label_claims: {
        Row: {
          actual_meaning: string | null
          applies_to_categories: Json | null
          claim_text: string
          id: string
          regulated_by: string | null
          trust_level: string | null
        }
        Insert: {
          actual_meaning?: string | null
          applies_to_categories?: Json | null
          claim_text: string
          id?: string
          regulated_by?: string | null
          trust_level?: string | null
        }
        Update: {
          actual_meaning?: string | null
          applies_to_categories?: Json | null
          claim_text?: string
          id?: string
          regulated_by?: string | null
          trust_level?: string | null
        }
        Relationships: []
      }
      menu_item_scores: {
        Row: {
          allergen_flags: Json | null
          created_at: string
          description: string | null
          dietary_tags: Json | null
          estimated_ingredients: Json | null
          id: string
          item_name: string
          kleen_score: number | null
          menu_id: string
        }
        Insert: {
          allergen_flags?: Json | null
          created_at?: string
          description?: string | null
          dietary_tags?: Json | null
          estimated_ingredients?: Json | null
          id?: string
          item_name: string
          kleen_score?: number | null
          menu_id: string
        }
        Update: {
          allergen_flags?: Json | null
          created_at?: string
          description?: string | null
          dietary_tags?: Json | null
          estimated_ingredients?: Json | null
          id?: string
          item_name?: string
          kleen_score?: number | null
          menu_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_item_scores_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "restaurant_menus"
            referencedColumns: ["id"]
          },
        ]
      }
      microplastic_scores: {
        Row: {
          category_risk: number | null
          created_at: string
          id: string
          last_calculated: string | null
          mitigation_suggestions: Json | null
          nanoplastic_flag: boolean | null
          overall_risk_score: number | null
          packaging_risk: number | null
          primary_risk_sources: Json | null
          processing_risk: number | null
          product_id: string | null
          risk_level: string | null
          transparency_score: number | null
        }
        Insert: {
          category_risk?: number | null
          created_at?: string
          id?: string
          last_calculated?: string | null
          mitigation_suggestions?: Json | null
          nanoplastic_flag?: boolean | null
          overall_risk_score?: number | null
          packaging_risk?: number | null
          primary_risk_sources?: Json | null
          processing_risk?: number | null
          product_id?: string | null
          risk_level?: string | null
          transparency_score?: number | null
        }
        Update: {
          category_risk?: number | null
          created_at?: string
          id?: string
          last_calculated?: string | null
          mitigation_suggestions?: Json | null
          nanoplastic_flag?: boolean | null
          overall_risk_score?: number | null
          packaging_risk?: number | null
          primary_risk_sources?: Json | null
          processing_risk?: number | null
          product_id?: string | null
          risk_level?: string | null
          transparency_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "microplastic_scores_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      microplastic_studies: {
        Row: {
          created_at: string
          doi_url: string | null
          findings_summary: string | null
          geographic_region: string | null
          id: string
          journal: string | null
          methodology: string | null
          particle_size_range: string | null
          particles_found: string | null
          product_category: string | null
          sample_size: number | null
          title: string
          year: number | null
        }
        Insert: {
          created_at?: string
          doi_url?: string | null
          findings_summary?: string | null
          geographic_region?: string | null
          id?: string
          journal?: string | null
          methodology?: string | null
          particle_size_range?: string | null
          particles_found?: string | null
          product_category?: string | null
          sample_size?: number | null
          title: string
          year?: number | null
        }
        Update: {
          created_at?: string
          doi_url?: string | null
          findings_summary?: string | null
          geographic_region?: string | null
          id?: string
          journal?: string | null
          methodology?: string | null
          particle_size_range?: string | null
          particles_found?: string | null
          product_category?: string | null
          sample_size?: number | null
          title?: string
          year?: number | null
        }
        Relationships: []
      }
      mycotoxin_risk_profiles: {
        Row: {
          created_at: string
          id: string
          mitigation_notes: string | null
          overall_mycotoxin_risk: string | null
          product_id: string | null
          specific_mycotoxin_risks: Json | null
        }
        Insert: {
          created_at?: string
          id?: string
          mitigation_notes?: string | null
          overall_mycotoxin_risk?: string | null
          product_id?: string | null
          specific_mycotoxin_risks?: Json | null
        }
        Update: {
          created_at?: string
          id?: string
          mitigation_notes?: string | null
          overall_mycotoxin_risk?: string | null
          product_id?: string | null
          specific_mycotoxin_risks?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "mycotoxin_risk_profiles_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
      outbreak_tracking: {
        Row: {
          cases_reported: number | null
          cdc_investigation_id: string | null
          created_at: string
          deaths: number | null
          hospitalizations: number | null
          id: string
          pathogen: string
          product_source: string | null
          start_date: string | null
          states_affected: Json | null
          status: string | null
          update_history: Json | null
        }
        Insert: {
          cases_reported?: number | null
          cdc_investigation_id?: string | null
          created_at?: string
          deaths?: number | null
          hospitalizations?: number | null
          id?: string
          pathogen: string
          product_source?: string | null
          start_date?: string | null
          states_affected?: Json | null
          status?: string | null
          update_history?: Json | null
        }
        Update: {
          cases_reported?: number | null
          cdc_investigation_id?: string | null
          created_at?: string
          deaths?: number | null
          hospitalizations?: number | null
          id?: string
          pathogen?: string
          product_source?: string | null
          start_date?: string | null
          states_affected?: Json | null
          status?: string | null
          update_history?: Json | null
        }
        Relationships: []
      }
      packaging_materials: {
        Row: {
          bpa_free: boolean | null
          id: string
          known_leaching_compounds: Json | null
          material_detail: string | null
          plastic_contact_surface_area_cm2: number | null
          primary_packaging: string | null
          product_id: string | null
          resin_code: string | null
        }
        Insert: {
          bpa_free?: boolean | null
          id?: string
          known_leaching_compounds?: Json | null
          material_detail?: string | null
          plastic_contact_surface_area_cm2?: number | null
          primary_packaging?: string | null
          product_id?: string | null
          resin_code?: string | null
        }
        Update: {
          bpa_free?: boolean | null
          id?: string
          known_leaching_compounds?: Json | null
          material_detail?: string | null
          plastic_contact_surface_area_cm2?: number | null
          primary_packaging?: string | null
          product_id?: string | null
          resin_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packaging_materials_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      packaging_risk_factors: {
        Row: {
          heat_sensitivity: boolean | null
          id: string
          material_code: string | null
          microplastic_risk_level: string | null
          nanoplastic_risk_level: string | null
          packaging_type: string
          study_references: Json | null
        }
        Insert: {
          heat_sensitivity?: boolean | null
          id?: string
          material_code?: string | null
          microplastic_risk_level?: string | null
          nanoplastic_risk_level?: string | null
          packaging_type: string
          study_references?: Json | null
        }
        Update: {
          heat_sensitivity?: boolean | null
          id?: string
          material_code?: string | null
          microplastic_risk_level?: string | null
          nanoplastic_risk_level?: string | null
          packaging_type?: string
          study_references?: Json | null
        }
        Relationships: []
      }
      pesticide_residue_data: {
        Row: {
          created_at: string
          exceeds_guideline: boolean | null
          health_guideline_ppm: number | null
          id: string
          legal_limit_ppm: number | null
          pesticide_name: string
          product_id: string | null
          residue_level_ppm: number | null
          test_date: string | null
          test_source: string | null
        }
        Insert: {
          created_at?: string
          exceeds_guideline?: boolean | null
          health_guideline_ppm?: number | null
          id?: string
          legal_limit_ppm?: number | null
          pesticide_name: string
          product_id?: string | null
          residue_level_ppm?: number | null
          test_date?: string | null
          test_source?: string | null
        }
        Update: {
          created_at?: string
          exceeds_guideline?: boolean | null
          health_guideline_ppm?: number | null
          id?: string
          legal_limit_ppm?: number | null
          pesticide_name?: string
          product_id?: string | null
          residue_level_ppm?: number | null
          test_date?: string | null
          test_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pesticide_residue_data_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      pfas_contamination_sites: {
        Row: {
          contamination_level: string | null
          id: string
          lat: number | null
          lng: number | null
          pfas_compounds: Json | null
          remediation_status: string | null
          site_name: string
          site_type: string | null
          source_url: string | null
          updated_at: string | null
        }
        Insert: {
          contamination_level?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          pfas_compounds?: Json | null
          remediation_status?: string | null
          site_name: string
          site_type?: string | null
          source_url?: string | null
          updated_at?: string | null
        }
        Update: {
          contamination_level?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          pfas_compounds?: Json | null
          remediation_status?: string | null
          site_name?: string
          site_type?: string | null
          source_url?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      pfas_packaging_data: {
        Row: {
          brand_or_chain: string | null
          created_at: string
          detection_level_ppt: number | null
          id: string
          pfas_compounds: Json | null
          pfas_detected: boolean | null
          product_type: string | null
          test_date: string | null
          test_source: string | null
        }
        Insert: {
          brand_or_chain?: string | null
          created_at?: string
          detection_level_ppt?: number | null
          id?: string
          pfas_compounds?: Json | null
          pfas_detected?: boolean | null
          product_type?: string | null
          test_date?: string | null
          test_source?: string | null
        }
        Update: {
          brand_or_chain?: string | null
          created_at?: string
          detection_level_ppt?: number | null
          id?: string
          pfas_compounds?: Json | null
          pfas_detected?: boolean | null
          product_type?: string | null
          test_date?: string | null
          test_source?: string | null
        }
        Relationships: []
      }
      pfas_water_data: {
        Row: {
          exceeds_epa_advisory: boolean | null
          id: string
          last_tested: string | null
          pfas_compounds_detected: Json | null
          pfas_total_ppt: number | null
          source: string | null
          water_utility: string | null
          zip_code: string
        }
        Insert: {
          exceeds_epa_advisory?: boolean | null
          id?: string
          last_tested?: string | null
          pfas_compounds_detected?: Json | null
          pfas_total_ppt?: number | null
          source?: string | null
          water_utility?: string | null
          zip_code: string
        }
        Update: {
          exceeds_epa_advisory?: boolean | null
          id?: string
          last_tested?: string | null
          pfas_compounds_detected?: Json | null
          pfas_total_ppt?: number | null
          source?: string | null
          water_utility?: string | null
          zip_code?: string
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
      processing_contaminant_scores: {
        Row: {
          acrylamide_risk: number | null
          age_risk: number | null
          created_at: string
          furan_risk: number | null
          hca_risk: number | null
          id: string
          mitigation_tips: Json | null
          nitrosamine_risk: number | null
          overall_processing_risk: number | null
          pah_risk: number | null
          product_id: string | null
          risk_factors: Json | null
          three_mcpd_risk: number | null
          trans_fat_risk: number | null
        }
        Insert: {
          acrylamide_risk?: number | null
          age_risk?: number | null
          created_at?: string
          furan_risk?: number | null
          hca_risk?: number | null
          id?: string
          mitigation_tips?: Json | null
          nitrosamine_risk?: number | null
          overall_processing_risk?: number | null
          pah_risk?: number | null
          product_id?: string | null
          risk_factors?: Json | null
          three_mcpd_risk?: number | null
          trans_fat_risk?: number | null
        }
        Update: {
          acrylamide_risk?: number | null
          age_risk?: number | null
          created_at?: string
          furan_risk?: number | null
          hca_risk?: number | null
          id?: string
          mitigation_tips?: Json | null
          nitrosamine_risk?: number | null
          overall_processing_risk?: number | null
          pah_risk?: number | null
          product_id?: string | null
          risk_factors?: Json | null
          three_mcpd_risk?: number | null
          trans_fat_risk?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "processing_contaminant_scores_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      processing_risk_factors: {
        Row: {
          id: string
          notes: string | null
          particle_release_estimate: string | null
          plastic_contact_duration: string | null
          process_type: string
          risk_multiplier: number | null
          temperature_range: string | null
        }
        Insert: {
          id?: string
          notes?: string | null
          particle_release_estimate?: string | null
          plastic_contact_duration?: string | null
          process_type: string
          risk_multiplier?: number | null
          temperature_range?: string | null
        }
        Update: {
          id?: string
          notes?: string | null
          particle_release_estimate?: string | null
          plastic_contact_duration?: string | null
          process_type?: string
          risk_multiplier?: number | null
          temperature_range?: string | null
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
      product_packaging_analysis: {
        Row: {
          cap_seal_material: string | null
          chemicals_of_concern: Json | null
          container_type: string | null
          created_at: string
          heat_sensitivity_warning: boolean | null
          id: string
          lining_type: string | null
          migration_risk_score: number | null
          primary_material: string | null
          product_id: string | null
          secondary_material: string | null
        }
        Insert: {
          cap_seal_material?: string | null
          chemicals_of_concern?: Json | null
          container_type?: string | null
          created_at?: string
          heat_sensitivity_warning?: boolean | null
          id?: string
          lining_type?: string | null
          migration_risk_score?: number | null
          primary_material?: string | null
          product_id?: string | null
          secondary_material?: string | null
        }
        Update: {
          cap_seal_material?: string | null
          chemicals_of_concern?: Json | null
          container_type?: string | null
          created_at?: string
          heat_sensitivity_warning?: boolean | null
          id?: string
          lining_type?: string | null
          migration_risk_score?: number | null
          primary_material?: string | null
          product_id?: string | null
          secondary_material?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_packaging_analysis_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_request_upvotes: {
        Row: {
          created_at: string
          id: string
          request_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          request_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          request_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_request_upvotes_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "product_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      product_requests: {
        Row: {
          brand: string | null
          created_at: string
          id: string
          image_url: string | null
          notes: string | null
          product_name: string
          status: string
          upc: string | null
          updated_at: string
          upvotes: number
          user_id: string
        }
        Insert: {
          brand?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          notes?: string | null
          product_name: string
          status?: string
          upc?: string | null
          updated_at?: string
          upvotes?: number
          user_id: string
        }
        Update: {
          brand?: string | null
          created_at?: string
          id?: string
          image_url?: string | null
          notes?: string | null
          product_name?: string
          status?: string
          upc?: string | null
          updated_at?: string
          upvotes?: number
          user_id?: string
        }
        Relationships: []
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
      recall_alerts: {
        Row: {
          affected_lot_numbers: string | null
          brand: string | null
          created_at: string
          description: string | null
          distribution_states: Json | null
          id: string
          product_name: string
          reason: string | null
          recall_date: string | null
          recall_id: string | null
          severity: string | null
          source_agency: string | null
        }
        Insert: {
          affected_lot_numbers?: string | null
          brand?: string | null
          created_at?: string
          description?: string | null
          distribution_states?: Json | null
          id?: string
          product_name: string
          reason?: string | null
          recall_date?: string | null
          recall_id?: string | null
          severity?: string | null
          source_agency?: string | null
        }
        Update: {
          affected_lot_numbers?: string | null
          brand?: string | null
          created_at?: string
          description?: string | null
          distribution_states?: Json | null
          id?: string
          product_name?: string
          reason?: string | null
          recall_date?: string | null
          recall_id?: string | null
          severity?: string | null
          source_agency?: string | null
        }
        Relationships: []
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
      regional_contamination_data: {
        Row: {
          affected_product_categories: Json | null
          contaminant: string
          contamination_level: string | null
          country: string | null
          data_source: string | null
          id: string
          last_updated: string | null
          region: string
          source_cause: string | null
        }
        Insert: {
          affected_product_categories?: Json | null
          contaminant: string
          contamination_level?: string | null
          country?: string | null
          data_source?: string | null
          id?: string
          last_updated?: string | null
          region: string
          source_cause?: string | null
        }
        Update: {
          affected_product_categories?: Json | null
          contaminant?: string
          contamination_level?: string | null
          country?: string | null
          data_source?: string | null
          id?: string
          last_updated?: string | null
          region?: string
          source_cause?: string | null
        }
        Relationships: []
      }
      residue_scores: {
        Row: {
          antibiotic_risk: number | null
          country_of_origin: string | null
          created_at: string
          drug_residue_risk: number | null
          hormone_risk: number | null
          id: string
          label_claims: Json | null
          organic_certified: boolean | null
          overall_residue_score: number | null
          pesticide_risk: number | null
          product_id: string | null
          risk_factors: Json | null
        }
        Insert: {
          antibiotic_risk?: number | null
          country_of_origin?: string | null
          created_at?: string
          drug_residue_risk?: number | null
          hormone_risk?: number | null
          id?: string
          label_claims?: Json | null
          organic_certified?: boolean | null
          overall_residue_score?: number | null
          pesticide_risk?: number | null
          product_id?: string | null
          risk_factors?: Json | null
        }
        Update: {
          antibiotic_risk?: number | null
          country_of_origin?: string | null
          created_at?: string
          drug_residue_risk?: number | null
          hormone_risk?: number | null
          id?: string
          label_claims?: Json | null
          organic_certified?: boolean | null
          overall_residue_score?: number | null
          pesticide_risk?: number | null
          product_id?: string | null
          risk_factors?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "residue_scores_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurant_menus: {
        Row: {
          address: string | null
          average_score: number | null
          created_at: string
          id: string
          kleen_grade: string | null
          last_scanned: string | null
          location_lat: number | null
          location_lng: number | null
          menu_items: Json
          platform_id: string | null
          restaurant_name: string
          scanned_by_user_id: string | null
        }
        Insert: {
          address?: string | null
          average_score?: number | null
          created_at?: string
          id?: string
          kleen_grade?: string | null
          last_scanned?: string | null
          location_lat?: number | null
          location_lng?: number | null
          menu_items?: Json
          platform_id?: string | null
          restaurant_name: string
          scanned_by_user_id?: string | null
        }
        Update: {
          address?: string | null
          average_score?: number | null
          created_at?: string
          id?: string
          kleen_grade?: string | null
          last_scanned?: string | null
          location_lat?: number | null
          location_lng?: number | null
          menu_items?: Json
          platform_id?: string | null
          restaurant_name?: string
          scanned_by_user_id?: string | null
        }
        Relationships: []
      }
      restaurant_ratings: {
        Row: {
          average_menu_score: number | null
          clean_options_count: number | null
          id: string
          kleen_grade: string
          rated_at: string
          restaurant_id: string
          total_items: number | null
        }
        Insert: {
          average_menu_score?: number | null
          clean_options_count?: number | null
          id?: string
          kleen_grade: string
          rated_at?: string
          restaurant_id: string
          total_items?: number | null
        }
        Update: {
          average_menu_score?: number | null
          clean_options_count?: number | null
          id?: string
          kleen_grade?: string
          rated_at?: string
          restaurant_id?: string
          total_items?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurant_ratings_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: true
            referencedRelation: "restaurant_menus"
            referencedColumns: ["id"]
          },
        ]
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
      seafood_safety_data: {
        Row: {
          aquaculture_practices_known: Json | null
          country_of_origin: string | null
          farmed_vs_wild: string | null
          fda_import_alert: boolean | null
          id: string
          known_drug_residue_risks: Json | null
          product_id: string | null
          safety_score: number | null
        }
        Insert: {
          aquaculture_practices_known?: Json | null
          country_of_origin?: string | null
          farmed_vs_wild?: string | null
          fda_import_alert?: boolean | null
          id?: string
          known_drug_residue_risks?: Json | null
          product_id?: string | null
          safety_score?: number | null
        }
        Update: {
          aquaculture_practices_known?: Json | null
          country_of_origin?: string | null
          farmed_vs_wild?: string | null
          fda_import_alert?: boolean | null
          id?: string
          known_drug_residue_risks?: Json | null
          product_id?: string | null
          safety_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "seafood_safety_data_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
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
      storage_container_database: {
        Row: {
          bpa_free: boolean | null
          brand: string | null
          created_at: string
          dishwasher_safe_safely: boolean | null
          id: string
          material: string
          microwave_safe_safely: boolean | null
          phthalate_free: boolean | null
          product_name: string
          resin_code: string | null
          safety_score: number | null
        }
        Insert: {
          bpa_free?: boolean | null
          brand?: string | null
          created_at?: string
          dishwasher_safe_safely?: boolean | null
          id?: string
          material: string
          microwave_safe_safely?: boolean | null
          phthalate_free?: boolean | null
          product_name: string
          resin_code?: string | null
          safety_score?: number | null
        }
        Update: {
          bpa_free?: boolean | null
          brand?: string | null
          created_at?: string
          dishwasher_safe_safely?: boolean | null
          id?: string
          material?: string
          microwave_safe_safely?: boolean | null
          phthalate_free?: boolean | null
          product_name?: string
          resin_code?: string | null
          safety_score?: number | null
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
      total_exposure_profiles: {
        Row: {
          created_at: string
          drug_residue_score: number | null
          endocrine_disruptor_load: number | null
          heavy_metal_score: number | null
          id: string
          microplastic_score: number | null
          mycotoxin_score: number | null
          packaging_migration_score: number | null
          percentile_vs_community: number | null
          pesticide_score: number | null
          pfas_score: number | null
          processing_contaminant_score: number | null
          total_exposure_score: number | null
          trend_vs_last_week: string | null
          user_id: string
          week_of: string
        }
        Insert: {
          created_at?: string
          drug_residue_score?: number | null
          endocrine_disruptor_load?: number | null
          heavy_metal_score?: number | null
          id?: string
          microplastic_score?: number | null
          mycotoxin_score?: number | null
          packaging_migration_score?: number | null
          percentile_vs_community?: number | null
          pesticide_score?: number | null
          pfas_score?: number | null
          processing_contaminant_score?: number | null
          total_exposure_score?: number | null
          trend_vs_last_week?: string | null
          user_id: string
          week_of: string
        }
        Update: {
          created_at?: string
          drug_residue_score?: number | null
          endocrine_disruptor_load?: number | null
          heavy_metal_score?: number | null
          id?: string
          microplastic_score?: number | null
          mycotoxin_score?: number | null
          packaging_migration_score?: number | null
          percentile_vs_community?: number | null
          pesticide_score?: number | null
          pfas_score?: number | null
          processing_contaminant_score?: number | null
          total_exposure_score?: number | null
          trend_vs_last_week?: string | null
          user_id?: string
          week_of?: string
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
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_vulnerability_flags: {
        Row: {
          activated_at: string | null
          active: boolean | null
          flag_type: string
          id: string
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          active?: boolean | null
          flag_type: string
          id?: string
          user_id: string
        }
        Update: {
          activated_at?: string | null
          active?: boolean | null
          flag_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      water_filters: {
        Row: {
          affiliate_url: string | null
          annual_filter_cost: string | null
          brand: string
          contaminants_removed: Json
          created_at: string
          filter_type: string | null
          id: string
          image_url: string | null
          kleen_score: number | null
          model: string
          price_range: string | null
        }
        Insert: {
          affiliate_url?: string | null
          annual_filter_cost?: string | null
          brand: string
          contaminants_removed?: Json
          created_at?: string
          filter_type?: string | null
          id?: string
          image_url?: string | null
          kleen_score?: number | null
          model: string
          price_range?: string | null
        }
        Update: {
          affiliate_url?: string | null
          annual_filter_cost?: string | null
          brand?: string
          contaminants_removed?: Json
          created_at?: string
          filter_type?: string | null
          id?: string
          image_url?: string | null
          kleen_score?: number | null
          model?: string
          price_range?: string | null
        }
        Relationships: []
      }
      water_quality: {
        Row: {
          city: string | null
          contaminants: Json
          id: string
          last_updated: string
          overall_score: number | null
          source: string | null
          state: string | null
          water_utility_name: string | null
          zip_code: string
        }
        Insert: {
          city?: string | null
          contaminants?: Json
          id?: string
          last_updated?: string
          overall_score?: number | null
          source?: string | null
          state?: string | null
          water_utility_name?: string | null
          zip_code: string
        }
        Update: {
          city?: string | null
          contaminants?: Json
          id?: string
          last_updated?: string
          overall_score?: number | null
          source?: string | null
          state?: string | null
          water_utility_name?: string | null
          zip_code?: string
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_chat_usage: {
        Args: { usage_date?: string; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
