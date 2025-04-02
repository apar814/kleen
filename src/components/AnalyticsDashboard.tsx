
import React from 'react';
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
  const { avgCartScore, avgAlternativeScore, scoreImprovement, percentImprovement } = 
    useDashboardMetrics({ cartItems, cleanAlternatives });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <CartHealthCard 
          avgCartScore={avgCartScore} 
          scoreImprovement={scoreImprovement} 
        />
        <ImprovementCard 
          avgAlternativeScore={avgAlternativeScore}
          percentImprovement={percentImprovement}
        />
        <CartAnalysisCard cartItems={cartItems} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreImprovementChart data={scoreImprovementData} />
        <ToxicityBreakdownChart data={toxicityBreakdown} />
      </div>

      {/* Product Breakdown Table */}
      <ProductBreakdownTable 
        cartItems={cartItems}
        cleanAlternatives={cleanAlternatives}
      />
    </div>
  );
};

export default AnalyticsDashboard;
