import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Search, Globe, AlertTriangle, Info, Shield, ChevronDown, ChevronUp } from 'lucide-react';

const countryFlags: Record<string, { flag: string; name: string; reason: string }> = {
  'EU': { flag: '🇪🇺', name: 'European Union', reason: 'The EU applies the precautionary principle, banning substances with suspected health risks even before conclusive proof.' },
  'Canada': { flag: '🇨🇦', name: 'Canada', reason: 'Health Canada restricts ingredients with evidence of toxicity or environmental harm.' },
  'Japan': { flag: '🇯🇵', name: 'Japan', reason: 'Japan\'s Food Sanitation Act prohibits additives unless proven safe through rigorous testing.' },
  'Australia': { flag: '🇦🇺', name: 'Australia', reason: 'Food Standards Australia New Zealand (FSANZ) restricts ingredients based on risk assessments.' },
  'Norway': { flag: '🇳🇴', name: 'Norway', reason: 'Norway follows strict Nordic food safety standards, often stricter than the EU.' },
  'Austria': { flag: '🇦🇹', name: 'Austria', reason: 'Austria enforces EU regulations plus additional national restrictions.' },
  'France': { flag: '🇫🇷', name: 'France', reason: 'France has banned several food dyes and additives ahead of EU-wide action.' },
  'UK': { flag: '🇬🇧', name: 'United Kingdom', reason: 'The UK requires warning labels on products with certain artificial colors.' },
  'USA': { flag: '🇺🇸', name: 'United States', reason: 'The FDA has restricted some uses but the US allows many ingredients banned elsewhere.' },
  'Sweden': { flag: '🇸🇪', name: 'Sweden', reason: 'Sweden enforces strict Nordic food safety standards.' },
  'Germany': { flag: '🇩🇪', name: 'Germany', reason: 'Germany applies EU regulations with additional consumer protection measures.' },
};

const getCountryInfo = (name: string) => {
  // Try exact match first, then partial match
  const normalized = name.trim();
  if (countryFlags[normalized]) return countryFlags[normalized];
  const found = Object.entries(countryFlags).find(([key]) => normalized.toLowerCase().includes(key.toLowerCase()));
  return found ? found[1] : { flag: '🏳️', name: normalized, reason: 'This country has restricted this ingredient based on local safety assessments.' };
};

const BannedIngredients: React.FC = () => {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  const { data: ingredients = [], isLoading } = useQuery({
    queryKey: ['banned-ingredients'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .not('banned_in', 'eq', '{}')
        .order('risk_level', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Get all unique countries
  const allCountries = [...new Set(ingredients.flatMap(i => i.banned_in || []))].sort();

  const filtered = ingredients.filter(ing => {
    const matchesSearch = !search || ing.name.toLowerCase().includes(search.toLowerCase()) ||
      ing.aliases?.some((a: string) => a.toLowerCase().includes(search.toLowerCase()));
    const matchesCountry = !filterCountry || ing.banned_in?.some((b: string) => b.toLowerCase().includes(filterCountry.toLowerCase()));
    return matchesSearch && matchesCountry;
  });

  const getRiskBg = (level: number) => {
    if (level >= 4) return 'border-destructive/30 bg-destructive/5';
    if (level >= 3) return 'border-yellow-300 bg-yellow-50';
    return 'border-primary/30 bg-primary/5';
  };

  return (
    <DashboardLayout title="Banned Around the World" description="Ingredients banned or restricted in other countries that may still be in your products">
      <TooltipProvider>
        {/* Stats banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Flagged Ingredients', value: ingredients.length, icon: AlertTriangle, color: 'text-destructive' },
            { label: 'Countries Tracked', value: allCountries.length, icon: Globe, color: 'text-primary' },
            { label: 'High Risk (4-5)', value: ingredients.filter(i => i.risk_level >= 4).length, icon: Shield, color: 'text-orange-600' },
            { label: 'Banned in EU', value: ingredients.filter(i => i.banned_in?.some((b: string) => b.includes('EU'))).length, icon: Info, color: 'text-blue-600' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="pt-4 pb-4 flex items-center gap-3">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div>
                    <div className="text-2xl font-heading font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search ingredients..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant={!filterCountry ? 'default' : 'outline'} size="sm" onClick={() => setFilterCountry(null)}>All</Button>
            {['EU', 'Canada', 'Japan', 'Australia', 'Norway'].map(c => (
              <Button key={c} variant={filterCountry === c ? 'default' : 'outline'} size="sm" onClick={() => setFilterCountry(filterCountry === c ? null : c)}>
                {getCountryInfo(c).flag} {c}
              </Button>
            ))}
          </div>
        </div>

        {/* Ingredient Cards */}
        {isLoading ? (
          <div className="grid gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <Globe className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">
              {ingredients.length === 0 ? 'No banned ingredients in the database yet' : 'No results found'}
            </h3>
            <p className="text-sm text-muted-foreground/70 mt-1">
              {ingredients.length === 0 ? 'Seed the ingredients database with banned_in data to see results here.' : 'Try adjusting your search or filters.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((ing, index) => (
              <motion.div
                key={ing.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card className={`transition-all ${getRiskBg(ing.risk_level)} ${expandedId === ing.id ? 'shadow-card' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4 cursor-pointer" onClick={() => setExpandedId(expandedId === ing.id ? null : ing.id)}>
                      <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        ing.risk_level >= 4 ? 'bg-destructive/10 text-destructive' :
                        ing.risk_level >= 3 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-primary/10 text-primary'
                      }`}>
                        {ing.risk_level}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{ing.name}</h3>
                            <p className="text-xs text-muted-foreground">{ing.category}</p>
                          </div>
                          {expandedId === ing.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {ing.banned_in?.map((country: string) => {
                            const info = getCountryInfo(country);
                            return (
                              <Tooltip key={country}>
                                <TooltipTrigger asChild>
                                  <Badge variant="outline" className="text-xs cursor-help hover:bg-muted transition-colors">
                                    {info.flag} {country}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <p className="font-semibold">{info.name}</p>
                                  <p className="text-xs mt-1">{info.reason}</p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === ing.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-border/60 space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold mb-1">AI Summary</h4>
                              <p className="text-sm text-muted-foreground">{ing.ai_summary}</p>
                            </div>
                            {ing.health_risks && ing.health_risks.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2">Health Risks</h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {ing.health_risks.map((risk: string, i: number) => (
                                    <Badge key={i} variant="destructive" className="text-xs">{risk}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {ing.found_in && ing.found_in.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2">Commonly Found In</h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {ing.found_in.map((p: string, i: number) => (
                                    <Badge key={i} variant="secondary" className="text-xs">{p}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {ing.clean_alternatives && ing.clean_alternatives.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-2">Clean Alternatives</h4>
                                <div className="flex flex-wrap gap-1.5">
                                  {ing.clean_alternatives.map((alt: string, i: number) => (
                                    <Badge key={i} variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">{alt}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            {ing.sources && ing.sources.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-1">Sources</h4>
                                <ul className="space-y-0.5">
                                  {ing.sources.map((src: string, i: number) => (
                                    <li key={i}>
                                      <a href={src} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline truncate block">
                                        {src.length > 60 ? src.slice(0, 60) + '...' : src}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </TooltipProvider>
    </DashboardLayout>
  );
};

export default BannedIngredients;
