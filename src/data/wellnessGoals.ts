import React from 'react';

export interface WellnessGoal {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string; // lucide icon name
}

export const goalCategories = [
  'All',
  'Weight & Body Composition',
  'Mental Health & Mood',
  'Sleep & Recovery',
  'Energy & Performance',
  'Gut & Digestion',
  'Longevity & Anti-Aging',
  'Biohacking & Optimization',
  'Pain & Inflammation',
  'Skin, Hair & Beauty',
  'Hormones & Fertility',
  'Heart & Metabolic Health',
  'Immune & Detox',
  'Kids & Family',
] as const;

export type GoalCategory = (typeof goalCategories)[number];

export const wellnessGoals: WellnessGoal[] = [
  // Weight & Body Composition
  { id: 'weight-loss', name: 'Weight Loss', description: 'Sustainable fat loss with clean supplements and appetite support', category: 'Weight & Body Composition', icon: 'TrendingDown' },
  { id: 'muscle-building', name: 'Muscle Building', description: 'Clean protein and performance supplements without fillers', category: 'Weight & Body Composition', icon: 'Dumbbell' },
  { id: 'lean-body', name: 'Lean Body Recomp', description: 'Lose fat and build muscle simultaneously', category: 'Weight & Body Composition', icon: 'Activity' },
  { id: 'appetite-control', name: 'Appetite Control', description: 'Natural hunger management and satiety support', category: 'Weight & Body Composition', icon: 'Utensils' },
  { id: 'metabolism-boost', name: 'Metabolism Boost', description: 'Speed up metabolic rate naturally', category: 'Weight & Body Composition', icon: 'Flame' },
  { id: 'healthy-weight-gain', name: 'Healthy Weight Gain', description: 'Gain weight in a clean, nutritious way', category: 'Weight & Body Composition', icon: 'TrendingUp' },

  // Mental Health & Mood
  { id: 'anxiety-relief', name: 'Anxiety Relief', description: 'Natural calming support for anxious feelings', category: 'Mental Health & Mood', icon: 'CloudRain' },
  { id: 'depression-support', name: 'Mood Elevation', description: 'Nutritional support for low mood and motivation', category: 'Mental Health & Mood', icon: 'Sun' },
  { id: 'stress-management', name: 'Stress Management', description: 'Adaptogens and nutrients to manage daily stress', category: 'Mental Health & Mood', icon: 'Wind' },
  { id: 'emotional-balance', name: 'Emotional Balance', description: 'Stabilize mood swings naturally', category: 'Mental Health & Mood', icon: 'Scale' },
  { id: 'confidence-self-esteem', name: 'Confidence & Self-Esteem', description: 'Nutrients that support positive mental outlook', category: 'Mental Health & Mood', icon: 'Crown' },
  { id: 'social-anxiety', name: 'Social Ease', description: 'Support for social comfort and calm interactions', category: 'Mental Health & Mood', icon: 'Users' },

  // Sleep & Recovery
  { id: 'fall-asleep', name: 'Fall Asleep Faster', description: 'Natural sleep onset support without grogginess', category: 'Sleep & Recovery', icon: 'Moon' },
  { id: 'deep-sleep', name: 'Deep Sleep Quality', description: 'Improve restorative deep sleep stages', category: 'Sleep & Recovery', icon: 'BedDouble' },
  { id: 'sleep-consistency', name: 'Sleep Consistency', description: 'Regulate circadian rhythm for steady sleep patterns', category: 'Sleep & Recovery', icon: 'Clock' },
  { id: 'post-workout-recovery', name: 'Post-Workout Recovery', description: 'Speed up muscle repair without harmful additives', category: 'Sleep & Recovery', icon: 'Zap' },
  { id: 'jet-lag', name: 'Jet Lag Recovery', description: 'Reset your body clock when traveling', category: 'Sleep & Recovery', icon: 'Plane' },
  { id: 'insomnia', name: 'Insomnia Support', description: 'Long-term sleep issue management with clean ingredients', category: 'Sleep & Recovery', icon: 'EyeOff' },

  // Energy & Performance
  { id: 'daily-energy', name: 'Daily Energy', description: 'Sustained energy without crashes or jitters', category: 'Energy & Performance', icon: 'Battery' },
  { id: 'focus-cognition', name: 'Focus & Cognition', description: 'Clean nootropics for mental clarity and concentration', category: 'Energy & Performance', icon: 'Brain' },
  { id: 'endurance', name: 'Endurance & Stamina', description: 'Boost cardiovascular and muscular endurance', category: 'Energy & Performance', icon: 'Footprints' },
  { id: 'pre-workout', name: 'Pre-Workout Boost', description: 'Clean energy for training without artificial stimulants', category: 'Energy & Performance', icon: 'Zap' },
  { id: 'memory-recall', name: 'Memory & Recall', description: 'Support long and short-term memory function', category: 'Energy & Performance', icon: 'Lightbulb' },
  { id: 'creativity', name: 'Creative Flow', description: 'Nutrients that support creative thinking and flow states', category: 'Energy & Performance', icon: 'Sparkles' },
  { id: 'productivity', name: 'Productivity', description: 'Stay on task with sustained mental performance', category: 'Energy & Performance', icon: 'Target' },

  // Gut & Digestion
  { id: 'gut-health', name: 'Gut Health', description: 'Support microbiome diversity with clean probiotics', category: 'Gut & Digestion', icon: 'Heart' },
  { id: 'bloating-relief', name: 'Bloating Relief', description: 'Reduce bloating and digestive discomfort', category: 'Gut & Digestion', icon: 'CircleDot' },
  { id: 'food-sensitivities', name: 'Food Sensitivities', description: 'Support for managing food intolerances', category: 'Gut & Digestion', icon: 'AlertTriangle' },
  { id: 'ibs-support', name: 'IBS Support', description: 'Gentle digestive support for irritable bowel', category: 'Gut & Digestion', icon: 'ShieldAlert' },
  { id: 'leaky-gut', name: 'Gut Lining Repair', description: 'Support intestinal barrier integrity', category: 'Gut & Digestion', icon: 'Shield' },
  { id: 'regularity', name: 'Digestive Regularity', description: 'Promote healthy bowel movements naturally', category: 'Gut & Digestion', icon: 'RefreshCw' },

  // Longevity & Anti-Aging
  { id: 'longevity', name: 'Longevity', description: 'Evidence-based supplements for healthy aging', category: 'Longevity & Anti-Aging', icon: 'Infinity' },
  { id: 'cellular-health', name: 'Cellular Health', description: 'Support mitochondria and cellular repair (NAD+, NMN)', category: 'Longevity & Anti-Aging', icon: 'Atom' },
  { id: 'anti-aging', name: 'Anti-Aging', description: 'Slow biological aging with clean interventions', category: 'Longevity & Anti-Aging', icon: 'Hourglass' },
  { id: 'telomere-support', name: 'Telomere Support', description: 'Protect DNA telomere length for longevity', category: 'Longevity & Anti-Aging', icon: 'Dna' },
  { id: 'autophagy', name: 'Autophagy Support', description: 'Enhance cellular cleanup and renewal processes', category: 'Longevity & Anti-Aging', icon: 'Recycle' },
  { id: 'brain-aging', name: 'Brain Anti-Aging', description: 'Protect cognitive function as you age', category: 'Longevity & Anti-Aging', icon: 'Brain' },

  // Biohacking & Optimization
  { id: 'cold-exposure', name: 'Cold Exposure Support', description: 'Optimize cold plunge and cold therapy benefits', category: 'Biohacking & Optimization', icon: 'Snowflake' },
  { id: 'fasting-support', name: 'Fasting Support', description: 'Clean electrolytes and nutrients during intermittent fasting', category: 'Biohacking & Optimization', icon: 'Timer' },
  { id: 'nootropics', name: 'Nootropic Stacking', description: 'Cognitive enhancement with clean smart drugs', category: 'Biohacking & Optimization', icon: 'Cpu' },
  { id: 'hrv-optimization', name: 'HRV Optimization', description: 'Improve heart rate variability and resilience', category: 'Biohacking & Optimization', icon: 'HeartPulse' },
  { id: 'blood-sugar', name: 'Blood Sugar Optimization', description: 'Stabilize glucose for steady energy and health', category: 'Biohacking & Optimization', icon: 'LineChart' },
  { id: 'oxygen-performance', name: 'Oxygen Performance', description: 'Enhance VO2 max and oxygen utilization', category: 'Biohacking & Optimization', icon: 'Wind' },
  { id: 'genetic-optimization', name: 'Genetic Optimization', description: 'Supplements based on your genetic profile', category: 'Biohacking & Optimization', icon: 'Dna' },

  // Pain & Inflammation
  { id: 'chronic-pain', name: 'Chronic Pain Relief', description: 'Natural alternatives for ongoing pain management', category: 'Pain & Inflammation', icon: 'Crosshair' },
  { id: 'joint-health', name: 'Joint Health', description: 'Support joint mobility and reduce stiffness', category: 'Pain & Inflammation', icon: 'Bone' },
  { id: 'inflammation', name: 'Reduce Inflammation', description: 'Anti-inflammatory nutrients and supplements', category: 'Pain & Inflammation', icon: 'Flame' },
  { id: 'migraine-relief', name: 'Migraine Relief', description: 'Natural headache and migraine prevention', category: 'Pain & Inflammation', icon: 'Frown' },
  { id: 'back-pain', name: 'Back Pain Support', description: 'Nutrients for spinal and muscular comfort', category: 'Pain & Inflammation', icon: 'PersonStanding' },
  { id: 'nerve-pain', name: 'Nerve Pain', description: 'Neuropathy support with clean supplements', category: 'Pain & Inflammation', icon: 'Zap' },

  // Skin, Hair & Beauty
  { id: 'clear-skin', name: 'Clear Skin', description: 'Reduce acne and support skin clarity from within', category: 'Skin, Hair & Beauty', icon: 'Sparkles' },
  { id: 'anti-aging-skin', name: 'Youthful Skin', description: 'Collagen and antioxidants for skin elasticity', category: 'Skin, Hair & Beauty', icon: 'Smile' },
  { id: 'hair-growth', name: 'Hair Growth', description: 'Support thicker, healthier hair naturally', category: 'Skin, Hair & Beauty', icon: 'Scissors' },
  { id: 'nail-strength', name: 'Nail Strength', description: 'Biotin and minerals for strong nails', category: 'Skin, Hair & Beauty', icon: 'Hand' },
  { id: 'eczema-psoriasis', name: 'Eczema & Psoriasis', description: 'Soothe inflammatory skin conditions naturally', category: 'Skin, Hair & Beauty', icon: 'ShieldAlert' },
  { id: 'sun-protection', name: 'Sun & UV Protection', description: 'Internal antioxidant support for sun exposure', category: 'Skin, Hair & Beauty', icon: 'Sun' },

  // Hormones & Fertility
  { id: 'testosterone', name: 'Testosterone Support', description: 'Natural T-level optimization for men', category: 'Hormones & Fertility', icon: 'TrendingUp' },
  { id: 'estrogen-balance', name: 'Estrogen Balance', description: 'Support healthy estrogen metabolism for women', category: 'Hormones & Fertility', icon: 'Scale' },
  { id: 'fertility-female', name: 'Female Fertility', description: 'Preconception nutrition for egg quality', category: 'Hormones & Fertility', icon: 'Heart' },
  { id: 'fertility-male', name: 'Male Fertility', description: 'Sperm health and reproductive support', category: 'Hormones & Fertility', icon: 'Shield' },
  { id: 'menopause', name: 'Menopause Support', description: 'Manage hot flashes, mood, and bone health', category: 'Hormones & Fertility', icon: 'Thermometer' },
  { id: 'pcos', name: 'PCOS Management', description: 'Nutritional support for polycystic ovary syndrome', category: 'Hormones & Fertility', icon: 'CircleDot' },
  { id: 'thyroid', name: 'Thyroid Health', description: 'Support optimal thyroid function naturally', category: 'Hormones & Fertility', icon: 'Activity' },
  { id: 'prenatal', name: 'Prenatal Nutrition', description: 'Clean prenatal vitamins without harmful additives', category: 'Hormones & Fertility', icon: 'Baby' },

  // Heart & Metabolic Health
  { id: 'heart-health', name: 'Heart Health', description: 'Support cardiovascular function with clean omega-3s', category: 'Heart & Metabolic Health', icon: 'Heart' },
  { id: 'cholesterol', name: 'Cholesterol Management', description: 'Natural lipid support without statins', category: 'Heart & Metabolic Health', icon: 'BarChart' },
  { id: 'blood-pressure', name: 'Blood Pressure', description: 'Natural blood pressure regulation', category: 'Heart & Metabolic Health', icon: 'Gauge' },
  { id: 'diabetes-prevention', name: 'Diabetes Prevention', description: 'Blood sugar and insulin sensitivity support', category: 'Heart & Metabolic Health', icon: 'ShieldCheck' },
  { id: 'circulation', name: 'Circulation', description: 'Improve blood flow and vascular health', category: 'Heart & Metabolic Health', icon: 'ArrowUpCircle' },

  // Immune & Detox
  { id: 'immunity', name: 'Immune Strength', description: 'Build robust immune defense naturally', category: 'Immune & Detox', icon: 'Shield' },
  { id: 'allergy-relief', name: 'Allergy Relief', description: 'Natural antihistamine and allergy support', category: 'Immune & Detox', icon: 'Flower' },
  { id: 'detox', name: 'Gentle Detox', description: 'Support liver and kidney detoxification pathways', category: 'Immune & Detox', icon: 'Droplets' },
  { id: 'heavy-metals', name: 'Heavy Metal Detox', description: 'Chelation support and toxin binding', category: 'Immune & Detox', icon: 'AlertOctagon' },
  { id: 'cold-flu', name: 'Cold & Flu Defense', description: 'Rapid immune response support', category: 'Immune & Detox', icon: 'Thermometer' },
  { id: 'autoimmune', name: 'Autoimmune Support', description: 'Immune modulation for autoimmune conditions', category: 'Immune & Detox', icon: 'ShieldAlert' },

  // Kids & Family
  { id: 'baby-safe', name: 'Baby Safe Products', description: 'Products verified safe for infants', category: 'Kids & Family', icon: 'Baby' },
  { id: 'kids-nutrition', name: 'Kids Nutrition', description: 'Clean vitamins and supplements for children', category: 'Kids & Family', icon: 'Apple' },
  { id: 'adhd-focus-kids', name: 'Kids Focus & ADHD', description: 'Natural attention support for children', category: 'Kids & Family', icon: 'Brain' },
  { id: 'teen-wellness', name: 'Teen Wellness', description: 'Age-appropriate supplements for teenagers', category: 'Kids & Family', icon: 'Users' },
  { id: 'pregnancy-safe', name: 'Pregnancy Safe', description: 'Verified safe products during pregnancy', category: 'Kids & Family', icon: 'Heart' },
];
