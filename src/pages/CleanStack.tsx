import React from 'react';
import { Heart, Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/Product';

// Mock data for saved products
const savedProducts: Product[] = [
  {
    id: '1',
    name: 'Natural Moisturizing Cream',
    brand: 'Clean Beauty Co.',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$24.99',
    kleenScore: 92,
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
  }
];

// Mock data for stacks
const stacks = [
  {
    id: '1',
    name: 'Morning Skincare Routine',
    productCount: 4,
    dateCreated: 'May 12, 2023'
  },
  {
    id: '2',
    name: 'Makeup Essentials',
    productCount: 6,
    dateCreated: 'April 3, 2023'
  }
];

const CleanStack = () => {
  return (
    <DashboardLayout title="My Clean Stack" description="Your saved clean products and routines">
      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kleen-gray/60 h-4 w-4" />
          <Input
            placeholder="Search saved products..."
            className="pl-10"
          />
        </div>
        <Button variant="default" className="flex items-center gap-2 bg-kleen-mint hover:bg-kleen-mint/90">
          <Plus className="h-4 w-4" />
          Create Stack
        </Button>
      </div>
      
      <div className="mb-8">
        <h2 className="kleen-heading-h2 mb-4">Your Stacks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stacks.map((stack, index) => (
            <motion.div
              key={stack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-kleen-mint" />
                    {stack.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <span className="text-sm text-kleen-gray">{stack.productCount} products</span>
                    <span className="text-sm text-kleen-gray">Created {stack.dateCreated}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stacks.length * 0.1 }}
          >
            <Card className="border-dashed border-2 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="bg-kleen-mint/10 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Plus className="h-6 w-6 text-kleen-mint" />
                  </div>
                  <p className="font-medium">Create New Stack</p>
                  <p className="text-sm text-kleen-gray mt-1">Organize your clean products</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <div>
        <h2 className="kleen-heading-h2 mb-4">Saved Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CleanStack;
