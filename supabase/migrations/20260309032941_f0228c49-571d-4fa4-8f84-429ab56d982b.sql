
-- Create update_updated_at_column function if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Brands table
CREATE TABLE public.brands (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Brands are viewable by everyone" ON public.brands FOR SELECT USING (true);

-- Categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- Ingredients canonical dictionary
CREATE TABLE public.ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  aliases TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  risk_level INTEGER NOT NULL CHECK (risk_level BETWEEN 1 AND 5),
  health_risks TEXT[] DEFAULT '{}',
  banned_in TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  ai_summary TEXT NOT NULL,
  found_in TEXT[] DEFAULT '{}',
  clean_alternatives TEXT[] DEFAULT '{}',
  sources TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.ingredients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Ingredients are viewable by everyone" ON public.ingredients FOR SELECT USING (true);
CREATE INDEX idx_ingredients_name ON public.ingredients USING gin(to_tsvector('english', name));
CREATE INDEX idx_ingredients_risk ON public.ingredients(risk_level);

-- Products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand_id UUID REFERENCES public.brands(id),
  category_id UUID REFERENCES public.categories(id),
  asin TEXT,
  upc TEXT,
  price NUMERIC(10,2),
  image_url TEXT,
  affiliate_link TEXT,
  serving_size TEXT,
  servings_per_container INTEGER,
  certifications TEXT[] DEFAULT '{}',
  kleen_score INTEGER CHECK (kleen_score BETWEEN 0 AND 100),
  score_band TEXT CHECK (score_band IN ('Excellent', 'Good', 'Mixed', 'Weak', 'Avoid')),
  score_drivers TEXT[] DEFAULT '{}',
  score_concerns TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE INDEX idx_products_name ON public.products USING gin(to_tsvector('english', name));
CREATE INDEX idx_products_asin ON public.products(asin);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_score ON public.products(kleen_score);

-- Product-Ingredient join table
CREATE TABLE public.product_ingredients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  ingredient_id UUID NOT NULL REFERENCES public.ingredients(id) ON DELETE CASCADE,
  amount TEXT,
  is_active BOOLEAN DEFAULT false,
  UNIQUE(product_id, ingredient_id)
);
ALTER TABLE public.product_ingredients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Product ingredients are viewable by everyone" ON public.product_ingredients FOR SELECT USING (true);

-- User profiles
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  health_goals TEXT[] DEFAULT '{}',
  values TEXT[] DEFAULT '{}',
  dietary_needs TEXT[] DEFAULT '{}',
  allergens TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Saved products
CREATE TABLE public.saved_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);
ALTER TABLE public.saved_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their saved products" ON public.saved_products FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can save products" ON public.saved_products FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unsave products" ON public.saved_products FOR DELETE USING (auth.uid() = user_id);

-- Saved comparisons
CREATE TABLE public.saved_comparisons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_ids UUID[] NOT NULL,
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.saved_comparisons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their comparisons" ON public.saved_comparisons FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create comparisons" ON public.saved_comparisons FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete comparisons" ON public.saved_comparisons FOR DELETE USING (auth.uid() = user_id);

-- Scan history
CREATE TABLE public.scan_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_ids UUID[] NOT NULL,
  cart_score INTEGER,
  total_products INTEGER,
  flagged_products INTEGER,
  swaps_suggested INTEGER,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their scan history" ON public.scan_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create scan records" ON public.scan_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Health goals for discovery
CREATE TABLE public.health_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  recommended_categories UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.health_goals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Health goals are viewable by everyone" ON public.health_goals FOR SELECT USING (true);

-- Triggers for updated_at
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON public.brands FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ingredients_updated_at BEFORE UPDATE ON public.ingredients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
