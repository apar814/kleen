
import { Product } from '@/types/Product';
import { calculateDashboardMetrics } from '@/utils/metricsUtils';
import { DashboardMetrics } from '@/types/AnalyticsTypes';

interface DashboardMetricsProps {
  cartItems: Product[];
  cleanAlternatives: Product[];
}

export const useDashboardMetrics = ({ cartItems, cleanAlternatives }: DashboardMetricsProps): DashboardMetrics => {
  return calculateDashboardMetrics(cartItems, cleanAlternatives);
};

export default useDashboardMetrics;
