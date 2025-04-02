
import { Product } from '@/types/Product';

// Create mockProducts array that was referenced but missing
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Generic Body Wash",
    brand: "Brand X",
    category: "Personal Care",
    imageUrl: "https://placehold.co/400x400?text=Body+Wash",
    price: "$8.99",
    cleanScore: 35,
    kleenScore: 35,
    ingredients: [
      {
        name: "Sodium Lauryl Sulfate",
        toxicityLevel: "high",
        description: "A strong surfactant that can irritate skin and strip natural oils."
      },
      {
        name: "Fragrance",
        toxicityLevel: "medium",
        description: "Can contain hundreds of undisclosed chemicals, some linked to allergies and hormone disruption."
      }
    ]
  },
  {
    id: "2",
    name: "Clean Body Wash",
    brand: "Pure Company",
    category: "Personal Care",
    imageUrl: "https://placehold.co/400x400?text=Clean+Wash",
    price: "$10.99",
    cleanScore: 85,
    kleenScore: 85,
    ingredients: [
      {
        name: "Sodium Coco Sulfate",
        toxicityLevel: "low",
        description: "A gentler coconut-derived cleanser that's less irritating than SLS."
      }
    ]
  }
];

// Add any missing exports that might be used in AnalyticsDashboard.tsx
export const cartItems: Product[] = [
  {
    id: "1",
    name: "Generic Body Wash",
    brand: "Brand X",
    category: "Personal Care",
    imageUrl: "https://placehold.co/400x400?text=Body+Wash",
    price: "$8.99",
    cleanScore: 35,
    kleenScore: 35,
    ingredients: [
      {
        name: "Sodium Lauryl Sulfate",
        toxicityLevel: "high",
        description: "A strong surfactant that can irritate skin and strip natural oils."
      },
      {
        name: "Fragrance",
        toxicityLevel: "medium",
        description: "Can contain hundreds of undisclosed chemicals, some linked to allergies and hormone disruption."
      }
    ]
  },
  {
    id: "2",
    name: "Clean Body Wash",
    brand: "Pure Company",
    category: "Personal Care",
    imageUrl: "https://placehold.co/400x400?text=Clean+Wash",
    price: "$10.99",
    cleanScore: 85,
    kleenScore: 85,
    ingredients: [
      {
        name: "Sodium Coco Sulfate",
        toxicityLevel: "low",
        description: "A gentler coconut-derived cleanser that's less irritating than SLS."
      }
    ]
  }
];

export const cleanAlternatives: Product[] = [
  {
    id: "3",
    name: "Clean Body Wash",
    brand: "Pure Company",
    category: "Personal Care",
    imageUrl: "https://placehold.co/400x400?text=Clean+Wash",
    price: "$10.99",
    cleanScore: 85,
    kleenScore: 85,
    ingredients: [
      {
        name: "Sodium Coco Sulfate",
        toxicityLevel: "low",
        description: "A gentler coconut-derived cleanser that's less irritating than SLS."
      }
    ]
  },
  {
    id: "4",
    name: "Natural Shampoo",
    brand: "Green Living",
    category: "Personal Care",
    imageUrl: "https://placehold.co/400x400?text=Natural+Shampoo",
    price: "$12.99",
    cleanScore: 90,
    kleenScore: 90,
    ingredients: [
      {
        name: "Aloe Vera Extract",
        toxicityLevel: "low",
        description: "Natural plant extract that soothes and moisturizes."
      }
    ]
  }
];
