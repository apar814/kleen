
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard, { Product } from './ProductCard';
import KleenScore from './KleenScore';

interface ProductSwapProps {
  originalProduct: Product;
  alternativeProduct: Product;
  className?: string;
}

const ProductSwap: React.FC<ProductSwapProps> = ({ 
  originalProduct, 
  alternativeProduct,
  className 
}) => {
  const [showAlternative, setShowAlternative] = useState(false);
  
  const toggleView = () => {
    setShowAlternative(!showAlternative);
  };
  
  const scoreDifference = alternativeProduct.kleenScore - originalProduct.kleenScore;
  
  return (
    <div className={cn("relative", className)}>
      <div className="relative overflow-hidden rounded-xl" style={{ minHeight: '300px' }}>
        <div 
          className="flex transition-transform duration-500 ease-in-out transform"
          style={{ 
            width: '200%', 
            transform: showAlternative ? 'translateX(-50%)' : 'translateX(0)' 
          }}
        >
          <div className="w-1/2 p-1">
            <ProductCard 
              product={originalProduct} 
              showAlternative={false}
            />
          </div>
          <div className="w-1/2 p-1">
            <ProductCard 
              product={alternativeProduct} 
              showAlternative={false}
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={toggleView}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all"
      >
        <ArrowRight className={cn(
          "w-5 h-5 text-kleen-teal transition-transform duration-300",
          showAlternative ? "rotate-180" : ""
        )} />
      </button>
      
      <div className="mt-4 flex justify-center items-center">
        <div className="text-center bg-kleen-teal/10 px-4 py-2 rounded-lg">
          <div className="text-sm font-medium text-kleen-teal-dark">
            {showAlternative ? "Cleaner Alternative" : "Original Product"}
          </div>
          
          {showAlternative && scoreDifference > 0 && (
            <div className="text-xs text-kleen-safe mt-1">
              +{scoreDifference} Kleen Score improvement
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSwap;
