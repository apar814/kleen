import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AppSidebar from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Droplets, Search, AlertTriangle, CheckCircle, MapPin, 
  Filter, Zap, Coffee, Wine, Loader2, ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface WaterQuality {
  zip_code: string;
  city: string;
  state: string;
  water_utility_name: string;
  overall_score: number;
  contaminants: { name: string; level: number; limit: number; exceeds: boolean }[];
}

interface WaterFilter {
  id: string;
  brand: string;
  model: string;
  filter_type: string;
  kleen_score: number;
  price_range: string;
  contaminants_removed: string[];
}

// Mock data
const mockWaterQuality: WaterQuality = {
  zip_code: '90210',
  city: 'Beverly Hills',
  state: 'CA',
  water_utility_name: 'Beverly Hills Water',
  overall_score: 58,
  contaminants: [
    { name: 'Arsenic', level: 3.2, limit: 10, exceeds: false },
    { name: 'Chromium-6', level: 0.15, limit: 0.02, exceeds: true },
    { name: 'Lead', level: 2.1, limit: 15, exceeds: false },
    { name: 'Chloroform', level: 45, limit: 80, exceeds: false },
    { name: 'Nitrate', level: 4.5, limit: 10, exceeds: false },
  ]
};

const mockFilters: WaterFilter[] = [
  { id: '1', brand: 'Clearly Filtered', model: 'Pitcher Filter', filter_type: 'pitcher', kleen_score: 92, price_range: '$60-$80', contaminants_removed: ['Lead', 'Chromium-6', 'Arsenic', 'Fluoride'] },
  { id: '2', brand: 'Berkey', model: 'Big Berkey', filter_type: 'countertop', kleen_score: 95, price_range: '$300-$400', contaminants_removed: ['Bacteria', 'Viruses', 'Lead', 'Arsenic', 'Chromium-6', 'Pharmaceuticals'] },
  { id: '3', brand: 'Aquasana', model: 'Under Sink 3-Stage', filter_type: 'under-sink', kleen_score: 88, price_range: '$150-$200', contaminants_removed: ['Lead', 'Chlorine', 'Herbicides', 'Pesticides'] },
  { id: '4', brand: 'ZeroWater', model: '10-Cup Pitcher', filter_type: 'pitcher', kleen_score: 78, price_range: '$30-$45', contaminants_removed: ['Lead', 'Chromium', 'Mercury', 'TDS'] },
];

const mockBeverages = [
  { id: '1', name: 'Athletic Greens AG1', type: 'supplement_drink', score: 82, caffeine: 0, sugar: 2 },
  { id: '2', name: 'Celsius Energy', type: 'energy_drink', score: 68, caffeine: 200, sugar: 0 },
  { id: '3', name: 'GT\'s Synergy Kombucha', type: 'kombucha', score: 85, caffeine: 8, sugar: 4 },
  { id: '4', name: 'Liquid Death', type: 'water', score: 95, caffeine: 0, sugar: 0 },
  { id: '5', name: 'OLIPOP Vintage Cola', type: 'soda', score: 76, caffeine: 50, sugar: 2 },
];

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-primary';
  if (score >= 60) return 'text-secondary-foreground';
  if (score >= 40) return 'text-muted-foreground';
  return 'text-destructive';
};

const getScoreBgColor = (score: number) => {
  if (score >= 80) return 'bg-primary/10 border-primary/20';
  if (score >= 60) return 'bg-secondary/10 border-secondary/20';
  if (score >= 40) return 'bg-muted border-muted-foreground/20';
  return 'bg-destructive/10 border-destructive/20';
};

