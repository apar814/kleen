
import { Product } from '@/types/Product';
import { calculateDashboardMetrics } from '@/utils/metricsUtils';
import { DashboardMetrics } from '@/types/AnalyticsTypes';
import { useState, useEffect } from 'react';

interface DashboardMetricsProps {
  cartItems: Product[];
  cleanAlternatives: Product[];
  isLoading?: boolean;
}

export const useDashboardMetrics = ({ 
  cartItems, 
  cleanAlternatives, 
  isLoading = false 
}: DashboardMetricsProps): { 
  metrics: DashboardMetrics; 
  isLoading: boolean; 
} => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    avgCartScore: 0,
    avgAlternativeScore: 0,
    scoreImprovement: 0,
    percentImprovement: 0
  });
  
  useEffect(() => {
    if (!isLoading && cartItems.length > 0) {
      const calculatedMetrics = calculateDashboardMetrics(cartItems, cleanAlternatives);
      setMetrics(calculatedMetrics);
    }
  }, [cartItems, cleanAlternatives, isLoading]);

  return { metrics, isLoading };
};

export default useDashboardMetrics;
