import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from './ProductCard';
import KleenScore from './KleenScore';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/Product';

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
  
  const scoreDifference = (alternativeProduct.kleenScore ?? alternativeProduct.cleanScore) - 
                         (originalProduct.kleenScore ?? originalProduct.cleanScore);
  
  return (
    <div className={cn("relative", className)}>
      <motion.div 
        className="relative overflow-hidden rounded-lg shadow-kleen-card" 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        style={{ minHeight: '300px' }}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={showAlternative ? "alternative" : "original"}
            initial={{ opacity: 0, x: showAlternative ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: showAlternative ? 50 : -50 }}
            transition={{ duration: 0.4 }}
            className="p-1"
          >
            {showAlternative ? (
              <ProductCard product={alternativeProduct} showAlternative={false} />
            ) : (
              <ProductCard product={originalProduct} showAlternative={false} />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      <motion.button
        onClick={toggleView}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-kleen-white rounded-full p-3 shadow-kleen-card hover:shadow-kleen-hover transition-all duration-200"
        whileHover={{ scale: 1.1, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: showAlternative ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="w-5 h-5 text-kleen-mint" />
        </motion.div>
      </motion.button>
      
      <motion.div 
        className="mt-4 flex justify-center items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.div 
          className="text-center bg-kleen-mint/10 px-4 py-2 rounded-lg"
          animate={{ 
            backgroundColor: showAlternative ? 'rgba(122, 229, 130, 0.15)' : 'rgba(122, 229, 130, 0.1)',
            boxShadow: showAlternative ? '0 4px 12px rgba(122, 229, 130, 0.2)' : '0 0 0 rgba(0,0,0,0)'
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-label font-medium text-kleen-mint">
            {showAlternative ? "Cleaner Alternative" : "Original Product"}
          </div>
          
          <AnimatePresence>
            {showAlternative && scoreDifference > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-kleen-mint mt-1"
              >
                +{scoreDifference} Kleen Score improvement
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductSwap;
