import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AppSidebar from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { 
  Baby, AlertTriangle, CheckCircle, Plus, Search, 
  Calendar, Loader2, Shield, Heart, BookOpen, Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface BabyProfile {
  id: string;
  name: string;
  date_of_birth: string | null;
  feeding_stage: string;
  allergies_identified: string[];
}

interface BabyProduct {
  id: string;
  name: string;
  brand: string;
  baby_score: number;
  adult_score: number;
  heavy_metal_risk: 'low' | 'medium' | 'high' | 'critical';
  age_appropriate_from_months: number;
  age_appropriate_to_months: number;
  organic: boolean;
}

interface AllergenStatus {
  allergen: string;
  status: 'not_introduced' | 'introduced_safe' | 'introduced_reaction' | 'avoiding';
  introduced_date?: string;
}

// Mock data
const mockBabyProducts: BabyProduct[] = [
  { id: '1', name: 'Organic Sweet Potato Puree', brand: 'Happy Baby', baby_score: 92, adult_score: 78, heavy_metal_risk: 'low', age_appropriate_from_months: 4, age_appropriate_to_months: 12, organic: true },
  { id: '2', name: 'Apple Carrot Stage 2', brand: 'Gerber', baby_score: 68, adult_score: 72, heavy_metal_risk: 'medium', age_appropriate_from_months: 6, age_appropriate_to_months: 12, organic: false },
  { id: '3', name: 'Rice Cereal', brand: 'Earth\'s Best', baby_score: 45, adult_score: 65, heavy_metal_risk: 'high', age_appropriate_from_months: 4, age_appropriate_to_months: 24, organic: true },
  { id: '4', name: 'Puffs Banana', brand: 'Plum Organics', baby_score: 85, adult_score: 80, heavy_metal_risk: 'low', age_appropriate_from_months: 8, age_appropriate_to_months: 36, organic: true },
  { id: '5', name: 'Infant Formula', brand: 'Similac', baby_score: 72, adult_score: 75, heavy_metal_risk: 'medium', age_appropriate_from_months: 0, age_appropriate_to_months: 12, organic: false },
];

const allergenList = [
  'Dairy', 'Eggs', 'Peanuts', 'Tree Nuts', 'Wheat', 'Soy', 'Fish', 'Shellfish', 'Sesame'
];

const feedingStages = [
  { value: 'newborn', label: 'Newborn (0-4 months)' },
  { value: '4-6mo', label: 'Starting Solids (4-6 months)' },
  { value: '6-9mo', label: 'Learning to Eat (6-9 months)' },
  { value: '9-12mo', label: 'Finger Foods (9-12 months)' },
  { value: 'toddler_1-2', label: 'Toddler (1-2 years)' },
  { value: 'toddler_2-3', label: 'Toddler (2-3 years)' },
];

const getHeavyMetalColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'bg-primary/10 text-primary border-primary/20';
    case 'medium': return 'bg-secondary text-secondary-foreground';
    case 'high': return 'bg-destructive/20 text-destructive border-destructive/20';
    case 'critical': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-primary';
  if (score >= 60) return 'text-secondary-foreground';
  if (score >= 40) return 'text-muted-foreground';
  return 'text-destructive';
};

