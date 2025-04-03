
import { Product } from '@/types/Product';
import { ToxicIngredient, UserProfile } from '@/types/ToxicIngredients';

// Scoring weights
const WEIGHTS = {
  TOXICITY: 0.5,
  BUDGET: 0.3,
  DIETARY: 0.2
};

interface CartOptimizationParams {
  products: Product[];
  userProfile?: UserProfile;
  budgetConstraint?: number;
  prioritizeToxicity?: boolean;
}

interface OptimizationResult {
  originalProducts: Product[];
  recommendedSwaps: Product[];
  totalSavings: number;
  healthScoreImprovement: number;
  dietaryAlignmentScore: number;
}

// Calculate toxicity score based on flagged ingredients
const calculateToxicityScore = (product: Product, toxicDatabase: ToxicIngredient[]): number => {
  if (!product.ingredients || product.ingredients.length === 0) {
    return 50; // Default moderate score if no ingredient data
  }
  
  // For ingredients that are objects with toxicityLevel
  if (typeof product.ingredients[0] !== 'string') {
    const ingredients = product.ingredients as { 
      name: string; 
      toxicityLevel: 'high' | 'medium' | 'low';
      description: string; 
    }[];
    
    const toxicityScores = {
      'high': 10,
      'medium': 5,
      'low': 0
    };
    
    const totalScore = ingredients.reduce((score, ingredient) => {
      return score + toxicityScores[ingredient.toxicityLevel];
    }, 0);
    
    // Normalize to 0-100 scale (lower is better)
    return 100 - Math.min(100, (totalScore / ingredients.length) * 10);
  }
  
  // For string ingredients, check against toxic database
  const stringIngredients = product.ingredients as string[];
  
  // Count how many ingredients are in the toxic database
  let toxicCount = 0;
  let totalRiskScore = 0;
  
  stringIngredients.forEach(ingredient => {
    const matchedToxic = toxicDatabase.find(toxicItem => 
      toxicItem.name.toLowerCase() === ingredient.toLowerCase() || 
      toxicItem.aliases?.some(alias => alias.toLowerCase() === ingredient.toLowerCase())
    );
    
    if (matchedToxic) {
      toxicCount++;
      totalRiskScore += matchedToxic.risk_level;
    }
  });
  
  if (toxicCount === 0) return 100; // Perfect score if no toxic ingredients
  
  // Calculate score based on number and risk level of toxic ingredients
  const rawScore = 100 - ((totalRiskScore / (toxicCount * 5)) * 100);
  return Math.max(0, Math.min(100, rawScore));
};

// Calculate budget score (higher is better - more savings)
const calculateBudgetScore = (originalPrice: number, swapPrice: number): number => {
  if (swapPrice >= originalPrice) return 0; // No savings
  
  const savingsPercent = ((originalPrice - swapPrice) / originalPrice) * 100;
  return Math.min(100, savingsPercent * 2); // Scale savings (50% savings = 100 score)
};

// Calculate dietary alignment score
const calculateDietaryScore = (product: Product, userProfile?: UserProfile): number => {
  if (!userProfile || !userProfile.dietaryNeeds || userProfile.dietaryNeeds.length === 0) {
    return 50; // Neutral score if no dietary preferences
  }
  
  // Mock implementation - in a real app, this would check ingredients against dietary restrictions
  // For now, return a random score between 40-100
  return 40 + Math.floor(Math.random() * 60);
};

// Find the best swap for a product based on weighted scoring
const findBestSwap = (
  product: Product, 
  alternativeProducts: Product[], 
  toxicDatabase: ToxicIngredient[],
  userProfile?: UserProfile
): Product | null => {
  if (!alternativeProducts || alternativeProducts.length === 0) return null;
  
  let bestScore = 0;
  let bestSwap: Product | null = null;
  
  for (const alternative of alternativeProducts) {
    const toxicityScore = calculateToxicityScore(alternative, toxicDatabase);
    
    // Calculate budget score if prices are available
    let budgetScore = 50; // Default neutral score
    if (typeof product.price === 'number' && typeof alternative.price === 'number') {
      budgetScore = calculateBudgetScore(product.price, alternative.price);
    }
    
    const dietaryScore = calculateDietaryScore(alternative, userProfile);
    
    // Calculate weighted overall score
    const overallScore = (
      toxicityScore * WEIGHTS.TOXICITY + 
      budgetScore * WEIGHTS.BUDGET + 
      dietaryScore * WEIGHTS.DIETARY
    );
    
    if (overallScore > bestScore) {
      bestScore = overallScore;
      bestSwap = alternative;
    }
  }
  
  return bestSwap;
};

