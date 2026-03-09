
-- Auto-Shop Profiles: user preferences for autonomous grocery ordering
CREATE TABLE public.auto_shop_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  preferred_stores JSONB NOT NULL DEFAULT '[]'::jsonb,
  budget NUMERIC NOT NULL DEFAULT 100,
  schedule TEXT NOT NULL DEFAULT 'weekly',
  min_score INTEGER NOT NULL DEFAULT 70,
  must_haves JSONB NOT NULL DEFAULT '[]'::jsonb,
  never_buy JSONB NOT NULL DEFAULT '[]'::jsonb,
  household_size INTEGER NOT NULL DEFAULT 1,
  dietary_preferences JSONB NOT NULL DEFAULT '[]'::jsonb,
  active BOOLEAN NOT NULL DEFAULT true,
  delivery_day TEXT DEFAULT 'sunday',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Auto-Shop Orders: AI-generated grocery orders
CREATE TABLE public.auto_shop_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID REFERENCES public.auto_shop_profiles(id) ON DELETE CASCADE NOT NULL,
  generated_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_cost NUMERIC DEFAULT 0,
  average_score INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  review_deadline TIMESTAMP WITH TIME ZONE,
  store_name TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Auto-Shop Feedback: per-item feedback after delivery
CREATE TABLE public.auto_shop_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.auto_shop_orders(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_name TEXT NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  feedback_type TEXT NOT NULL DEFAULT 'fine',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.auto_shop_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_shop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auto_shop_feedback ENABLE ROW LEVEL SECURITY;

-- RLS: auto_shop_profiles
CREATE POLICY "Users can view their auto-shop profile" ON public.auto_shop_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their auto-shop profile" ON public.auto_shop_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their auto-shop profile" ON public.auto_shop_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their auto-shop profile" ON public.auto_shop_profiles FOR DELETE USING (auth.uid() = user_id);

-- RLS: auto_shop_orders
CREATE POLICY "Users can view their auto-shop orders" ON public.auto_shop_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create auto-shop orders" ON public.auto_shop_orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their auto-shop orders" ON public.auto_shop_orders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their auto-shop orders" ON public.auto_shop_orders FOR DELETE USING (auth.uid() = user_id);

-- RLS: auto_shop_feedback
CREATE POLICY "Users can view their feedback" ON public.auto_shop_feedback FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create feedback" ON public.auto_shop_feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete feedback" ON public.auto_shop_feedback FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_auto_shop_profiles_user ON public.auto_shop_profiles(user_id);
CREATE INDEX idx_auto_shop_orders_user ON public.auto_shop_orders(user_id);
CREATE INDEX idx_auto_shop_orders_status ON public.auto_shop_orders(status);
CREATE INDEX idx_auto_shop_feedback_order ON public.auto_shop_feedback(order_id);

-- Updated_at triggers
CREATE TRIGGER update_auto_shop_profiles_updated_at BEFORE UPDATE ON public.auto_shop_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_auto_shop_orders_updated_at BEFORE UPDATE ON public.auto_shop_orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
