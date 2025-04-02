
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Product } from '@/types/Product';
import ProductSwap from '@/components/ProductSwap';

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

interface ProductAnalysisTabProps {
  products: Product[];
}

const ProductAnalysisTab: React.FC<ProductAnalysisTabProps> = ({ products }) => {
  // In a real implementation, we would use the actual products from the cart
  // For now, we'll use the mock data for demonstration
  return (
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
  );
};

export default ProductAnalysisTab;
