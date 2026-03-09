import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Link2, ScanBarcode, Star, ArrowRight, Shield, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface SearchResult {
  id: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  price: number;
  kleenScore: number;
  scoreBand: 'Excellent' | 'Good' | 'Mixed' | 'Weak' | 'Avoid';
  scoreDrivers: string[];
  scoreConcerns: string[];
  ingredients: {
    name: string;
    riskLevel: number;
    description: string;
  }[];
  certifications: string[];
  alternatives: {
    id: string;
    name: string;
    brand: string;
    kleenScore: number;
    price: number;
    imageUrl: string;
  }[];
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    name: 'Optimum Nutrition Gold Standard Whey',
    brand: 'Optimum Nutrition',
    category: 'Protein Powder',
    imageUrl: 'https://placehold.co/300x300?text=ON+Whey',
    price: 34.99,
    kleenScore: 72,
    scoreBand: 'Good',
    scoreDrivers: ['High protein per serving', 'Third-party tested', 'No proprietary blends'],
    scoreConcerns: ['Contains artificial sweeteners', 'Sucralose present', 'Soy lecithin'],
    ingredients: [
      { name: 'Whey Protein Isolate', riskLevel: 1, description: 'High-quality protein source with fast absorption.' },
      { name: 'Sucralose', riskLevel: 3, description: 'Artificial sweetener linked to gut microbiome disruption in some studies.' },
      { name: 'Soy Lecithin', riskLevel: 2, description: 'Emulsifier derived from soy, generally safe but may concern those with soy allergies.' },
      { name: 'Acesulfame Potassium', riskLevel: 3, description: 'Artificial sweetener with limited long-term safety data.' },
    ],
    certifications: ['Informed Sport Certified'],
    alternatives: [
      { id: '2', name: 'Transparent Labs 100% Grass-Fed Whey', brand: 'Transparent Labs', kleenScore: 92, price: 49.99, imageUrl: 'https://placehold.co/100x100?text=TL' },
      { id: '3', name: 'Legion Whey+', brand: 'Legion Athletics', kleenScore: 88, price: 44.99, imageUrl: 'https://placehold.co/100x100?text=Legion' },
      { id: '4', name: 'Naked Whey', brand: 'Naked Nutrition', kleenScore: 95, price: 89.99, imageUrl: 'https://placehold.co/100x100?text=Naked' },
    ],
  },
];

