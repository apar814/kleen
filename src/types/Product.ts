
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number | string;
  image?: string;
  imageUrl?: string;
  ingredients: string[] | {
    name: string;
    toxicityLevel: 'high' | 'medium' | 'low';
    description: string;
  }[];
  asin?: string;
  cleanScore: number;
  kleenScore?: number;
  flaggedIngredients?: {
    name: string;
    riskLevel: number;
  }[];
  affiliateLink?: string;
  alternativeProductId?: string;
};

export type SavedSwap = {
  id: string;
  originalProductId: string;
  swapProductId: string;
  userId: string;
  dateAdded: Date;
};

export type CleanStack = {
  id: string;
  userId: string;
  name: string;
  products: Product[];
  dateCreated: Date;
  dateModified: Date;
};
