
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
    <div className={cn("kleen-card", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ShoppingCart className="w-5 h-5 text-kleen-mint" />
          <h2 className="ml-2 kleen-heading-h3">Cart Summary</h2>
        </div>
        <div className="text-label text-kleen-gray">{products.length} items</div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-between">
        <KleenScore score={averageScore} size="md" />
        
        <div className="mt-6 md:mt-0 md:ml-8 flex-grow">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-kleen-sage">
              <div className="text-label font-medium">Products analyzed</div>
              <div className="font-medium">{products.length}</div>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-kleen-sage">
              <div className="text-label font-medium">High concern ingredients</div>
              <div className="font-medium text-kleen-red">{highConcernCount}</div>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-kleen-sage">
              <div className="text-label font-medium">Improvement potential</div>
              <div className="flex items-center text-kleen-mint">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="font-medium">
                  {100 - averageScore > 0 ? `+${100 - averageScore}%` : 'Perfect!'}
                </span>
              </div>
            </div>
          </div>
          
          {onViewAll && (
            <button 
              onClick={onViewAll}
              className="kleen-btn-primary mt-6 w-full text-center"
            >
              View All Items
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
