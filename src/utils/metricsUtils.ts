
import { Product } from '@/types/Product';
import { DashboardMetrics, ProductMetrics } from '@/types/AnalyticsTypes';

/**
 * Calculate dashboard metrics based on cart items and clean alternatives
 */
export const calculateDashboardMetrics = (cartItems: Product[], cleanAlternatives: Product[]): DashboardMetrics => {
  if (cartItems.length === 0) {
    return {
      avgCartScore: 0,
      avgAlternativeScore: 0,
      scoreImprovement: 0,
      percentImprovement: 0,
    };
  }

  // Calculate total cart score
  const avgCartScore = Math.round(
    cartItems.reduce((sum, item) => sum + (item.kleenScore || 0), 0) / cartItems.length
  );
  
  const avgAlternativeScore = cleanAlternatives.length > 0 
    ? Math.round(
        cleanAlternatives.reduce((sum, item) => sum + (item.kleenScore || 0), 0) / cleanAlternatives.length
      )
    : 0;
  
  const scoreImprovement = avgAlternativeScore - avgCartScore;
  const percentImprovement = avgCartScore > 0 
    ? Math.round((scoreImprovement / avgCartScore) * 100) 
    : 0;

  return {
    avgCartScore,
    avgAlternativeScore,
    scoreImprovement,
    percentImprovement,
  };
};

/**
 * Calculate product metrics for analysis
 */
export const calculateProductMetrics = (products: Product[]): ProductMetrics => {
  return {
    totalProducts: products.length,
    cautionProducts: products.filter(p => p.kleenScore < 70 && p.kleenScore >= 40).length,
    highRiskProducts: products.filter(p => p.kleenScore < 40).length,
  };
};

/**
 * Get toxicity level based on score
 */
export const getToxicityLevel = (score: number): 'high' | 'medium' | 'low' => {
  if (score < 40) return 'high';
  if (score < 70) return 'medium';
  return 'low';
};

/**
 * Get color based on toxicity level
 */
export const getToxicityColor = (level: 'high' | 'medium' | 'low'): string => {
  switch (level) {
    case 'high': return '#D9534F'; // kleen-red
    case 'medium': return '#F59E0B'; // yellow-500
    case 'low': return '#7AE582'; // kleen-mint
    default: return '#7AE582';
  }
};