const getScoreBandColor = (band: string) => {
  switch (band) {
    case 'Excellent': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Good': return 'bg-primary/10 text-primary border-primary/20';
    case 'Mixed': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Weak': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Avoid': return 'bg-destructive/10 text-destructive border-destructive/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getRiskColor = (level: number) => {
  if (level <= 1) return 'text-emerald-600';
  if (level <= 2) return 'text-primary';
  if (level <= 3) return 'text-yellow-600';
  if (level <= 4) return 'text-orange-600';
  return 'text-destructive';
};

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'name' | 'url' | 'barcode'>('name');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showAllIngredients, setShowAllIngredients] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setResults(mockResults);
      setSelectedProduct(mockResults[0]);
      setIsSearching(false);
    }, 1500);
  };

  return (
    <DashboardLayout title="Product Search" description="Search any product by name, URL, or barcode to get a full Kleen scorecard">
      {/* Search Bar */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <Tabs value={searchMode} onValueChange={(v) => setSearchMode(v as 'name' | 'url' | 'barcode')}>
            <TabsList className="mb-4">
              <TabsTrigger value="name" className="gap-2"><Search className="h-4 w-4" /> By Name</TabsTrigger>
              <TabsTrigger value="url" className="gap-2"><Link2 className="h-4 w-4" /> By URL</TabsTrigger>
              <TabsTrigger value="barcode" className="gap-2"><ScanBarcode className="h-4 w-4" /> By Barcode</TabsTrigger>
            </TabsList>
            <TabsContent value="name">
              <div className="flex gap-3">
                <Input placeholder="Search by product name or brand..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className="flex-1" />
                <Button onClick={handleSearch} disabled={isSearching} className="bg-primary">{isSearching ? 'Searching...' : 'Search'}</Button>
              </div>
            </TabsContent>
            <TabsContent value="url">
              <div className="flex gap-3">
                <Input placeholder="Paste an Amazon, Walmart, or retailer URL..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1" />
                <Button onClick={handleSearch} disabled={isSearching} className="bg-primary">{isSearching ? 'Analyzing...' : 'Analyze'}</Button>
              </div>
            </TabsContent>
            <TabsContent value="barcode">
              <div className="flex gap-3">
                <Input placeholder="Enter UPC or EAN barcode number..." value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1" />
                <Button onClick={handleSearch} disabled={isSearching} className="bg-primary">{isSearching ? 'Looking up...' : 'Lookup'}</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Results / Scorecard */}
      {selectedProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Scorecard */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-40 h-40 object-cover rounded-lg bg-muted" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{selectedProduct.brand}</p>
                          <h2 className="text-xl font-semibold">{selectedProduct.name}</h2>
                          <p className="text-sm text-muted-foreground mt-1">{selectedProduct.category} · ${selectedProduct.price}</p>
                        </div>
                        <div className="text-center">
                          <div className={`text-4xl font-bold ${selectedProduct.kleenScore >= 80 ? 'text-primary' : selectedProduct.kleenScore >= 60 ? 'text-yellow-600' : 'text-destructive'}`}>
                            {selectedProduct.kleenScore}
                          </div>
                          <Badge className={getScoreBandColor(selectedProduct.scoreBand)}>{selectedProduct.scoreBand}</Badge>
                        </div>
                      </div>
                      <Progress value={selectedProduct.kleenScore} className="mt-4 h-3" />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {selectedProduct.certifications.map((cert) => (
                          <Badge key={cert} variant="outline" className="text-xs bg-primary/5 border-primary/20">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Score Drivers & Concerns */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Top Positives</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedProduct.scoreDrivers.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-0.5">✓</span> {d}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-destructive" /> Top Concerns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedProduct.scoreConcerns.map((c, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-destructive mt-0.5">⚠</span> {c}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Ingredient Breakdown */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ingredient Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(showAllIngredients ? selectedProduct.ingredients : selectedProduct.ingredients.slice(0, 3)).map((ing, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className={`text-lg font-bold ${getRiskColor(ing.riskLevel)}`}>{ing.riskLevel}</div>
                        <div>
                          <p className="font-medium text-sm">{ing.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{ing.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedProduct.ingredients.length > 3 && (
                    <Button variant="ghost" className="w-full mt-3" onClick={() => setShowAllIngredients(!showAllIngredients)}>
                      {showAllIngredients ? <><ChevronUp className="h-4 w-4 mr-1" /> Show Less</> : <><ChevronDown className="h-4 w-4 mr-1" /> Show All ({selectedProduct.ingredients.length})</>}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Alternatives Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2"><Star className="h-4 w-4 text-primary" /> Cleaner Alternatives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProduct.alternatives.map((alt) => (
                    <div key={alt.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors">
                      <img src={alt.imageUrl} alt={alt.name} className="w-12 h-12 rounded-md object-cover bg-muted" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{alt.name}</p>
                        <p className="text-xs text-muted-foreground">{alt.brand} · ${alt.price}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${alt.kleenScore >= 80 ? 'text-primary' : 'text-yellow-600'}`}>{alt.kleenScore}</div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Alternatives <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">Save to My Products</Button>
                  <Button variant="outline" className="w-full justify-start">Add to Comparison</Button>
                  <Button variant="outline" className="w-full justify-start">Share Scorecard</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!selectedProduct && !isSearching && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">Search for any product</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">Enter a product name, paste a retailer URL, or scan a barcode to get started</p>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default ProductSearch;