// Main optimization function
export const optimizeCart = async (
  params: CartOptimizationParams,
  toxicDatabase: ToxicIngredient[],
  availableAlternatives: Product[]
): Promise<OptimizationResult> => {
  const { products, userProfile, budgetConstraint, prioritizeToxicity } = params;
  
  // Customize weights if prioritizing toxicity
  const weights = { ...WEIGHTS };
  if (prioritizeToxicity) {
    weights.TOXICITY = 0.7;
    weights.BUDGET = 0.2;
    weights.DIETARY = 0.1;
  }
  
  // Track metrics for overall optimization
  let totalOriginalPrice = 0;
  let totalSwapPrice = 0;
  let totalOriginalHealthScore = 0;
  let totalSwapHealthScore = 0;
  let totalDietaryScore = 0;
  
  // Find best swaps for each product
  const recommendedSwaps = products.map(product => {
    // Calculate original metrics
    const originalHealthScore = calculateToxicityScore(product, toxicDatabase);
    totalOriginalHealthScore += originalHealthScore;
    
    if (typeof product.price === 'number') {
      totalOriginalPrice += product.price;
    }
    
    // Find best swap based on weighted scoring
    const bestSwap = findBestSwap(
      product, 
      availableAlternatives.filter(p => p.category === product.category), 
      toxicDatabase,
      userProfile
    );
    
    // Update swap metrics
    if (bestSwap) {
      const swapHealthScore = calculateToxicityScore(bestSwap, toxicDatabase);
      totalSwapHealthScore += swapHealthScore;
      
      if (typeof bestSwap.price === 'number') {
        totalSwapPrice += bestSwap.price;
      }
      
      const dietaryScore = calculateDietaryScore(bestSwap, userProfile);
      totalDietaryScore += dietaryScore;
      
      return bestSwap;
    }
    
    // If no swap found, return the original product
    totalSwapHealthScore += originalHealthScore;
    if (typeof product.price === 'number') {
      totalSwapPrice += product.price;
    }
    totalDietaryScore += calculateDietaryScore(product, userProfile);
    
    return product;
  });
  
  // Calculate overall improvement metrics
  const healthScoreImprovement = Math.max(0, (totalSwapHealthScore - totalOriginalHealthScore) / products.length);
  const totalSavings = Math.max(0, totalOriginalPrice - totalSwapPrice);
  const dietaryAlignmentScore = totalDietaryScore / products.length;
  
  return {
    originalProducts: products,
    recommendedSwaps,
    totalSavings,
    healthScoreImprovement,
    dietaryAlignmentScore
  };
};

// Function to optimize cart based on specific dietary preferences
export const optimizeCartForDiet = async (
  products: Product[],
  dietaryPreferences: string[],
  toxicDatabase: ToxicIngredient[],
  availableAlternatives: Product[]
): Promise<OptimizationResult> => {
  // Create a mock user profile with the requested dietary preferences
  const mockProfile: UserProfile = {
    email: 'temp@example.com',
    healthGoals: [],
    values: [],
    dietaryNeeds: dietaryPreferences,
    createdAt: new Date()
  };
  
  return optimizeCart(
    { 
      products, 
      userProfile: mockProfile,
      prioritizeToxicity: false
    },
    toxicDatabase,
    availableAlternatives
  );
};

// Function to optimize cart while prioritizing budget
export const optimizeCartForBudget = async (
  products: Product[],
  maxBudget: number,
  toxicDatabase: ToxicIngredient[],
  availableAlternatives: Product[]
): Promise<OptimizationResult> => {
  // Customize weights to prioritize budget
  const customWeights = { ...WEIGHTS, BUDGET: 0.6, TOXICITY: 0.3, DIETARY: 0.1 };
  
  const result = await optimizeCart(
    { 
      products, 
      budgetConstraint: maxBudget,
      prioritizeToxicity: false
    },
    toxicDatabase,
    availableAlternatives
  );
  
  // Additional budget optimization logic could be added here
  
  return result;
};
