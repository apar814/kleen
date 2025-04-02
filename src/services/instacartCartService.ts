
import { InstacartCartData, InstacartCartItem } from '@/types/InstacartCart';
import { Product } from '@/types/Product';

// Convert Instacart cart data to our app's Product format
export const convertInstacartCartToProducts = (instacartCartData: InstacartCartData): Product[] => {
  return instacartCartData.items.map((item: InstacartCartItem) => {
    // Generate placeholder values as needed
    return {
      id: item.id,
      name: item.name,
      brand: 'Unknown', // Default brand until we get product details
      category: 'Grocery', // Default category for Instacart items
      price: item.price,
      imageUrl: item.imageUrl || `https://placehold.co/400x400?text=${encodeURIComponent(item.name)}`,
      ingredients: [], // Will be populated later from additional API calls
      cleanScore: 50, // Default score until calculated
      kleenScore: 50, // Default score until calculated
      flaggedIngredients: [], // Will be populated later
    };
  });
};

// Process Instacart cart data for analysis
export const processInstacartCart = async (instacartCartData: InstacartCartData): Promise<Product[]> => {
  try {
    // Convert the basic cart data to products
    const products = convertInstacartCartToProducts(instacartCartData);
    
    // In a real implementation, we would make API calls here to:
    // 1. Get detailed product information for each item
    // 2. Look up ingredient data for each product
    // 3. Calculate Kleen Score based on ingredients
    
    // For now, we'll return the basic product data
    return products;
  } catch (error) {
    console.error('Error processing Instacart cart:', error);
    return [];
  }
};

// Parse JSON string to InstacartCartData object
export const parseInstacartCartData = (jsonString: string): InstacartCartData | null => {
  try {
    return JSON.parse(jsonString) as InstacartCartData;
  } catch (error) {
    console.error('Error parsing Instacart cart data:', error);
    return null;
  }
};

// Example function that would be called by a browser extension
export const handleInstacartCartImport = async (jsonString: string): Promise<Product[]> => {
  const cartData = parseInstacartCartData(jsonString);
  if (!cartData) {
    return [];
  }
  
  return await processInstacartCart(cartData);
};