const BabySafety: React.FC = () => {
  const { user } = useAuth();
  const [babyProfiles, setBabyProfiles] = useState<BabyProfile[]>([]);
  const [selectedBaby, setSelectedBaby] = useState<BabyProfile | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingBaby, setIsAddingBaby] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // New baby form state
  const [newBabyName, setNewBabyName] = useState('');
  const [newBabyDob, setNewBabyDob] = useState('');
  const [newBabyStage, setNewBabyStage] = useState('');

  const [allergenTracking, setAllergenTracking] = useState<AllergenStatus[]>(
    allergenList.map(a => ({ allergen: a, status: 'not_introduced' }))
  );

  useEffect(() => {
    if (user) {
      fetchBabyProfiles();
    }
  }, [user]);

  const fetchBabyProfiles = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('baby_profiles' as any)
      .select('*')
      .eq('user_id', user.id);

    if (!error && data) {
      setBabyProfiles(data as unknown as BabyProfile[]);
      if (data.length > 0 && !selectedBaby) {
        setSelectedBaby(data[0] as unknown as BabyProfile);
      }
    }
  };

  const handleAddBaby = async () => {
    if (!user || !newBabyName.trim()) {
      toast.error('Please enter a name');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('baby_profiles' as any)
      .insert({
        user_id: user.id,
        name: newBabyName.trim(),
        date_of_birth: newBabyDob || null,
        feeding_stage: newBabyStage || 'newborn',
        allergies_identified: []
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to add baby profile');
    } else {
      toast.success(`Added ${newBabyName}'s profile!`);
      setNewBabyName('');
      setNewBabyDob('');
      setNewBabyStage('');
      setIsAddingBaby(false);
      fetchBabyProfiles();
    }
    setLoading(false);
  };

  const updateAllergenStatus = async (allergen: string, status: AllergenStatus['status']) => {
    setAllergenTracking(prev => 
      prev.map(a => a.allergen === allergen ? { ...a, status } : a)
    );

    if (selectedBaby && user) {
      await supabase
        .from('baby_allergen_tracking' as any)
        .upsert({
          baby_id: selectedBaby.id,
          allergen_name: allergen,
          status,
          introduced_at: status !== 'not_introduced' ? new Date().toISOString().split('T')[0] : null
        });
    }

    toast.success(`Updated ${allergen} status`);
  };

  const filteredProducts = mockBabyProducts.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppSidebar>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Baby className="h-8 w-8 text-primary" />
            Baby & Toddler Safety
          </h1>
          <p className="text-muted-foreground mt-2">
            Extra-safe scoring for your little one — heavy metal detection, age-appropriate recommendations
          </p>
        </div>

        {/* Baby Selector + Add */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {babyProfiles.length > 0 ? (
                <div className="flex items-center gap-4 flex-1">
                  <Label className="whitespace-nowrap">Select Child:</Label>
                  <Select
                    value={selectedBaby?.id || ''}
                    onValueChange={(id) => setSelectedBaby(babyProfiles.find(b => b.id === id) || null)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select a child" />
                    </SelectTrigger>
                    <SelectContent>
                      {babyProfiles.map(baby => (
                        <SelectItem key={baby.id} value={baby.id}>
                          {baby.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedBaby && (
                    <Badge variant="outline">
                      {feedingStages.find(s => s.value === selectedBaby.feeding_stage)?.label || selectedBaby.feeding_stage}
                    </Badge>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground flex-1">No baby profiles yet. Add your child to get personalized recommendations.</p>
              )}
              
              <Dialog open={isAddingBaby} onOpenChange={setIsAddingBaby}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Child
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Baby Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="babyName">Name *</Label>
                      <Input
                        id="babyName"
                        value={newBabyName}
                        onChange={(e) => setNewBabyName(e.target.value)}
                        placeholder="Baby's name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="babyDob">Date of Birth</Label>
                      <Input
                        id="babyDob"
                        type="date"
                        value={newBabyDob}
                        onChange={(e) => setNewBabyDob(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Feeding Stage</Label>
                      <Select value={newBabyStage} onValueChange={setNewBabyStage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {feedingStages.map(stage => (
                            <SelectItem key={stage.value} value={stage.value}>
                              {stage.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleAddBaby} className="w-full" disabled={loading}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add Child'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="products" className="gap-2">
              <Search className="h-4 w-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="allergens" className="gap-2">
              <Shield className="h-4 w-4" /> Allergens
            </TabsTrigger>
            <TabsTrigger value="feeding" className="gap-2">
              <Heart className="h-4 w-4" /> Feeding Log
            </TabsTrigger>
            <TabsTrigger value="learn" className="gap-2">
              <BookOpen className="h-4 w-4" /> Learn
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Baby Food Safety Scores</CardTitle>
                <CardDescription>Products scored specifically for infant safety — heavy metals, age-appropriateness, and more</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search baby foods..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold">{product.name}</h4>
                            {product.organic && (
                              <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Organic
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                          
                          <div className="flex items-center gap-4 mt-3">
                            <Badge className={getHeavyMetalColor(product.heavy_metal_risk)}>
                              {product.heavy_metal_risk === 'low' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {(product.heavy_metal_risk === 'high' || product.heavy_metal_risk === 'critical') && <AlertTriangle className="h-3 w-3 mr-1" />}
                              Heavy Metals: {product.heavy_metal_risk}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Ages {product.age_appropriate_from_months}-{product.age_appropriate_to_months} months
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="mb-2">
                            <span className={`text-3xl font-bold ${getScoreColor(product.baby_score)}`}>
                              {product.baby_score}
                            </span>
                            <p className="text-xs text-muted-foreground">Baby Score</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Adult: {product.adult_score}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Allergens Tab */}
          <TabsContent value="allergens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Allergen Introduction Tracker</CardTitle>
                <CardDescription>Track which allergens you've introduced to {selectedBaby?.name || 'your baby'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {allergenTracking.map((item, index) => (
                    <motion.div
                      key={item.allergen}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{item.allergen}</h4>
                        {item.status === 'introduced_safe' && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                        {item.status === 'introduced_reaction' && (
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <Select
                        value={item.status}
                        onValueChange={(value) => updateAllergenStatus(item.allergen, value as AllergenStatus['status'])}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not_introduced">Not Introduced</SelectItem>
                          <SelectItem value="introduced_safe">Introduced - Safe ✓</SelectItem>
                          <SelectItem value="introduced_reaction">Introduced - Reaction ⚠️</SelectItem>
                          <SelectItem value="avoiding">Avoiding</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Introduction Progress</h4>
                  <Progress 
                    value={(allergenTracking.filter(a => a.status !== 'not_introduced').length / allergenTracking.length) * 100} 
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {allergenTracking.filter(a => a.status !== 'not_introduced').length} of {allergenTracking.length} allergens introduced
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feeding Log Tab */}
          <TabsContent value="feeding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feeding Timeline</CardTitle>
                <CardDescription>Track what {selectedBaby?.name || 'your baby'} eats and monitor scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Coming Soon</h3>
                  <p className="text-muted-foreground mt-1">
                    Log meals, track nutrition, and share with your pediatrician
                  </p>
                  <Button variant="outline" className="mt-4">
                    Log First Feeding
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learn Tab */}
          <TabsContent value="learn" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Heavy Metals in Baby Food
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Congressional reports found arsenic, lead, cadmium, and mercury in major baby food brands. Here's what to know:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Rice-based products tend to have higher arsenic levels
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Sweet potato, squash, and fruit purees are generally safer
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Homemade baby food typically has lower contamination
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Allergen Introduction Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    New research recommends early allergen introduction (4-6 months) to reduce allergy risk:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Introduce one new allergen every 3-5 days
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Start with small amounts mixed into familiar foods
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5" />
                      Consult your pediatrician for high-risk babies
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppSidebar>
  );
};

export default BabySafety;
