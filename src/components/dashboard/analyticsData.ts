
import { CategoryScores, ToxicityData, TrendData } from '@/types/AnalyticsTypes';

// Analytics data for the dashboard
export const scoreImprovementData: CategoryScores[] = [
  { name: 'Face Care', original: 45, improved: 92, improvement: 47 },
  { name: 'Body Care', original: 55, improved: 88, improvement: 33 },
  { name: 'Skin Care', original: 30, improved: 95, improvement: 65 },
  { name: 'Hair Care', original: 52, improved: 86, improvement: 34 },
];

export const toxicityBreakdown: ToxicityData[] = [
  { name: 'High Toxicity', value: 15, color: '#D9534F' },
  { name: 'Medium Toxicity', value: 20, color: '#F59E0B' },
  { name: 'Low Toxicity', value: 65, color: '#7AE582' },
];

export const monthlyTrends: TrendData[] = [
  { month: 'Jan', score: 42 },
  { month: 'Feb', score: 48 },
  { month: 'Mar', score: 54 },
  { month: 'Apr', score: 59 },
  { month: 'May', score: 65 },
  { month: 'Jun', score: 73 },
  { month: 'Jul', score: 82 },
];
