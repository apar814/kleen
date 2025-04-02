
// Define types for all analytics data
export type CategoryScores = {
  name: string;
  original: number;
  improved: number;
  improvement: number;
};

export type ToxicityData = {
  name: string;
  value: number;
  color: string;
};

export type TrendData = {
  month: string;
  score: number;
};

export type DashboardMetrics = {
  avgCartScore: number;
  avgAlternativeScore: number;
  scoreImprovement: number;
  percentImprovement: number;
};

export type ProductMetrics = {
  totalProducts: number;
  cautionProducts: number;
  highRiskProducts: number;
};