const WaterBeverage: React.FC = () => {
  const { user } = useAuth();
  const [zipCode, setZipCode] = useState('');
  const [waterQuality, setWaterQuality] = useState<WaterQuality | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCheckWater = () => {
    if (!zipCode.trim()) {
      toast.error('Please enter a zip code');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWaterQuality({ ...mockWaterQuality, zip_code: zipCode });
      setLoading(false);
    }, 1000);
  };

  const handleLogHydration = async (amount: number, type: string, score: number) => {
    if (!user) {
      toast.error('Please sign in to log hydration');
      return;
    }

    const { error } = await supabase
      .from('hydration_logs' as any)
      .insert({
        user_id: user.id,
        amount_ml: amount,
        beverage_type: type,
        score
      });

    if (error) {
      toast.error('Failed to log hydration');
    } else {
      toast.success(`Logged ${amount}ml hydration`);
    }
  };

  return (
    <AppSidebar>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Droplets className="h-8 w-8 text-primary" />
            Water & Beverage Quality
          </h1>
          <p className="text-muted-foreground mt-2">
            Check your tap water quality and find the healthiest beverages
          </p>
        </div>

        <Tabs defaultValue="tap-water" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="tap-water" className="gap-2">
              <Droplets className="h-4 w-4" /> Tap Water
            </TabsTrigger>
            <TabsTrigger value="filters" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </TabsTrigger>
            <TabsTrigger value="beverages" className="gap-2">
              <Coffee className="h-4 w-4" /> Beverages
            </TabsTrigger>
          </TabsList>

          {/* Tap Water Tab */}
          <TabsContent value="tap-water" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Check Your Tap Water Quality</CardTitle>
                <CardDescription>Enter your ZIP code to see what's in your water</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter ZIP code"
                      className="pl-10"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      maxLength={5}
                    />
                  </div>
                  <Button onClick={handleCheckWater} disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Check Water'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {waterQuality && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          {waterQuality.city}, {waterQuality.state}
                        </CardTitle>
                        <CardDescription>{waterQuality.water_utility_name}</CardDescription>
                      </div>
                      <div className={`text-center p-4 rounded-xl ${getScoreBgColor(waterQuality.overall_score)}`}>
                        <span className={`text-4xl font-bold ${getScoreColor(waterQuality.overall_score)}`}>
                          {waterQuality.overall_score}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">Water Score</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-4">Contaminants Detected</h4>
                    <div className="space-y-4">
                      {waterQuality.contaminants.map((contaminant, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {contaminant.exceeds ? (
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              )}
                              <span className="font-medium">{contaminant.name}</span>
                            </div>
                            <span className={contaminant.exceeds ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                              {contaminant.level} / {contaminant.limit} ppb
                            </span>
                          </div>
                          <Progress 
                            value={Math.min((contaminant.level / contaminant.limit) * 100, 100)} 
                            className={contaminant.exceeds ? '[&>div]:bg-destructive' : ''}
                          />
                        </div>
                      ))}
                    </div>

                    {waterQuality.contaminants.some(c => c.exceeds) && (
                      <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                          <div>
                            <p className="font-medium text-destructive">Contaminants Above Safe Levels</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              We recommend using a water filter. See our recommendations below.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* Filters Tab */}
          <TabsContent value="filters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockFilters.map((filter, index) => (
                <motion.div
                  key={filter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{filter.brand}</h3>
                          <p className="text-sm text-muted-foreground">{filter.model}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-lg ${getScoreBgColor(filter.kleen_score)}`}>
                          <span className={`text-xl font-bold ${getScoreColor(filter.kleen_score)}`}>
                            {filter.kleen_score}
                          </span>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="mb-3 capitalize">
                        {filter.filter_type.replace('-', ' ')}
                      </Badge>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        <strong>Removes:</strong> {filter.contaminants_removed.join(', ')}
                      </p>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="font-medium text-primary">{filter.price_range}</span>
                        <Button size="sm" variant="outline" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Beverages Tab */}
          <TabsContent value="beverages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Beverage Scores</CardTitle>
                <CardDescription>Compare drinks beyond just water</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search beverages..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  {mockBeverages
                    .filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((beverage, index) => (
                      <motion.div
                        key={beverage.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium">{beverage.name}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            {beverage.caffeine > 0 && (
                              <span className="flex items-center gap-1">
                                <Zap className="h-3 w-3" />
                                {beverage.caffeine}mg caffeine
                              </span>
                            )}
                            <span>{beverage.sugar}g sugar</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-2xl font-bold ${getScoreColor(beverage.score)}`}>
                            {beverage.score}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleLogHydration(250, beverage.type, beverage.score)}
                          >
                            Log 8oz
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppSidebar>
  );
};

export default WaterBeverage;
