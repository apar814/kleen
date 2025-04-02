
import React, { useState, useEffect } from 'react';
import { cartItems, cleanAlternatives } from '@/data/mockData';
import { scoreImprovementData, toxicityBreakdown } from './dashboard/analyticsData';
import { useDashboardMetrics } from './dashboard/DashboardMetrics';
import CartHealthCard from './dashboard/CartHealthCard';
import ImprovementCard from './dashboard/ImprovementCard';
import CartAnalysisCard from './dashboard/CartAnalysisCard';
import ScoreImprovementChart from './dashboard/ScoreImprovementChart';
import ToxicityBreakdownChart from './dashboard/ToxicityBreakdownChart';
import ProductBreakdownTable from './dashboard/ProductBreakdownTable';

const AnalyticsDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { metrics, isLoading: metricsLoading } = useDashboardMetrics({ 
    cartItems, 
    cleanAlternatives,
    isLoading 
  });
  const { avgCartScore, avgAlternativeScore, scoreImprovement, percentImprovement } = metrics;

  // Simulate data loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <CartHealthCard 
          avgCartScore={avgCartScore} 
          scoreImprovement={scoreImprovement} 
          isLoading={isLoading || metricsLoading}
        />
        <ImprovementCard 
          avgAlternativeScore={avgAlternativeScore}
          percentImprovement={percentImprovement}
          isLoading={isLoading || metricsLoading}
        />
        <CartAnalysisCard 
          cartItems={cartItems}
          isLoading={isLoading || metricsLoading} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreImprovementChart 
          data={scoreImprovementData}
          isLoading={isLoading} 
        />
        <ToxicityBreakdownChart 
          data={toxicityBreakdown}
          isLoading={isLoading} 
        />
      </div>

      {/* Product Breakdown Table */}
      <ProductBreakdownTable 
        cartItems={cartItems}
        cleanAlternatives={cleanAlternatives}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AnalyticsDashboard;
