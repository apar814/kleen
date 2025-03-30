
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image?: string;
  ingredients: string[];
  asin?: string;
  cleanScore: number;
  flaggedIngredients?: {
    name: string;
    riskLevel: number;
  }[];
  affiliateLink?: string;
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
