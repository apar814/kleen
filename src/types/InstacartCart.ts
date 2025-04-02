
export interface InstacartCartData {
  items: InstacartCartItem[];
  recommendations?: InstacartRecommendation[];
}

export interface InstacartCartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export interface InstacartRecommendation {
  id: string;
  name: string;
  reason: string;
  score: number;
}
