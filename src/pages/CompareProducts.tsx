import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Search, Trophy, Scale, DollarSign } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CompareProduct {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  kleenScore: number;
  scoreBand: string;
  ingredientQuality: number;
  ingredientRisk: number;
  transparency: number;
  value: number;
  ingredients: string[];
  certifications: string[];
  pricePerServing: number;
}

const mockCompareProducts: CompareProduct[] = [
  {
    id: '1', name: 'Optimum Nutrition Gold Standard', brand: 'Optimum Nutrition', imageUrl: 'https://placehold.co/200x200?text=ON',
    price: 34.99, kleenScore: 72, scoreBand: 'Good', ingredientQuality: 75, ingredientRisk: 65, transparency: 80, value: 85,
    ingredients: ['Whey Protein Isolate', 'Sucralose', 'Soy Lecithin', 'Acesulfame K', 'Cocoa'],
    certifications: ['Informed Sport'], pricePerServing: 1.17,
  },
  {
    id: '2', name: 'Transparent Labs Grass-Fed Whey', brand: 'Transparent Labs', imageUrl: 'https://placehold.co/200x200?text=TL',
    price: 49.99, kleenScore: 92, scoreBand: 'Excellent', ingredientQuality: 95, ingredientRisk: 90, transparency: 95, value: 70,
    ingredients: ['Grass-Fed Whey Isolate', 'Stevia', 'Cocoa', 'Natural Flavors', 'Sunflower Lecithin'],
    certifications: ['Informed Sport', 'Non-GMO'], pricePerServing: 1.67,
  },
  {
    id: '3', name: 'Naked Whey Protein', brand: 'Naked Nutrition', imageUrl: 'https://placehold.co/200x200?text=Naked',
    price: 89.99, kleenScore: 95, scoreBand: 'Excellent', ingredientQuality: 98, ingredientRisk: 95, transparency: 98, value: 55,
    ingredients: ['Whey Protein Concentrate'],
    certifications: ['Non-GMO', 'rBGH-Free', 'Soy-Free', 'Gluten-Free'], pricePerServing: 1.50,
  },
];

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-emerald-600';
  if (score >= 70) return 'text-primary';
  if (score >= 50) return 'text-yellow-600';
  return 'text-destructive';
};

const CompareProducts = () => {
  const [selected, setSelected] = useState<CompareProduct[]>(mockCompareProducts.slice(0, 2));
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addProduct = (product: CompareProduct) => {
    if (selected.length < 5 && !selected.find(p => p.id === product.id)) {
      setSelected([...selected, product]);
    }
    setSearchOpen(false);
  };

  const removeProduct = (id: string) => {
    setSelected(selected.filter(p => p.id !== id));
  };

  const bestOverall = selected.length > 0 ? selected.reduce((a, b) => a.kleenScore > b.kleenScore ? a : b) : null;
  const bestValue = selected.length > 0 ? selected.reduce((a, b) => (a.kleenScore / a.price) > (b.kleenScore / b.price) ? a : b) : null;

  return (
    <DashboardLayout title="Compare Products" description="Compare up to 5 products side-by-side on ingredients, score, and value">
      {/* Recommendations */}
      {selected.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-4 flex items-center gap-3">
                <Trophy className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Best Overall</p>
                  <p className="font-semibold">{bestOverall?.name}</p>
                  <p className="text-sm text-primary font-medium">Score: {bestOverall?.kleenScore}/100</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <Card className="border-emerald-300/30 bg-emerald-50">
              <CardContent className="pt-4 flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-emerald-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Best Value</p>
                  <p className="font-semibold">{bestValue?.name}</p>
                  <p className="text-sm text-emerald-600 font-medium">${bestValue?.pricePerServing}/serving</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Comparison Grid */}
      <div className="overflow-x-auto">
        <div className="inline-flex gap-4 min-w-full pb-4">
          {selected.map((product, index) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="w-64 flex-shrink-0">
              <Card className={`h-full ${product.id === bestOverall?.id ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    {product.id === bestOverall?.id && <Badge className="bg-primary text-primary-foreground text-xs">Best</Badge>}
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto" onClick={() => removeProduct(product.id)}><X className="h-3 w-3" /></Button>
                  </div>
                  <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded-lg bg-muted mb-3" />
                  <p className="text-xs text-muted-foreground">{product.brand}</p>
                  <p className="font-medium text-sm leading-tight mb-2">{product.name}</p>
                  
                  <div className="text-center py-3 border-y mb-3">
                    <div className={`text-3xl font-bold ${getScoreColor(product.kleenScore)}`}>{product.kleenScore}</div>
                    <Badge variant="outline" className="mt-1 text-xs">{product.scoreBand}</Badge>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-muted-foreground">Ingredient Quality</span><span className="font-medium">{product.ingredientQuality}</span></div>
                      <Progress value={product.ingredientQuality} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-muted-foreground">Safety</span><span className="font-medium">{product.ingredientRisk}</span></div>
                      <Progress value={product.ingredientRisk} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-muted-foreground">Transparency</span><span className="font-medium">{product.transparency}</span></div>
                      <Progress value={product.transparency} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-muted-foreground">Value</span><span className="font-medium">{product.value}</span></div>
                      <Progress value={product.value} className="h-1.5" />
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-1">Price</p>
                    <p className="font-semibold">${product.price} <span className="text-xs text-muted-foreground font-normal">(${product.pricePerServing}/serving)</span></p>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-1">
                      {product.certifications.map(c => <Badge key={c} variant="outline" className="text-xs">{c}</Badge>)}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-muted-foreground mb-2">Ingredients ({product.ingredients.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {product.ingredients.map(ing => <Badge key={ing} variant="secondary" className="text-xs">{ing}</Badge>)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Add Product Card */}
          {selected.length < 5 && (
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogTrigger asChild>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-64 flex-shrink-0">
                  <Card className="h-full border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors flex items-center justify-center min-h-[400px]">
                    <CardContent className="text-center">
                      <Plus className="h-12 w-12 mx-auto text-muted-foreground/40 mb-2" />
                      <p className="text-sm text-muted-foreground">Add Product</p>
                      <p className="text-xs text-muted-foreground/60">{5 - selected.length} slots remaining</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Product to Compare</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search products..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {mockCompareProducts.filter(p => !selected.find(s => s.id === p.id)).map(product => (
                      <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer" onClick={() => addProduct(product)}>
                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded object-cover bg-muted" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                        </div>
                        <span className={`font-bold ${getScoreColor(product.kleenScore)}`}>{product.kleenScore}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompareProducts;
