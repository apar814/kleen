import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, ArrowUpDown, Grid3X3, List, Star, Shield, AlertTriangle } from 'lucide-react';

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-primary';
  if (score >= 40) return 'text-yellow-600';
  return 'text-destructive';
};

const getBandColor = (band: string | null) => {
  switch (band) {
    case 'Excellent': return 'bg-emerald-100 text-emerald-800';
    case 'Good': return 'bg-primary/10 text-primary';
    case 'Mixed': return 'bg-yellow-100 text-yellow-800';
    case 'Weak': return 'bg-orange-100 text-orange-800';
    case 'Avoid': return 'bg-destructive/10 text-destructive';
    default: return 'bg-muted text-muted-foreground';
  }
};

const CategoryBrowse: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categorySlug = searchParams.get('category');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'score-high' | 'score-low' | 'name' | 'price'>('score-high');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name');
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch products by category
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['category-products', categorySlug, search, sortBy],
    queryFn: async () => {
      let query = supabase.from('products').select('*, brands(name, logo_url), categories(name, slug)');

      if (categorySlug) {
        const cat = categories.find(c => c.slug === categorySlug);
        if (cat) query = query.eq('category_id', cat.id);
      }

      if (search) query = query.ilike('name', `%${search}%`);

      switch (sortBy) {
        case 'score-high': query = query.order('kleen_score', { ascending: false, nullsFirst: false }); break;
        case 'score-low': query = query.order('kleen_score', { ascending: true, nullsFirst: false }); break;
        case 'name': query = query.order('name'); break;
        case 'price': query = query.order('price', { ascending: true, nullsFirst: false }); break;
      }

      const { data, error } = await query.limit(50);
      if (error) throw error;
      return data || [];
    },
    enabled: categories.length > 0 || !categorySlug,
  });

  const activeCategory = categories.find(c => c.slug === categorySlug);

  return (
    <DashboardLayout
      title={activeCategory ? activeCategory.name : 'Browse Categories'}
      description={activeCategory?.description || 'Explore products by category, sorted by Kleen Score'}
    >
      {/* Category Pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        <Button variant={!categorySlug ? 'default' : 'outline'} size="sm" onClick={() => navigate('/categories')}>
          All
        </Button>
        {categories.map(cat => (
          <Button
            key={cat.id}
            variant={categorySlug === cat.slug ? 'default' : 'outline'}
            size="sm"
            onClick={() => navigate(`/categories?category=${cat.slug}`)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
            <SelectTrigger className="w-44">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="score-high">Score: High to Low</SelectItem>
              <SelectItem value="score-low">Score: Low to High</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Products */}
      {isLoading ? (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <Grid3X3 className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground">No products found</h3>
          <p className="text-sm text-muted-foreground/70 mt-1">
            {categories.length === 0 ? 'Seed the database with categories and products to browse here.' : 'Try a different category or search term.'}
          </p>
        </div>
      ) : (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <Card className="hover:shadow-card transition-all cursor-pointer group">
                <CardContent className={`p-4 ${viewMode === 'list' ? 'flex items-center gap-4' : ''}`}>
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className={`${viewMode === 'grid' ? 'w-full h-36' : 'w-16 h-16'} object-cover rounded-lg bg-muted mb-3 group-hover:scale-[1.02] transition-transform`}
                      loading="lazy"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{(product as any).brands?.name || 'Unknown Brand'}</p>
                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                        {product.price && <p className="text-xs text-muted-foreground mt-0.5">${product.price}</p>}
                      </div>
                      <div className="text-center shrink-0">
                        <div className={`text-2xl font-bold ${getScoreColor(product.kleen_score || 0)}`}>
                          {product.kleen_score || '—'}
                        </div>
                        {product.score_band && (
                          <Badge className={`text-xs ${getBandColor(product.score_band)}`}>{product.score_band}</Badge>
                        )}
                      </div>
                    </div>
                    {product.kleen_score && (
                      <Progress value={product.kleen_score} className="h-1.5 mt-2" />
                    )}
                    {product.certifications && product.certifications.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.certifications.slice(0, 3).map((cert: string) => (
                          <Badge key={cert} variant="outline" className="text-xs">{cert}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                      {product.score_drivers && product.score_drivers.length > 0 && (
                        <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-primary" />{product.score_drivers.length} positives</span>
                      )}
                      {product.score_concerns && product.score_concerns.length > 0 && (
                        <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-destructive" />{product.score_concerns.length} concerns</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* SEO structured data */}
      {activeCategory && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": `Best Clean ${activeCategory.name} — Kleen.ai`,
          "description": activeCategory.description || `Browse the cleanest ${activeCategory.name.toLowerCase()} products rated by Kleen Score.`,
          "url": `https://kleen.ai/categories?category=${activeCategory.slug}`,
        })}} />
      )}
    </DashboardLayout>
  );
};

export default CategoryBrowse;
