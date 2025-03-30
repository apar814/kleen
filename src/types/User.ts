
export type UserValues = 
  | 'vegan'
  | 'cruelty-free'
  | 'pregnancy-safe'
  | 'paraben-free'
  | 'fragrance-free'
  | 'non-toxic'
  | 'organic'
  | 'eco-friendly'
  | 'budget-friendly';

export type HealthGoals =
  | 'reduce-endocrine-disruptors'
  | 'avoid-allergens'
  | 'pregnancy-safe-products'
  | 'clean-beauty'
  | 'non-toxic-home'
  | 'chemical-free-diet'
  | 'sensitive-skin-friendly';

export type UserPreferences = {
  userId: string;
  values: UserValues[];
  healthGoals: HealthGoals[];
  notificationSettings: {
    emailAlerts: boolean;
    productUpdates: boolean;
    cleanStackReminders: boolean;
    newSwapSuggestions: boolean;
  };
};

export type ScanHistory = {
  id: string;
  userId: string;
  products: {
    productId: string;
    dateScanned: Date;
    cleanScore: number;
  }[];
};
