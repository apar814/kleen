
/**
 * Map numeric risk levels (1-5) to toxicity levels used in the UI
 */
export const mapRiskToToxicity = (riskLevel: number): 'low' | 'medium' | 'high' => {
  if (riskLevel <= 2) return 'low';
  if (riskLevel <= 4) return 'medium';
  return 'high';
};

/**
 * Map toxicity levels to numeric risk levels (1-5)
 */
export const mapToxicityToRisk = (toxicity: 'low' | 'medium' | 'high'): number => {
  switch (toxicity) {
    case 'low': return 1;
    case 'medium': return 3;
    case 'high': return 5;
    default: return 3;
  }
};

/**
 * Get color classes based on toxicity level
 */
export const getToxicityColorClasses = (toxicity: 'low' | 'medium' | 'high') => {
  switch (toxicity) {
    case 'low':
      return 'text-kleen-mint bg-kleen-mint/10 border-kleen-mint/20';
    case 'medium':
      return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    case 'high':
      return 'text-kleen-red bg-kleen-red/10 border-kleen-red/20';
    default:
      return 'text-gray-500 bg-gray-100 border-gray-200';
  }
};
