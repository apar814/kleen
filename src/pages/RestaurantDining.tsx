import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AppSidebar from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuScannerDialog, { type ScannedMenuItem } from '@/components/restaurant/MenuScannerDialog';
import ScannedMenuResults from '@/components/restaurant/ScannedMenuResults';
import { 
  MapPin, Search, Utensils, Camera, Navigation, 
  CheckCircle, AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface Restaurant {
  id: string;
  restaurant_name: string;
  address: string | null;
  average_score: number | null;
  kleen_grade: string | null;
  location_lat: number | null;
  location_lng: number | null;
}

interface MenuItem {
  id: string;
  item_name: string;
  description: string | null;
  kleen_score: number | null;
  dietary_tags: string[];
  allergen_flags: string[];
}

// Mock nearby restaurants for demo
const mockRestaurants: Restaurant[] = [
  { id: '1', restaurant_name: 'Chipotle Mexican Grill', address: '123 Main St', average_score: 72, kleen_grade: 'B', location_lat: 34.0522, location_lng: -118.2437 },
  { id: '2', restaurant_name: 'Sweetgreen', address: '456 Oak Ave', average_score: 88, kleen_grade: 'A', location_lat: 34.0530, location_lng: -118.2450 },
  { id: '3', restaurant_name: 'Panera Bread', address: '789 Elm St', average_score: 65, kleen_grade: 'B', location_lat: 34.0510, location_lng: -118.2420 },
  { id: '4', restaurant_name: "McDonald's", address: '321 Fast Food Ln', average_score: 35, kleen_grade: 'D', location_lat: 34.0540, location_lng: -118.2460 },
  { id: '5', restaurant_name: 'True Food Kitchen', address: '555 Health Way', average_score: 91, kleen_grade: 'A', location_lat: 34.0515, location_lng: -118.2445 },
];

const mockMenuItems: MenuItem[] = [
  { id: '1', item_name: 'Chicken Burrito Bowl', description: 'White rice, black beans, chicken, fresh tomato salsa, cheese, lettuce', kleen_score: 78, dietary_tags: ['High Protein', 'Gluten-Free Option'], allergen_flags: ['Dairy'] },
  { id: '2', item_name: 'Carnitas Tacos', description: 'Soft corn tortillas, carnitas, onions, cilantro', kleen_score: 65, dietary_tags: ['Gluten-Free'], allergen_flags: [] },
  { id: '3', item_name: 'Sofritas Salad', description: 'Romaine, sofritas, fajita veggies, corn salsa, guacamole', kleen_score: 85, dietary_tags: ['Vegan', 'High Fiber'], allergen_flags: ['Soy'] },
  { id: '4', item_name: 'Queso Blanco', description: 'Creamy white queso with peppers', kleen_score: 42, dietary_tags: [], allergen_flags: ['Dairy', 'Gluten'] },
];

const getGradeColor = (grade: string | null) => {
  switch (grade) {
    case 'A': return 'bg-primary text-primary-foreground';
    case 'B': return 'bg-secondary text-secondary-foreground';
    case 'C': return 'bg-muted text-muted-foreground';
    case 'D': return 'bg-destructive/20 text-destructive';
    case 'F': return 'bg-destructive text-destructive-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getScoreColor = (score: number | null) => {
  if (!score) return 'text-muted-foreground';
  if (score >= 80) return 'text-primary';
  if (score >= 60) return 'text-secondary-foreground';
  if (score >= 40) return 'text-muted-foreground';
  return 'text-destructive';
};

const RestaurantDining: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [scannedResult, setScannedResult] = useState<{ restaurant_name?: string; items: ScannedMenuItem[] } | null>(null);

  useEffect(() => {
    // Check if geolocation is available
    if ('geolocation' in navigator) {
      setLocationEnabled(true);
    }
  }, []);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    // In production, fetch menu items from database
    setMenuItems(mockMenuItems);
  };

  const handleLogMeal = async (item: MenuItem) => {
    if (!user) {
      toast.error('Please sign in to log meals');
      return;
    }

    // Log to dining_logs table
    const { error } = await supabase
      .from('dining_logs' as any)
      .insert({
        user_id: user.id,
        item_name: item.item_name,
        score: item.kleen_score
      });

    if (error) {
      toast.error('Failed to log meal');
    } else {
      toast.success(`Logged: ${item.item_name} (Score: ${item.kleen_score})`);
    }
  };

  const filteredRestaurants = mockRestaurants.filter(r =>
    r.restaurant_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppSidebar>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Utensils className="h-8 w-8 text-primary" />
            Restaurant Intelligence
          </h1>
          <p className="text-muted-foreground mt-2">
            Find the healthiest options at any restaurant — scored and ranked
          </p>
        </div>

        {/* Search & Location */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search restaurants near you..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Navigation className="h-4 w-4" />
                Use My Location
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Scan Menu
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Scan a Menu</DialogTitle>
                  </DialogHeader>
                  <div className="py-8 text-center">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Take a photo of a restaurant menu to get instant scores for every item
                    </p>
                    <Button className="mt-4">Open Camera</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Restaurant List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-semibold text-lg">Nearby Restaurants</h2>
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedRestaurant?.id === restaurant.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleRestaurantSelect(restaurant)}
                >
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{restaurant.restaurant_name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {restaurant.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getGradeColor(restaurant.kleen_grade)}>
                          Grade {restaurant.kleen_grade}
                        </Badge>
                        <p className={`text-lg font-bold mt-1 ${getScoreColor(restaurant.average_score)}`}>
                          {restaurant.average_score}/100
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Menu & Details */}
          <div className="lg:col-span-2">
            {selectedRestaurant ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedRestaurant.restaurant_name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {selectedRestaurant.address}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge className={`text-lg px-4 py-2 ${getGradeColor(selectedRestaurant.kleen_grade)}`}>
                        {selectedRestaurant.kleen_grade}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">Kleen Grade</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="best">
                    <TabsList className="mb-4">
                      <TabsTrigger value="best">Best Options</TabsTrigger>
                      <TabsTrigger value="all">Full Menu</TabsTrigger>
                      <TabsTrigger value="avoid">Avoid</TabsTrigger>
                    </TabsList>

                    <TabsContent value="best" className="space-y-3">
                      {menuItems
                        .filter(item => (item.kleen_score || 0) >= 70)
                        .sort((a, b) => (b.kleen_score || 0) - (a.kleen_score || 0))
                        .map((item) => (
                          <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-primary" />
                                  <h4 className="font-medium">{item.item_name}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {item.dietary_tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                  ))}
                                  {item.allergen_flags.map(flag => (
                                    <Badge key={flag} variant="secondary" className="text-xs">⚠️ {flag}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <span className={`text-2xl font-bold ${getScoreColor(item.kleen_score)}`}>
                                  {item.kleen_score}
                                </span>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="mt-2 w-full"
                                  onClick={() => handleLogMeal(item)}
                                >
                                  Log Meal
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="all" className="space-y-3">
                      {menuItems
                        .sort((a, b) => (b.kleen_score || 0) - (a.kleen_score || 0))
                        .map((item) => (
                          <div key={item.id} className="p-4 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium">{item.item_name}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                              </div>
                              <span className={`text-xl font-bold ${getScoreColor(item.kleen_score)}`}>
                                {item.kleen_score}
                              </span>
                            </div>
                          </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="avoid" className="space-y-3">
                      {menuItems
                        .filter(item => (item.kleen_score || 0) < 50)
                        .sort((a, b) => (a.kleen_score || 0) - (b.kleen_score || 0))
                        .map((item) => (
                          <div key={item.id} className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-destructive" />
                                  <h4 className="font-medium">{item.item_name}</h4>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                              </div>
                              <span className={`text-xl font-bold ${getScoreColor(item.kleen_score)}`}>
                                {item.kleen_score}
                              </span>
                            </div>
                          </div>
                        ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <div className="text-center py-12">
                  <Utensils className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Select a Restaurant</h3>
                  <p className="text-muted-foreground mt-1">
                    Choose a restaurant to see scored menu items
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppSidebar>
  );
};

export default RestaurantDining;
