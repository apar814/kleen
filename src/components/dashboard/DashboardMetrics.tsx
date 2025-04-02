
import React from 'react';
import { Product } from '@/types/Product';

interface DashboardMetricsProps {
  cartItems: Product[];
  cleanAlternatives: Product[];
}

export const useDashboardMetrics = ({ cartItems, cleanAlternatives }: DashboardMetricsProps) => {
  // Calculate total cart score
  const avgCartScore = Math.round(
    cartItems.reduce((sum, item) => sum + (item.kleenScore || 0), 0) / cartItems.length
  );
  
  const avgAlternativeScore = Math.round(
    cleanAlternatives.reduce((sum, item) => sum + (item.kleenScore || 0), 0) / cleanAlternatives.length
  );
  
  const scoreImprovement = avgAlternativeScore - avgCartScore;
  const percentImprovement = Math.round((scoreImprovement / avgCartScore) * 100);

  return {
    avgCartScore,
    avgAlternativeScore,
    scoreImprovement,
    percentImprovement,
  };
};

export default useDashboardMetrics;
