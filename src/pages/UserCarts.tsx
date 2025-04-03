
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckIcon, PlusIcon, ShoppingCart, Trash } from "lucide-react";
import DashboardLayout from '@/components/DashboardLayout';
import { UserCart } from '@/types/ToxicIngredients';

// Mock data for user carts
const mockUserCarts: UserCart[] = [
  {
    id: '1',
    userId: 'user123',
    title: 'Weekly Groceries',
    preferences: ['organic', 'gluten-free'],
    createdAt: new Date('2023-09-15'),
    products: [
      { id: 'prod1', name: 'Organic Almond Milk', quantity: 2 },
      { id: 'prod2', name: 'Gluten-Free Pasta', quantity: 1 },
      { id: 'prod3', name: 'Organic Apples', quantity: 6 }
    ]
  },
  {
    id: '2',
    userId: 'user123',
    title: 'Skincare Essentials',
    preferences: ['fragrance-free', 'vegan'],
    createdAt: new Date('2023-10-03'),
    products: [
      { id: 'prod4', name: 'Gentle Face Cleanser', quantity: 1 },
      { id: 'prod5', name: 'Vegan Moisturizer', quantity: 1 },
      { id: 'prod6', name: 'Sunscreen SPF 50', quantity: 2 }
    ]
  },
  {
    id: '3',
    userId: 'user123',
    title: 'Protein Foods',
    preferences: ['high-protein', 'low-carb'],
    createdAt: new Date('2023-11-20'),
    products: [
      { id: 'prod7', name: 'Protein Powder', quantity: 1 },
      { id: 'prod8', name: 'Grass-fed Beef', quantity: 2 },
      { id: 'prod9', name: 'Greek Yogurt', quantity: 4 }
    ]
  }
];

const dietaryOptions = [
  { id: 'vegan', label: 'Vegan' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { id: 'organic', label: 'Organic' },
  { id: 'non-gmo', label: 'Non-GMO' },
  { id: 'high-protein', label: 'High Protein' },
  { id: 'low-carb', label: 'Low Carb' },
  { id: 'keto', label: 'Keto' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'fragrance-free', label: 'Fragrance Free' }
];

const UserCarts: React.FC = () => {
  const [userCarts, setUserCarts] = useState<UserCart[]>(mockUserCarts);
  const [newCartTitle, setNewCartTitle] = useState('');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  
  const handleCreateCart = () => {
    if (!newCartTitle.trim()) return;
    
    const newCart: UserCart = {
      id: `cart-${Date.now()}`,
      userId: 'user123', // In a real app, this would be the current user's ID
      title: newCartTitle,
      preferences: selectedPreferences,
      createdAt: new Date(),
      products: [] // Empty cart initially
    };
    
    setUserCarts([...userCarts, newCart]);
    setNewCartTitle('');
    setSelectedPreferences([]);
  };
  
  const handleDeleteCart = (cartId: string) => {
    setUserCarts(userCarts.filter(cart => cart.id !== cartId));
  };
  
  const togglePreference = (preference: string) => {
    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== preference));
    } else {
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };
  
  // Filter carts based on the active tab
  const filteredCarts = userCarts.filter(cart => {
    if (activeTab === 'all') return true;
    return cart.preferences.includes(activeTab);
  });
  
  // Get unique preferences from all carts for tabs
  const uniquePreferences = Array.from(
    new Set(userCarts.flatMap(cart => cart.preferences))
  );
  
  return (
    <DashboardLayout 
      title="My Clean Carts" 
      description="Manage your personalized shopping carts based on your health preferences"
    >
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 overflow-x-auto max-w-full">
              <TabsTrigger value="all">All Carts</TabsTrigger>
              {uniquePreferences.map(preference => (
                <TabsTrigger key={preference} value={preference}>
                  {preference}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-kleen-mint hover:bg-kleen-mint/90">
                <PlusIcon className="w-4 h-4 mr-2" />
                New Cart
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Cart</DialogTitle>
                <DialogDescription>
                  Create a new cart with your dietary preferences and health goals.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cart-name">Cart Name</Label>
                  <Input
                    id="cart-name"
                    placeholder="Weekly Groceries, Skincare Routine, etc."
                    value={newCartTitle}
                    onChange={(e) => setNewCartTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Dietary Preferences & Health Goals</Label>
                  <ScrollArea className="h-[120px] rounded-md border p-4">
                    <div className="flex flex-wrap gap-2">
                      {dietaryOptions.map(option => (
                        <Badge
                          key={option.id}
                          variant={selectedPreferences.includes(option.id) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-gray-100 hover:text-gray-900"
                          onClick={() => togglePreference(option.id)}
                        >
                          {selectedPreferences.includes(option.id) && (
                            <CheckIcon className="w-3 h-3 mr-1" />
                          )}
                          {option.label}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  onClick={handleCreateCart}
                  disabled={!newCartTitle.trim()}
                >
                  Create Cart
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCarts.length > 0 ? (
            filteredCarts.map((cart) => (
              <motion.div
                key={cart.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{cart.title}</CardTitle>
                        <CardDescription>
                          {cart.products.length} products
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 -mt-1 -mr-2"
                        onClick={() => handleDeleteCart(cart.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cart.preferences.map(pref => (
                        <Badge key={pref} variant="secondary" className="text-xs">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                    
                    <ul className="text-sm space-y-1 max-h-28 overflow-auto">
                      {cart.products.map(product => (
                        <li key={product.id} className="flex justify-between">
                          <span className="truncate flex-grow">{product.name}</span>
                          <span className="text-gray-500 ml-2">x{product.quantity}</span>
                        </li>
                      ))}
                      {cart.products.length === 0 && (
                        <li className="text-gray-500 italic">No products yet</li>
                      )}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Shop This Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No carts found</h3>
              <p className="text-gray-500 mb-4">
                {activeTab === 'all' 
                  ? "You haven't created any clean carts yet." 
                  : `You don't have any carts with the "${activeTab}" preference.`}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default UserCarts;
