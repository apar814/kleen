
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckIcon, RefreshCcw } from "lucide-react";
import { Product } from '@/types/Product';

interface CartOptimizationPanelProps {
  products: Product[];
  onOptimize: (preferences: {
    budget: number;
    priorityFactors: string[];
    dietaryPreferences: string[];
  }) => void;
  isOptimizing: boolean;
}

const CartOptimizationPanel: React.FC<CartOptimizationPanelProps> = ({
  products,
  onOptimize,
  isOptimizing
}) => {
  const [activeTab, setActiveTab] = useState('balanced');
  const [budgetLimit, setBudgetLimit] = useState<number>(100); // 100% of original cart
  const [selectedFactors, setSelectedFactors] = useState<string[]>(['toxicity']);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  
  // Calculate estimated current cart total
  const cartTotal = products.reduce((total, product) => {
    const price = typeof product.price === 'number' 
      ? product.price
      : parseFloat((product.price || '0').toString().replace(/[^0-9.]/g, '')) || 0;
    return total + price;
  }, 0);
  
  const estimatedBudget = (cartTotal * (budgetLimit / 100)).toFixed(2);
  
  const dietaryOptions = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'organic', label: 'Organic' },
    { id: 'non-gmo', label: 'Non-GMO' }
  ];
  
  const priorityOptions = [
    { id: 'toxicity', label: 'Lower Toxicity' },
    { id: 'budget', label: 'Better Price' },
    { id: 'dietary', label: 'Dietary Alignment' }
  ];
  
  const toggleFactor = (id: string) => {
    if (selectedFactors.includes(id)) {
      setSelectedFactors(selectedFactors.filter(item => item !== id));
    } else {
      setSelectedFactors([...selectedFactors, id]);
    }
  };
  
  const toggleDiet = (id: string) => {
    if (selectedDiets.includes(id)) {
      setSelectedDiets(selectedDiets.filter(item => item !== id));
    } else {
      setSelectedDiets([...selectedDiets, id]);
    }
  };
  
  const handleOptimize = () => {
    onOptimize({
      budget: budgetLimit,
      priorityFactors: selectedFactors,
      dietaryPreferences: selectedDiets
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimize Your Cart</CardTitle>
        <CardDescription>
          Customize how we find cleaner alternatives for your shopping cart
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="balanced">Balanced</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="cleanest">Cleanest</TabsTrigger>
          </TabsList>
          
          <TabsContent value="balanced" className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Optimizes your cart with a balance of clean ingredients, price, and dietary preferences.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Budget Flexibility</Label>
                  <span className="text-sm font-medium">
                    {budgetLimit}% (≈${estimatedBudget})
                  </span>
                </div>
                <Slider
                  value={[budgetLimit]}
                  min={80}
                  max={120}
                  step={5}
                  onValueChange={(values) => setBudgetLimit(values[0])}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Set to 100% to maintain your current budget, or adjust for more flexibility.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label className="block mb-2">Optimization Priority</Label>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map(option => (
                    <Badge
                      key={option.id}
                      variant={selectedFactors.includes(option.id) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => toggleFactor(option.id)}
                    >
                      {selectedFactors.includes(option.id) && (
                        <CheckIcon className="w-3 h-3 mr-1" />
                      )}
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="block mb-2">Dietary Preferences</Label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map(option => (
                    <Badge
                      key={option.id}
                      variant={selectedDiets.includes(option.id) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => toggleDiet(option.id)}
                    >
                      {selectedDiets.includes(option.id) && (
                        <CheckIcon className="w-3 h-3 mr-1" />
                      )}
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="budget" className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Finds the most affordable alternatives that are still cleaner than your current products.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Maximum Budget</Label>
                  <span className="text-sm font-medium">
                    {budgetLimit}% (≈${estimatedBudget})
                  </span>
                </div>
                <Slider
                  value={[budgetLimit]}
                  min={70}
                  max={100}
                  step={5}
                  onValueChange={(values) => setBudgetLimit(values[0])}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  Aim for savings by setting a lower budget than your current cart.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cleanest" className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Prioritizes the cleanest possible ingredients, regardless of price.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch id="ignore-budget" />
                <Label htmlFor="ignore-budget">Ignore budget constraints</Label>
              </div>
              
              <div className="space-y-2">
                <Label className="block mb-2">Dietary Preferences</Label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map(option => (
                    <Badge
                      key={option.id}
                      variant={selectedDiets.includes(option.id) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                      onClick={() => toggleDiet(option.id)}
                    >
                      {selectedDiets.includes(option.id) && (
                        <CheckIcon className="w-3 h-3 mr-1" />
                      )}
                      {option.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Button 
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="w-full bg-kleen-mint hover:bg-kleen-mint/90"
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          {isOptimizing ? 'Optimizing...' : 'Optimize My Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartOptimizationPanel;
