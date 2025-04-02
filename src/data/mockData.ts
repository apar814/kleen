
import { Product } from '@/types/Product';

// Mock data for product catalog
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Natural Moisturizing Cream',
    brand: 'Clean Beauty Co.',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$24.99',
    kleenScore: 92,
    category: 'skincare',
    cleanScore: 92,
    ingredients: [
      {
        name: 'Aloe Vera',
        toxicityLevel: 'low',
        description: 'Soothing plant extract with hydrating properties.'
      },
      {
        name: 'Shea Butter',
        toxicityLevel: 'low',
        description: 'Natural fat extracted from shea tree nuts, deeply moisturizing.'
      }
    ]
  },
  {
    id: '2',
    name: 'Organic Vitamin C Serum',
    brand: 'Pure Botanicals',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$32.50',
    kleenScore: 89,
    category: 'skincare',
    cleanScore: 89,
    ingredients: [
      {
        name: 'Vitamin C (Ascorbic Acid)',
        toxicityLevel: 'low',
        description: 'Antioxidant that brightens skin and boosts collagen production.'
      },
      {
        name: 'Hyaluronic Acid',
        toxicityLevel: 'low',
        description: 'Natural substance that retains moisture in the skin.'
      }
    ]
  },
  {
    id: '3',
    name: 'Natural Plant Protein',
    brand: 'Clean Fuel',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$39.99',
    kleenScore: 95,
    category: 'supplement',
    cleanScore: 95,
    ingredients: [
      {
        name: 'Pea Protein Isolate',
        toxicityLevel: 'low',
        description: "Plant-based protein source that's easily digestible."
      },
      {
        name: 'Organic Rice Protein',
        toxicityLevel: 'low',
        description: 'Hypoallergenic protein derived from brown rice.'
      }
    ]
  },
  {
    id: '4',
    name: 'Organic Shampoo',
    brand: 'Pure Essentials',
    imageUrl: 'https://placehold.co/200x200/png',
    price: '$18.99',
    kleenScore: 88,
    category: 'haircare',
    cleanScore: 88,
    ingredients: [
      {
        name: 'Aloe Vera Juice',
        toxicityLevel: 'low',
        description: 'Hydrating and soothing natural ingredient.'
      },
      {
        name: 'Coconut-derived Surfactants',
        toxicityLevel: 'low',
        description: 'Gentle cleansers derived from coconut oil.'
      }
    ]
  }
];
