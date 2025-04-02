
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, FileUp } from "lucide-react";
import ProductSwap from '@/components/ProductSwap';
import KleenScore from '@/components/KleenScore';
import { Product } from '@/types/Product';
import HealthScoreOverview from '@/components/HealthScoreOverview';
import ToxinEducation from '@/components/ToxinEducation';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleAmazonCartImport } from '@/services/amazonCartService';
import { handleInstacartCartImport } from '@/services/instacartCartService';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Mock data for demonstration
const mockOriginalProduct: Product = {
  id: "1",
  name: "Generic Body Wash",
  brand: "Brand X",
  category: "Personal Care",
  imageUrl: "https://placehold.co/400x400?text=Body+Wash",
  price: "$8.99",
  cleanScore: 35,
  kleenScore: 35,
  ingredients: [
    {
      name: "Sodium Lauryl Sulfate",
      toxicityLevel: "high",
      description: "A strong surfactant that can irritate skin and strip natural oils."
    },
    {
      name: "Fragrance",
      toxicityLevel: "medium",
      description: "Can contain hundreds of undisclosed chemicals, some linked to allergies and hormone disruption."
    },
    {
      name: "Methylisothiazolinone",
      toxicityLevel: "high",
      description: "Preservative linked to skin irritation and allergic reactions."
    }
  ],
  alternativeProductId: "2"
};

const mockAlternativeProduct: Product = {
  id: "2",
  name: "Clean Body Wash",
  brand: "Pure Company",
  category: "Personal Care",
  imageUrl: "https://placehold.co/400x400?text=Clean+Wash",
  price: "$10.99",
  cleanScore: 85,
  kleenScore: 85,
  ingredients: [
    {
      name: "Sodium Coco Sulfate",
      toxicityLevel: "low",
      description: "A gentler coconut-derived cleanser that's less irritating than SLS."
    },
    {
      name: "Aloe Vera Extract",
      toxicityLevel: "low",
      description: "Natural plant extract that soothes and moisturizes skin."
    },
    {
      name: "Essential Oil Blend",
      toxicityLevel: "low",
      description: "Natural fragrance from essential oils instead of synthetic chemicals."
    }
  ]
};

type CartSource = 'amazon' | 'instacart';

const CartAnalysis: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [cartJson, setCartJson] = useState('');
  const [cartSource, setCartSource] = useState<CartSource>('amazon');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importedProducts, setImportedProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  
  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const handleCartImport = async () => {
    try {
      // Process the cart data based on the selected source
      let products: Product[] = [];
      
      if (cartSource === 'amazon') {
        products = await handleAmazonCartImport(cartJson);
      } else if (cartSource === 'instacart') {
        products = await handleInstacartCartImport(cartJson);
      }
      
      if (products.length === 0) {
        toast({
          title: "Import Failed",
          description: `Could not parse the ${cartSource === 'amazon' ? 'Amazon' : 'Instacart'} cart data. Please check the format and try again.`,
          variant: "destructive",
        });
        return;
      }
      
      setImportedProducts(products);
      setImportModalOpen(false);
      
      // Analyze the imported products
      setIsAnalyzing(true);
      // Simulate API call delay
      setTimeout(() => {
        setIsAnalyzing(false);
        setAnalyzed(true);
        toast({
          title: "Cart Imported",
          description: `Successfully imported ${products.length} products from ${cartSource === 'amazon' ? 'Amazon' : 'Instacart'}.`,
        });
      }, 2000);
    } catch (error) {
      console.error(`Error importing ${cartSource} cart:`, error);
      toast({
        title: "Import Failed",
        description: `An error occurred while importing the ${cartSource === 'amazon' ? 'Amazon' : 'Instacart'} cart data.`,
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cart Analysis</h1>
        <div className="flex gap-2">
          <Button 
            onClick={() => setImportModalOpen(true)} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <FileUp className="w-4 h-4" />
            Import Cart
          </Button>
          <Button 
            onClick={handleAnalyzeClick} 
            disabled={isAnalyzing}
            className="bg-kleen-teal hover:bg-kleen-teal-dark"
          >
            <Search className="w-4 h-4 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Analyze Cart"}
          </Button>
        </div>
      </div>
      
      {importModalOpen && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Import Cart Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <RadioGroup 
                value={cartSource} 
                onValueChange={(value) => setCartSource(value as CartSource)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amazon" id="amazon" />
                  <Label htmlFor="amazon">Amazon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="instacart" id="instacart" />
                  <Label htmlFor="instacart">Instacart</Label>
                </div>
              </RadioGroup>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">
              {cartSource === 'amazon' 
                ? "Paste your Amazon cart JSON data below. This data can be obtained from the Amazon cart page using our browser extension."
                : "Paste your Instacart cart JSON data below. This data can be obtained from the Instacart cart page using our browser extension."
              }
            </p>
            <Textarea
              placeholder={`Paste ${cartSource === 'amazon' ? 'Amazon' : 'Instacart'} cart JSON here...`}
              className="min-h-[200px] mb-4"
              value={cartJson}
              onChange={(e) => setCartJson(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setImportModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCartImport}>
                Import Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {!analyzed ? (
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-500 mb-4 text-center">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-lg">
                {isAnalyzing ? "Analyzing your cart..." : "Click 'Analyze Cart' to check your cart for cleaner alternatives."}
              </p>
            </div>
            {!isAnalyzing && (
              <div className="text-sm text-gray-400 text-center max-w-md">
                <p>Your cart will be analyzed for toxic or controversial ingredients, and we'll suggest cleaner alternatives.</p>
              </div>
            )}
            {isAnalyzing && (
              <div className="animate-pulse mt-4">
                <div className="h-2 bg-gray-300 rounded w-48 mb-2"></div>
                <div className="h-2 bg-gray-300 rounded w-40"></div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-gray-900">Your Cart Results</h2>
              <p className="text-gray-500">We found 3 products that could be cleaner.</p>
            </div>
            <KleenScore score={65} size="md" />
          </div>
          
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="products" className="text-base">
                <Search className="w-4 h-4 mr-2" />
                Product Analysis
              </TabsTrigger>
              <TabsTrigger value="health" className="text-base">
                <BookOpen className="w-4 h-4 mr-2" />
                Health Impact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <motion.div 
                className="grid grid-cols-1 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Personal Care Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProductSwap 
                      originalProduct={mockOriginalProduct}
                      alternativeProduct={mockAlternativeProduct}
                    />
                  </CardContent>
                </Card>
                
                {/* Additional product categories would go here */}
              </motion.div>
            </TabsContent>

            <TabsContent value="health">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HealthScoreOverview />
                <ToxinEducation />
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default CartAnalysis;
