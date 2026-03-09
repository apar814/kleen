-- =====================================================
-- PHASE 6: RESTAURANT INTELLIGENCE
-- =====================================================

-- Restaurant menus scanned/cached
CREATE TABLE public.restaurant_menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_name text NOT NULL,
  location_lat decimal(10,8),
  location_lng decimal(11,8),
  address text,
  platform_id text,
  menu_items jsonb NOT NULL DEFAULT '[]',
  average_score integer,
  kleen_grade text CHECK (kleen_grade IN ('A', 'B', 'C', 'D', 'F')),
  scanned_by_user_id uuid,
  last_scanned timestamptz DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Individual menu item scores
CREATE TABLE public.menu_item_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id uuid REFERENCES public.restaurant_menus(id) ON DELETE CASCADE NOT NULL,
  item_name text NOT NULL,
  description text,
  estimated_ingredients jsonb DEFAULT '[]',
  kleen_score integer CHECK (kleen_score >= 0 AND kleen_score <= 100),
  dietary_tags jsonb DEFAULT '[]',
  allergen_flags jsonb DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Restaurant ratings aggregated
CREATE TABLE public.restaurant_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES public.restaurant_menus(id) ON DELETE CASCADE UNIQUE NOT NULL,
  kleen_grade text NOT NULL CHECK (kleen_grade IN ('A', 'B', 'C', 'D', 'F')),
  average_menu_score integer,
  clean_options_count integer DEFAULT 0,
  total_items integer DEFAULT 0,
  rated_at timestamptz NOT NULL DEFAULT now()
);

-- User dining logs
CREATE TABLE public.dining_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  restaurant_menu_id uuid REFERENCES public.restaurant_menus(id),
  menu_item_id uuid REFERENCES public.menu_item_scores(id),
  item_name text NOT NULL,
  score integer,
  logged_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================
-- PHASE 6: WATER & BEVERAGE QUALITY
-- =====================================================

-- Tap water quality by location
CREATE TABLE public.water_quality (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  zip_code text NOT NULL,
  city text,
  state text,
  water_utility_name text,
  contaminants jsonb NOT NULL DEFAULT '[]',
  overall_score integer CHECK (overall_score >= 0 AND overall_score <= 100),
  source text DEFAULT 'EWG',
  last_updated timestamptz NOT NULL DEFAULT now(),
  UNIQUE(zip_code)
);

-- Water filter recommendations
CREATE TABLE public.water_filters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  filter_type text CHECK (filter_type IN ('pitcher', 'faucet', 'under-sink', 'whole-house', 'reverse-osmosis', 'countertop')),
  contaminants_removed jsonb NOT NULL DEFAULT '[]',
  price_range text,
  annual_filter_cost text,
  kleen_score integer CHECK (kleen_score >= 0 AND kleen_score <= 100),
  image_url text,
  affiliate_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Beverage scores (non-water drinks)
CREATE TABLE public.beverage_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  beverage_type text CHECK (beverage_type IN ('energy_drink', 'juice', 'kombucha', 'soda', 'sports_drink', 'coffee', 'tea', 'protein_shake', 'alcohol_mixer', 'other')),
  caffeine_mg integer,
  sugar_grams numeric(5,1),
  artificial_sweeteners jsonb DEFAULT '[]',
  kleen_score integer CHECK (kleen_score >= 0 AND kleen_score <= 100),
  hydration_score integer CHECK (hydration_score >= 0 AND hydration_score <= 100),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- User hydration tracking
CREATE TABLE public.hydration_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  beverage_type text,
  amount_ml integer,
  score integer,
  logged_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================
-- PHASE 6: BABY & TODDLER SAFETY
-- =====================================================

-- Baby profiles (extend household)
CREATE TABLE public.baby_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  household_id uuid REFERENCES public.households(id),
  name text NOT NULL,
  date_of_birth date,
  feeding_stage text CHECK (feeding_stage IN ('newborn', '4-6mo', '6-9mo', '9-12mo', 'toddler_1-2', 'toddler_2-3')),
  allergies_identified jsonb DEFAULT '[]',
  pediatrician_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Baby-specific product scores (separate from adult scores)
CREATE TABLE public.baby_product_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  baby_score integer CHECK (baby_score >= 0 AND baby_score <= 100),
  heavy_metal_risk text CHECK (heavy_metal_risk IN ('low', 'medium', 'high', 'critical')),
  added_sugar_grams numeric(5,1) DEFAULT 0,
  organic_certified boolean DEFAULT false,
  age_appropriate_from_months integer,
  age_appropriate_to_months integer,
  missing_nutrients jsonb DEFAULT '[]',
  allergen_concerns jsonb DEFAULT '[]',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Baby feeding logs
