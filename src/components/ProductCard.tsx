
import React from 'react';
import { Check, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface Ingredient {
  name: string;
  toxicityLevel: 'high' | 'medium' | 'low';
  description: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: string;
  kleenScore: number;
  ingredients: Ingredient[];
  alternativeProductId?: string;
}

interface ProductCardProps {
  product: Product;
  showAlternative?: boolean;
  className?: string;
  onViewAlternative?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAlternative = true,
  className,
  onViewAlternative
}) => {
  const toxicityIcons = {
    high: <X className="w-4 h-4 text-kleen-danger" />,
    medium: <AlertTriangle className="w-4 h-4 text-kleen-warning" />,
    low: <Check className="w-4 h-4 text-kleen-safe" />
  };

  const toxicityLabels = {
    high: 'High concern',
    medium: 'Medium concern',
    low: 'Low concern'
  };

  const toxicityClasses = {
    high: 'toxicity-pill toxicity-pill-high',
    medium: 'toxicity-pill toxicity-pill-medium',
    low: 'toxicity-pill toxicity-pill-low'
  };

  const handleViewAlternative = () => {
    if (onViewAlternative && product.alternativeProductId) {
      onViewAlternative(product.alternativeProductId);
    }
  };

  return (
    <div className={cn("product-card", className)}>
      <div className="flex p-4">
        <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="ml-4 flex-grow">
          <div className="text-sm text-kleen-gray">{product.brand}</div>
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <div className="mt-1 text-kleen-teal-dark font-semibold">{product.price}</div>
          
          <div className="mt-2 flex items-center">
            <div className="text-sm font-medium">Kleen Score:</div>
            <div 
              className={cn(
                "ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                product.kleenScore >= 70 ? "bg-kleen-safe/10 text-kleen-safe" :
                product.kleenScore >= 40 ? "bg-kleen-warning/10 text-kleen-warning" :
                "bg-kleen-danger/10 text-kleen-danger"
              )}
            >
              {product.kleenScore}/100
            </div>
          </div>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="border-t">
        <AccordionItem value="ingredients">
          <AccordionTrigger className="px-4 py-2 text-sm font-medium">
            Ingredient Analysis
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <ul className="space-y-3">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="text-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{ingredient.name}</div>
                    <div className={toxicityClasses[ingredient.toxicityLevel]}>
                      <div className="flex items-center">
                        {toxicityIcons[ingredient.toxicityLevel]}
                        <span className="ml-1">{toxicityLabels[ingredient.toxicityLevel]}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-1 text-kleen-gray">{ingredient.description}</p>
                </li>
              ))}
            </ul>
            
            {showAlternative && product.alternativeProductId && (
              <Button 
                variant="outline" 
                className="mt-4 w-full bg-kleen-teal/10 border-kleen-teal/20 text-kleen-teal-dark hover:bg-kleen-teal/20"
                onClick={handleViewAlternative}
              >
                View Cleaner Alternative
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductCard;
