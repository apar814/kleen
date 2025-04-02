
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Product } from '@/types/Product';
import { calculateProductMetrics } from '@/utils/metricsUtils';
import LoadingSkeleton from './LoadingSkeleton';

interface CartAnalysisCardProps {
  cartItems: Product[];
  isLoading?: boolean;
}

const CartAnalysisCard: React.FC<CartAnalysisCardProps> = ({ cartItems, isLoading = false }) => {
  if (isLoading) {
    return <LoadingSkeleton type="card" />;
  }

  const { totalProducts, cautionProducts, highRiskProducts } = calculateProductMetrics(cartItems);

  return (
    <motion.div
      custom={2}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
          }
        })
      }}
      initial="hidden"
      animate="visible"
    >
      <Card className="overflow-hidden border-kleen-sage/30">
        <CardHeader className="bg-gradient-to-r from-kleen-cream to-kleen-white pb-2">
          <CardTitle className="text-xl font-medium">Cart Analysis</CardTitle>
          <CardDescription>Product breakdown</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mt-2">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold">{totalProducts}</div>
                <div className="text-xs text-kleen-gray mt-1">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-500">
                  {cautionProducts}
                </div>
                <div className="text-xs text-kleen-gray mt-1">Caution</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-kleen-red">
                  {highRiskProducts}
                </div>
                <div className="text-xs text-kleen-gray mt-1">High Risk</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CartAnalysisCard;
