
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen } from "lucide-react";
import { Product } from '@/types/Product';
import ProductAnalysisTab from './ProductAnalysisTab';
import HealthScoreOverview from '@/components/HealthScoreOverview';
import ToxinEducation from '@/components/ToxinEducation';
import KleenScore from '@/components/KleenScore';
import { motion } from 'framer-motion';

interface CartAnalysisResultsProps {
  products: Product[];
}

const CartAnalysisResults: React.FC<CartAnalysisResultsProps> = ({ products }) => {
  // Calculate average Kleen Score
  const averageScore = products.length > 0
    ? Math.round(products.reduce((sum, product) => sum + (product.kleenScore || product.cleanScore), 0) / products.length)
    : 0;
    
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium text-gray-900">Your Cart Results</h2>
          <p className="text-gray-500">We found {products.length} products that could be cleaner.</p>
        </div>
        <KleenScore score={averageScore} size="md" />
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
            <ProductAnalysisTab products={products} />
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
  );
};

export default CartAnalysisResults;
