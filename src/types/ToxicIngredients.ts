
export type ToxicIngredient = {
  id: string;
  name: string;
  aliases?: string[];
  category: string;
  risk_level: number;
  health_risks: string[];
  banned_in?: string[];
  description: string;
  ai_summary: string;
  found_in?: string[];
  clean_alternatives?: string[];
  sources?: string[];
  created_by: string;
  updated_at: Date;
};

export type ToxicIngredientFilter = {
  categories?: string[];
  riskLevels?: number[];
  searchQuery?: string;
  banned?: boolean;
};
