
import { AmazonCartData, AmazonLineItem, AmazonMarketBasketReport, DetailsByAsin } from '@/types/AmazonCart';
import { Product } from '@/types/Product';

// Convert Amazon cart data to our app's Product format (legacy format)
export const convertAmazonCartToProducts = (amazonCartData: AmazonCartData): Product[] => {
  return amazonCartData.lineItems.map((item: AmazonLineItem) => {
    // Generate placeholder values as needed
    return {
      id: item.productId,
      name: `Product ${item.productId}`, // Default name until we get product details
      brand: 'Unknown', // Default brand until we get product details
      category: 'Unknown', // Default category until we get product details
      price: parseFloat(item.unitPrice.price.amount),
      imageUrl: `https://placehold.co/400x400?text=Product+${item.productId.substring(0, 5)}`,
      ingredients: [], // Will be populated later from additional API calls
      asin: item.productId, // Using productId as ASIN
      cleanScore: 50, // Default score until calculated
      kleenScore: 50, // Default score until calculated
      flaggedIngredients: [], // Will be populated later
    };
  });
};

// Convert Amazon Market Basket report to our app's Product format (new format)
export const convertMarketBasketToProducts = (marketBasketReport: AmazonMarketBasketReport): Product[] => {
  // Get unique ASINs from the report
  const uniqueAsins = [...new Set(marketBasketReport.dataByAsin.map(item => item.asin))];
  
  return uniqueAsins.map(asin => {
    // Get items purchased with this ASIN
    const relatedItems = marketBasketReport.dataByAsin.filter(item => item.asin === asin);
    
    // Generate placeholder values as needed
    return {
      id: asin,
      name: `Product ${asin}`, // Default name until we get product details
      brand: 'Unknown', // Default brand until we get product details
      category: 'Unknown', // Default category until we get product details
      price: 0, // Price not available in this report format
      imageUrl: `https://placehold.co/400x400?text=Product+${asin.substring(0, 5)}`,
      ingredients: [], // Will be populated later from additional API calls
      asin: asin,
      cleanScore: 50, // Default score until calculated
      kleenScore: 50, // Default score until calculated
      flaggedIngredients: [], // Will be populated later
      relatedItems: relatedItems.map(item => ({
        asin: item.purchasedWithAsin,
        rank: item.purchasedWithRank,
        combinationPercentage: item.combinationPct
      }))
    };
  });
};

// Process Amazon cart data for analysis
export const processAmazonCart = async (cartData: AmazonCartData | AmazonMarketBasketReport): Promise<Product[]> => {
  try {
    let products: Product[] = [];
    
    // Determine which type of Amazon data we're dealing with
    if ('lineItems' in cartData) {
      // Legacy cart data format
      products = convertAmazonCartToProducts(cartData as AmazonCartData);
    } else if ('dataByAsin' in cartData) {
      // New market basket report format
      products = convertMarketBasketToProducts(cartData as AmazonMarketBasketReport);
    }
    
    // In a real implementation, we would make API calls here to:
    // 1. Get detailed product information for each item
    // 2. Look up ingredient data for each product
    // 3. Calculate Kleen Score based on ingredients
    
    // For now, we'll return the basic product data
    return products;
  } catch (error) {
    console.error('Error processing Amazon cart:', error);
    return [];
  }
};

// Parse JSON string to Amazon data object (either format)
export const parseAmazonCartData = (jsonString: string): AmazonCartData | AmazonMarketBasketReport | null => {
  try {
    const parsed = JSON.parse(jsonString);
    
    // Check which format the data is in
    if ('lineItems' in parsed) {
      return parsed as AmazonCartData;
    } else if ('dataByAsin' in parsed) {
      return parsed as AmazonMarketBasketReport;
    } else {
      console.error('Unknown Amazon data format');
      return null;
    }
  } catch (error) {
    console.error('Error parsing Amazon cart data:', error);
    return null;
  }
};

// Example function that would be called by a browser extension
export const handleAmazonCartImport = async (jsonString: string): Promise<Product[]> => {
  const cartData = parseAmazonCartData(jsonString);
  if (!cartData) {
    return [];
  }
  
  return await processAmazonCart(cartData);
};
