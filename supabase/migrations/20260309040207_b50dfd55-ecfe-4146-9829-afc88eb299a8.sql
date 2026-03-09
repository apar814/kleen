
-- Add community field to profiles for personalized experience
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS community TEXT,
ADD COLUMN IF NOT EXISTS household_id UUID;

-- Create households table for Family/Household Mode
CREATE TABLE public.households (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'My Family',
  owner_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add foreign key for household
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_household_id_fkey 
FOREIGN KEY (household_id) REFERENCES public.households(id) ON DELETE SET NULL;

-- Create grocery_lists table for live scoring
CREATE TABLE public.grocery_lists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL DEFAULT 'Shopping List',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  cart_score INTEGER,
  total_items INTEGER DEFAULT 0,
  flagged_items INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create challenges table
CREATE TABLE public.challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'gym', 'family', 'longevity', 'diabetes', 'weight_loss', 'aging'
  difficulty TEXT DEFAULT 'medium',
  points INTEGER DEFAULT 10,
  badge_emoji TEXT DEFAULT '🏆',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_challenges table for tracking
CREATE TABLE public.user_challenges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  challenge_id UUID NOT NULL REFERENCES public.challenges(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'in_progress', -- 'in_progress', 'completed', 'failed'
  progress INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Create social_posts table for community feed
CREATE TABLE public.social_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_type TEXT NOT NULL, -- 'scan', 'recipe', 'challenge', 'swap', 'milestone'
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  community TEXT, -- for filtering by community
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create post_likes table
CREATE TABLE public.post_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create post_comments table
CREATE TABLE public.post_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_id UUID NOT NULL REFERENCES public.social_posts(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recipes table for meal scanner
CREATE TABLE public.recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  name TEXT NOT NULL,
  source_url TEXT,
  ingredients JSONB NOT NULL DEFAULT '[]'::jsonb,
  recipe_score INTEGER,
  swaps_suggested JSONB DEFAULT '[]'::jsonb,
  is_public BOOLEAN DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.households ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grocery_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

-- Households policies
CREATE POLICY "Users can view households they belong to"
ON public.households FOR SELECT
USING (
  owner_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.profiles WHERE household_id = households.id AND user_id = auth.uid())
);

CREATE POLICY "Users can create households"
ON public.households FOR INSERT
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Household owners can update"
ON public.households FOR UPDATE
USING (auth.uid() = owner_id);

CREATE POLICY "Household owners can delete"
ON public.households FOR DELETE
USING (auth.uid() = owner_id);

-- Grocery lists policies
CREATE POLICY "Users can view their grocery lists"
ON public.grocery_lists FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create grocery lists"
ON public.grocery_lists FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their grocery lists"
ON public.grocery_lists FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their grocery lists"
ON public.grocery_lists FOR DELETE
USING (auth.uid() = user_id);

-- Challenges policies (viewable by all)
CREATE POLICY "Challenges are viewable by everyone"
ON public.challenges FOR SELECT
USING (true);

-- User challenges policies
CREATE POLICY "Users can view their challenges"
ON public.user_challenges FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can join challenges"
ON public.user_challenges FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their challenge progress"
ON public.user_challenges FOR UPDATE
USING (auth.uid() = user_id);

-- Social posts policies
CREATE POLICY "Social posts are viewable by everyone"
ON public.social_posts FOR SELECT
USING (true);

CREATE POLICY "Users can create posts"
ON public.social_posts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their posts"
ON public.social_posts FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their posts"
ON public.social_posts FOR DELETE
USING (auth.uid() = user_id);

-- Post likes policies
CREATE POLICY "Likes are viewable by everyone"
ON public.post_likes FOR SELECT
USING (true);

CREATE POLICY "Users can like posts"
ON public.post_likes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike"
ON public.post_likes FOR DELETE
USING (auth.uid() = user_id);

-- Post comments policies
CREATE POLICY "Comments are viewable by everyone"
ON public.post_comments FOR SELECT
USING (true);

CREATE POLICY "Users can comment"
ON public.post_comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their comments"
ON public.post_comments FOR DELETE
USING (auth.uid() = user_id);

-- Recipes policies
CREATE POLICY "Public recipes are viewable by everyone"
ON public.recipes FOR SELECT
USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create recipes"
ON public.recipes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their recipes"
ON public.recipes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their recipes"
ON public.recipes FOR DELETE
USING (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_households_updated_at
BEFORE UPDATE ON public.households
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_grocery_lists_updated_at
BEFORE UPDATE ON public.grocery_lists
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_recipes_updated_at
BEFORE UPDATE ON public.recipes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for performance
CREATE INDEX idx_social_posts_community ON public.social_posts(community);
CREATE INDEX idx_social_posts_created_at ON public.social_posts(created_at DESC);
CREATE INDEX idx_user_challenges_user_id ON public.user_challenges(user_id);
CREATE INDEX idx_grocery_lists_user_id ON public.grocery_lists(user_id);
