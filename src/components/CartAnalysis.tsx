
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ProductSwap from '@/components/ProductSwap';
import KleenScore from '@/components/KleenScore';
import { Product } from '@/components/ProductCard';

// Mock data for demonstration
const mockOriginalProduct: Product = {
  id: "1",
  name: "Generic Body Wash",
  brand: "Brand X",
  imageUrl: "https://placehold.co/400x400?text=Body+Wash",
  price: "$8.99",
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
  imageUrl: "https://placehold.co/400x400?text=Clean+Wash",
  price: "$10.99",
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

const CartAnalysis: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  
  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Cart Analysis</h1>
        <Button 
          onClick={handleAnalyzeClick} 
          disabled={isAnalyzing}
          className="bg-kleen-teal hover:bg-kleen-teal-dark"
        >
          <Search className="w-4 h-4 mr-2" />
          {isAnalyzing ? "Analyzing..." : "Analyze Cart"}
        </Button>
      </div>
      
      {!analyzed ? (
        <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-gray-500 mb-4 text-center">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-lg">
                {isAnalyzing ? "Analyzing your cart..." : "Click 'Analyze Cart' to check your Amazon cart for cleaner alternatives."}
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
          
          <div className="grid grid-cols-1 gap-6">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CartAnalysis;
