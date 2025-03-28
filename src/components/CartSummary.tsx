
import React from 'react';
import { ShoppingCart, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import KleenScore from './KleenScore';
import { Button } from '@/components/ui/button';
import { Product } from './ProductCard';

interface CartSummaryProps {
  products: Product[];
  className?: string;
  onViewAll?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ 
  products, 
  className,
  onViewAll 
}) => {
  // Calculate average Kleen Score
  const averageScore = products.length > 0
    ? Math.round(products.reduce((sum, product) => sum + product.kleenScore, 0) / products.length)
    : 0;
    
  // Count high concern ingredients
  const highConcernCount = products.reduce((count, product) => {
    return count + product.ingredients.filter(ing => ing.toxicityLevel === 'high').length;
  }, 0);
  
  return (
    <div className={cn("bg-white rounded-xl shadow-sm p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShoppingCart className="w-5 h-5 text-kleen-teal" />
          <h2 className="ml-2 text-lg font-medium">Cart Summary</h2>
        </div>
        <div className="text-sm text-kleen-gray">{products.length} items</div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <KleenScore score={averageScore} size="md" />
        
        <div className="mt-6 md:mt-0 md:ml-6 flex-grow">
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <div className="text-sm font-medium">Products analyzed</div>
              <div className="font-medium">{products.length}</div>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <div className="text-sm font-medium">High concern ingredients</div>
              <div className="font-medium text-kleen-danger">{highConcernCount}</div>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <div className="text-sm font-medium">Improvement potential</div>
              <div className="flex items-center text-kleen-safe">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="font-medium">
                  {100 - averageScore > 0 ? `+${100 - averageScore}%` : 'Perfect!'}
                </span>
              </div>
            </div>
          </div>
          
          {onViewAll && (
            <Button 
              onClick={onViewAll}
              className="mt-4 w-full bg-kleen-teal hover:bg-kleen-teal-dark text-white"
            >
              View All Items
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