CREATE TABLE public.baby_feeding_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id uuid REFERENCES public.baby_profiles(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  product_id uuid REFERENCES public.products(id),
  food_name text NOT NULL,
  feeding_type text CHECK (feeding_type IN ('formula', 'puree', 'finger_food', 'snack', 'beverage', 'supplement')),
  score integer,
  notes text,
  fed_at timestamptz NOT NULL DEFAULT now()
);

-- Allergen introduction tracking for babies
CREATE TABLE public.baby_allergen_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  baby_id uuid REFERENCES public.baby_profiles(id) ON DELETE CASCADE NOT NULL,
  allergen_name text NOT NULL,
  introduced_at date,
  reaction_noted text,
  status text CHECK (status IN ('not_introduced', 'introduced_safe', 'introduced_reaction', 'avoiding')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(baby_id, allergen_name)
);

-- =====================================================
-- ENABLE RLS
-- =====================================================
ALTER TABLE public.restaurant_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_item_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dining_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_quality ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_filters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beverage_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hydration_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baby_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baby_product_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baby_feeding_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baby_allergen_tracking ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Restaurant menus: public read, auth users can contribute
CREATE POLICY "Restaurant menus viewable by all" ON public.restaurant_menus FOR SELECT USING (true);
CREATE POLICY "Auth users can add restaurant menus" ON public.restaurant_menus FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Menu items: public read
CREATE POLICY "Menu items viewable by all" ON public.menu_item_scores FOR SELECT USING (true);
CREATE POLICY "Auth users can add menu items" ON public.menu_item_scores FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Restaurant ratings: public read
CREATE POLICY "Restaurant ratings viewable by all" ON public.restaurant_ratings FOR SELECT USING (true);

-- Dining logs: user-owned
CREATE POLICY "Users can view their dining logs" ON public.dining_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create dining logs" ON public.dining_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete dining logs" ON public.dining_logs FOR DELETE USING (auth.uid() = user_id);

-- Water quality: public read
CREATE POLICY "Water quality viewable by all" ON public.water_quality FOR SELECT USING (true);

-- Water filters: public read
CREATE POLICY "Water filters viewable by all" ON public.water_filters FOR SELECT USING (true);

-- Beverage scores: public read
CREATE POLICY "Beverage scores viewable by all" ON public.beverage_scores FOR SELECT USING (true);

-- Hydration logs: user-owned
CREATE POLICY "Users can view their hydration logs" ON public.hydration_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create hydration logs" ON public.hydration_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete hydration logs" ON public.hydration_logs FOR DELETE USING (auth.uid() = user_id);

-- Baby profiles: user-owned
CREATE POLICY "Users can view their baby profiles" ON public.baby_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create baby profiles" ON public.baby_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their baby profiles" ON public.baby_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete baby profiles" ON public.baby_profiles FOR DELETE USING (auth.uid() = user_id);

-- Baby product scores: public read
CREATE POLICY "Baby product scores viewable by all" ON public.baby_product_scores FOR SELECT USING (true);

-- Baby feeding logs: user-owned
CREATE POLICY "Users can view their baby feeding logs" ON public.baby_feeding_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create baby feeding logs" ON public.baby_feeding_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete baby feeding logs" ON public.baby_feeding_logs FOR DELETE USING (auth.uid() = user_id);

-- Baby allergen tracking: accessible via baby profile ownership
CREATE POLICY "Users can view baby allergen tracking" ON public.baby_allergen_tracking 
  FOR SELECT USING (EXISTS (SELECT 1 FROM baby_profiles WHERE baby_profiles.id = baby_allergen_tracking.baby_id AND baby_profiles.user_id = auth.uid()));
CREATE POLICY "Users can manage baby allergen tracking" ON public.baby_allergen_tracking 
  FOR ALL USING (EXISTS (SELECT 1 FROM baby_profiles WHERE baby_profiles.id = baby_allergen_tracking.baby_id AND baby_profiles.user_id = auth.uid()));

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX idx_restaurant_menus_location ON public.restaurant_menus(location_lat, location_lng);
CREATE INDEX idx_restaurant_menus_grade ON public.restaurant_menus(kleen_grade);
CREATE INDEX idx_water_quality_zip ON public.water_quality(zip_code);
CREATE INDEX idx_baby_profiles_user ON public.baby_profiles(user_id);
CREATE INDEX idx_baby_feeding_logs_baby ON public.baby_feeding_logs(baby_id);
CREATE INDEX idx_hydration_logs_user_date ON public.hydration_logs(user_id, date);