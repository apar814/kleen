import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import {
  ShoppingCart, Plus, Trash2, Share2, Trophy, TrendingUp,
  AlertTriangle, CheckCircle, Sparkles, Download
} from 'lucide-react';

interface GroceryItem {
  id: string;
  name: string;
  score: number;
  flagged: boolean;
  concerns: string[];
}

const GroceryList: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [listId, setListId] = useState<string | null>(null);

  const cartScore = items.length > 0 
    ? Math.round(items.reduce((acc, item) => acc + item.score, 0) / items.length) 
    : 0;
  
  const flaggedCount = items.filter(i => i.flagged).length;
  const percentile = Math.min(99, Math.round(cartScore * 1.1)); // Simulated percentile

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary bg-primary/10';
    if (score >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-destructive bg-destructive/10';
  };

  const addItem = async () => {
    if (!newItem.trim()) return;
    
    // Simulate scoring (in production, this would call an AI/lookup service)
    const score = Math.floor(Math.random() * 40) + 60; // 60-100
    const flagged = score < 70;
    const concerns = flagged 
      ? ['Contains artificial preservatives', 'High sodium content'].slice(0, Math.floor(Math.random() * 2) + 1)
      : [];
    
    const item: GroceryItem = {
      id: crypto.randomUUID(),
      name: newItem.trim(),
      score,
      flagged,
      concerns,
    };
    
    setItems([...items, item]);
    setNewItem('');
    
    if (flagged) {
      toast({
        title: '⚠️ Item flagged',
        description: `${item.name} scored ${score}/100. Consider a cleaner alternative.`,
      });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const saveList = async () => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Create an account to save your list', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    const payload = {
      user_id: user.id,
      name: 'My Shopping List',
      items: JSON.parse(JSON.stringify(items)),
      cart_score: cartScore,
      total_items: items.length,
      flagged_items: flaggedCount,
    };
    
    const { data, error } = listId 
      ? await supabase.from('grocery_lists').update(payload).eq('id', listId).select().single()
      : await supabase.from('grocery_lists').insert(payload).select().single();
    
    if (error) {
      toast({ title: 'Error saving list', description: error.message, variant: 'destructive' });
    } else {
      setListId(data.id);
      toast({ title: '✓ List saved!', description: 'Your grocery list has been saved.' });
    }
    setLoading(false);
  };

  const handleShare = async () => {
    const shareText = `🛒 My Kleen Cart Score: ${cartScore}/100!\n${items.length} items, ${items.length - flaggedCount} clean picks.\n\nCheck your cart health at kleen.ai`;
    
    if (navigator.share) {
      await navigator.share({ title: 'My Kleen Cart', text: shareText });
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({ title: 'Copied!', description: 'Share text copied to clipboard' });
    }
  };

  return (
    <DashboardLayout
      title="Grocery List Builder"
      description="Build a shopping list with live health scoring"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add item input */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Add a product (e.g., Greek Yogurt, Almond Butter...)"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  className="flex-1"
                />
                <Button onClick={addItem} className="bg-gradient-to-r from-primary to-primary-glow">
                  <Plus className="h-4 w-4 mr-2" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Items list */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Your Cart ({items.length} items)
                </CardTitle>
                {items.length > 0 && (
                  <Button variant="outline" size="sm" onClick={saveList} disabled={loading}>
                    {loading ? 'Saving...' : 'Save List'}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-30" />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm">Add items to see live health scoring</p>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`p-4 rounded-xl border ${item.flagged ? 'border-destructive/20 bg-destructive/5' : 'border-border bg-card'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {item.flagged ? (
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                            ) : (
                              <CheckCircle className="h-5 w-5 text-primary" />
                            )}
                            <div>
                              <span className="font-medium text-foreground">{item.name}</span>
                              {item.concerns.length > 0 && (
                                <p className="text-xs text-destructive mt-0.5">{item.concerns[0]}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getScoreColor(item.score)}>{item.score}</Badge>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Cart Health Score */}
        <div className="space-y-6">
          {/* Live Score Card */}
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-4 shadow-glow">
                <span className="font-heading text-4xl font-bold text-white">{cartScore}</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-1">Cart Health Score</h3>
              <p className="text-sm text-muted-foreground mb-4">Live scoring as you add items</p>
              
              <Progress value={cartScore} className="h-2 mb-4" />
              
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-3 rounded-xl bg-primary/10">
                  <div className="text-2xl font-bold text-primary">{items.length - flaggedCount}</div>
                  <div className="text-xs text-muted-foreground">Clean items</div>
                </div>
                <div className="p-3 rounded-xl bg-destructive/10">
                  <div className="text-2xl font-bold text-destructive">{flaggedCount}</div>
                  <div className="text-xs text-muted-foreground">Flagged items</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gamification */}
          {items.length >= 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-amber-500/20 bg-amber-50/50">
                <CardContent className="p-5 text-center">
                  <Trophy className="h-10 w-10 text-amber-500 mx-auto mb-3" />
                  <p className="font-heading font-bold text-foreground">
                    Top {100 - percentile}% of Kleen users!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your cart scored {cartScore}/100 this week
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Share Card */}
          {items.length > 0 && (
            <Card>
              <CardContent className="p-5">
                <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Share2 className="h-4 w-4 text-primary" />
                  Share Your Clean Cart
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Show off your healthy shopping habits!
                </p>
                <Button className="w-full" variant="outline" onClick={handleShare}>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Share Card
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          <Card>
            <CardContent className="p-5">
              <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Tips to Improve
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Choose organic options when available
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Look for "no artificial preservatives"
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  Replace flagged items with clean swaps
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GroceryList;
