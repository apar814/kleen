import React, { useState } from 'react';
import { FilterIcon, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'Natural Moisturizing Cream',
    brand: 'Clean Beauty Co.',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$24.99',
    kleenScore: 92,
    category: 'skincare',
    ingredients: [
      {
        name: 'Aloe Vera',
        toxicityLevel: 'low',
        description: 'Soothing plant extract with hydrating properties.'
      },
      {
        name: 'Shea Butter',
        toxicityLevel: 'low',
        description: 'Natural fat extracted from shea tree nuts, deeply moisturizing.'
      }
    ]
  },
  {
    id: '2',
    name: 'Organic Vitamin C Serum',
    brand: 'Pure Botanicals',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$32.50',
    kleenScore: 89,
    category: 'skincare',
    ingredients: [
      {
        name: 'Vitamin C (Ascorbic Acid)',
        toxicityLevel: 'low',
        description: 'Antioxidant that brightens skin and boosts collagen production.'
      },
      {
        name: 'Hyaluronic Acid',
        toxicityLevel: 'low',
        description: 'Natural substance that retains moisture in the skin.'
      }
    ]
  },
  {
    id: '3',
    name: 'Natural Plant Protein',
    brand: 'Clean Fuel',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$39.99',
    kleenScore: 95,
    category: 'supplement',
    ingredients: [
      {
        name: 'Pea Protein Isolate',
        toxicityLevel: 'low',
        description: "Plant-based protein source that's easily digestible."
      },
      {
        name: 'Organic Rice Protein',
        toxicityLevel: 'low',
        description: 'Hypoallergenic protein derived from brown rice.'
      }
    ]
  },
  {
    id: '4',
    name: 'Organic Shampoo',
    brand: 'Pure Essentials',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$18.99',
    kleenScore: 88,
    category: 'haircare',
    ingredients: [
      {
        name: 'Aloe Vera Juice',
        toxicityLevel: 'low',
        description: 'Hydrating and soothing natural ingredient.'
      },
      {
        name: 'Coconut-derived Surfactants',
        toxicityLevel: 'low',
        description: 'Gentle cleansers derived from coconut oil.'
      }
    ]
  }
];

const ExploreProducts = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Filter products based on active tab
  const filteredProducts = activeTab === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === activeTab);

  return (
    <DashboardLayout title="Explore Clean Products" description="Discover toxin-free alternatives for your needs">
      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kleen-gray/60 h-4 w-4" />
          <Input
            placeholder="Search clean products..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="skincare">Skincare</TabsTrigger>
          <TabsTrigger value="haircare">Haircare</TabsTrigger>
          <TabsTrigger value="supplement">Supplements</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard 
              product={product} 
              showAlternative={false}
            />
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ExploreProducts;
