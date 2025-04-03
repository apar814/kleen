
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FileUp } from "lucide-react";
import { Product } from '@/types/Product';
import { useToast } from '@/components/ui/use-toast';
import ImportCartModal from './cart/ImportCartModal';
import EmptyCartState from './cart/EmptyCartState';
import CartAnalysisResults from './cart/CartAnalysisResults';
import CartOptimizationPanel from './cart/CartOptimizationPanel';

const CartAnalysis: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importedProducts, setImportedProducts] = useState<Product[]>([]);
  const [optimizedProducts, setOptimizedProducts] = useState<Product[]>([]);
  const [showOptimized, setShowOptimized] = useState(false);
  const { toast } = useToast();
  
  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const handleCartImport = (products: Product[]) => {
    setImportedProducts(products);
    setImportModalOpen(false);
    
    // Analyze the imported products
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };
  
  const handleOptimize = (preferences: {
    budget: number;
    priorityFactors: string[];
    dietaryPreferences: string[];
  }) => {
    setIsOptimizing(true);
    
    // In a real app, this would call the optimize cart service
    // For now, we'll simulate optimization with a delay
    setTimeout(() => {
      // Create mock optimized products
      const optimized = importedProducts.map(product => {
        // Create a slightly modified version with better score
        return {
          ...product,
          id: `opt-${product.id}`,
          kleenScore: Math.min(100, ((product.kleenScore || product.cleanScore) || 50) + 15),
          name: `${product.name} (Cleaner Alternative)`,
        };
      });
      
      setOptimizedProducts(optimized);
      setShowOptimized(true);
      setIsOptimizing(false);
      
      toast({
        title: "Cart Optimized",
        description: `We've found cleaner alternatives based on your preferences.`,
      });
    }, 3000);
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
        <ImportCartModal 
          onImport={handleCartImport} 
          onClose={() => setImportModalOpen(false)}
        />
      )}
      
      {!analyzed ? (
        <EmptyCartState isAnalyzing={isAnalyzing} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CartAnalysisResults 
              products={showOptimized ? optimizedProducts : importedProducts} 
            />
          </div>
          <div>
            <CartOptimizationPanel
              products={importedProducts}
              onOptimize={handleOptimize}
              isOptimizing={isOptimizing}
            />
            
            {showOptimized && (
              <Button
                variant="outline" 
                onClick={() => setShowOptimized(!showOptimized)}
                className="mt-4 w-full"
              >
                Show {showOptimized ? 'Original' : 'Optimized'} Cart
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartAnalysis;
