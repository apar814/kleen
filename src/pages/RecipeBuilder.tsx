import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import {
  ChefHat, Send, Loader2, Clock, Users, Leaf, AlertTriangle,
  ArrowRight, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';

interface DiscoverRecipe {
  title: string;
  description: string;
  imageQuery: string;
  tags: string[];
  prepTime: string;
}

interface RecipeDetail {
  title: string;
  description: string;
  prepTime: string;
  servings: number;
  kleenScore: number;
  ingredients: { name: string; amount: string; isClean: boolean; note: string | null }[];
  steps: string[];
  toxicSwaps: { toxic: string; clean: string; why: string }[];
  nutritionHighlights: string[];
  tags: string[];
}

const placeholderImages = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
];

const RecipeBuilder: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [discoverLoading, setDiscoverLoading] = useState(true);
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [discoverRecipes, setDiscoverRecipes] = useState<DiscoverRecipe[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadDiscoverRecipes();
  }, []);

  const loadDiscoverRecipes = async () => {
    setDiscoverLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('recipe-builder', {
        body: { type: 'discover', prompt: 'Suggest 8 popular healthy clean-ingredient recipes spanning breakfast, lunch, dinner, snacks and smoothies' },
      });
      if (error) throw error;
      if (data?.data && Array.isArray(data.data)) {
        setDiscoverRecipes(data.data);
      }
    } catch (e) {
      console.error('Error loading discover recipes:', e);
    }
    setDiscoverLoading(false);
  };

  const buildRecipe = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setRecipe(null);
    try {
      const { data, error } = await supabase.functions.invoke('recipe-builder', {
        body: { type: 'build', prompt: query },
      });
      if (error) throw error;
      if (data?.error) {
        toast({ title: 'Error', description: data.error, variant: 'destructive' });
      } else if (data?.data) {
        setRecipe(data.data);
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Failed to generate recipe', variant: 'destructive' });
    }
    setLoading(false);
  };

  const scroll = (dir: 'left' | 'right') => {
    tickerRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <DashboardLayout title="Recipe Builder" description="AI-powered clean recipes — tell us what you want to make">
      {/* Discovery Ticker */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-h3 text-foreground">Discover Recipes</h3>
            <p className="text-sm text-muted-foreground">Scroll for inspiration or type your own below</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={() => scroll('left')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8" onClick={() => scroll('right')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={tickerRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {discoverLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="shrink-0 w-72 h-48 rounded-2xl bg-muted animate-pulse" />
            ))
          ) : (
            discoverRecipes.map((r, i) => (
              <motion.div
                key={r.title}
                className="shrink-0 w-72 cursor-pointer group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { setPrompt(r.title); buildRecipe(r.title); }}
              >
                <div className="relative h-44 rounded-2xl overflow-hidden shadow-card group-hover:shadow-elevated transition-all">
                  <img
                    src={placeholderImages[i % placeholderImages.length]}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h4 className="font-heading font-semibold text-white text-sm mb-1">{r.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/20 text-white border-0 text-xs backdrop-blur-sm">
                        <Clock className="h-3 w-3 mr-1" />{r.prepTime}
                      </Badge>
                      {r.tags?.slice(0, 1).map(t => (
                        <Badge key={t} className="bg-primary/80 text-white border-0 text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Search Input */}
      <Card className="border-border/60 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="h-5 w-5 text-primary" />
            <h3 className="font-heading font-semibold text-foreground">What do you want to make?</h3>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); buildRecipe(prompt); }} className="flex gap-3">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A clean protein smoothie, healthy pasta, toxin-free granola bars..."
              className="h-12 flex-1"
            />
            <Button type="submit" disabled={loading || !prompt.trim()} className="h-12 px-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold shadow-glow">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading state */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-heading text-h3 text-foreground mb-2">Crafting your clean recipe...</h3>
          <p className="text-muted-foreground">Our AI is finding the cleanest ingredients</p>
        </motion.div>
      )}

      {/* Recipe Result */}
      <AnimatePresence>
        {recipe && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <Card className="border-border/60 mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-heading text-h2 text-foreground mb-2">{recipe.title}</h2>
                    <p className="text-body text-muted-foreground">{recipe.description}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {recipe.tags?.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                    </div>
                  </div>
                  <div className="text-center shrink-0">
                    <div className="text-4xl font-heading font-bold gradient-text">{recipe.kleenScore}</div>
                    <div className="text-xs text-muted-foreground">Kleen Score</div>
                  </div>
                </div>
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{recipe.prepTime}</span>
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" />{recipe.servings} servings</span>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Ingredients */}
              <Card className="border-border/60">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-primary" /> Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {recipe.ingredients?.map((ing, i) => (
                    <div key={i} className={`flex items-start gap-2 p-2 rounded-lg ${ing.isClean ? 'bg-primary/5' : 'bg-destructive/5'}`}>
                      <span className="text-xs mt-0.5">{ing.isClean ? '✅' : '⚠️'}</span>
                      <div>
                        <span className="text-sm font-medium">{ing.amount} {ing.name}</span>
                        {ing.note && <p className="text-xs text-muted-foreground">{ing.note}</p>}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Steps */}
              <Card className="border-border/60 lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-lg">Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {recipe.steps?.map((step, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {i + 1}
                        </div>
                        <p className="text-sm text-foreground pt-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>

            {/* Toxic Swaps */}
            {recipe.toxicSwaps?.length > 0 && (
              <Card className="border-border/60 mt-6">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" /> Toxic Ingredient Swaps
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Common toxic versions replaced with clean alternatives</p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {recipe.toxicSwaps.map((swap, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-card">
                        <div className="flex-1 text-center p-2 rounded-lg bg-destructive/5">
                          <div className="text-xs text-destructive font-medium mb-1">TOXIC</div>
                          <div className="text-sm font-semibold">{swap.toxic}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 text-center p-2 rounded-lg bg-primary/5">
                          <div className="text-xs text-primary font-medium mb-1">CLEAN</div>
                          <div className="text-sm font-semibold">{swap.clean}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Nutrition */}
            {recipe.nutritionHighlights?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {recipe.nutritionHighlights.map((h, i) => (
                  <Badge key={i} variant="outline" className="py-1.5 px-3 text-sm">
                    <Sparkles className="h-3 w-3 mr-1 text-primary" />{h}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default RecipeBuilder;
