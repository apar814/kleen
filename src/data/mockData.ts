import { Product } from '@/types/Product';

// Mock data for product catalog
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Gentle Face Cleanser',
    brand: 'NatureCare',
    imageUrl: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2UlMjBjbGVhbnNlcnxlbnwwfHwwfHx8MA%3D%3D',
    price: '$14.99',
    kleenScore: 45,
    ingredients: [
      {
        name: 'Sodium Lauryl Sulfate',
        toxicityLevel: 'high',
        description: 'Strong detergent that can strip skin of natural oils and cause irritation. Known to be a skin irritant.'
      },
      {
        name: 'Fragrance',
        toxicityLevel: 'medium',
        description: 'Undisclosed mixture which may contain allergens and hormone-disrupting chemicals.'
      },
      {
        name: 'Glycerin',
        toxicityLevel: 'low',
        description: 'Natural moisturizer that helps skin retain water and is considered very safe.'
      }
    ],
    alternativeProductId: 'prod-2'
  },
  {
    id: 'prod-2',
    name: 'Pure Botanical Cleanser',
    brand: 'CleanBeauty',
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZhY2UlMjBjbGVhbnNlcnxlbnwwfHwwfHx8MA%3D%3D',
    price: '$22.99',
    kleenScore: 92,
    ingredients: [
      {
        name: 'Aloe Vera Extract',
        toxicityLevel: 'low',
        description: 'Natural plant extract that soothes skin and has anti-inflammatory properties.'
      },
      {
        name: 'Coconut-derived Surfactant',
        toxicityLevel: 'low',
        description: 'Gentle cleansing agent derived from coconut oil, biodegradable and non-toxic.'
      },
      {
        name: 'Rosemary Essential Oil',
        toxicityLevel: 'low',
        description: 'Natural fragrance with antimicrobial properties. Some people may be sensitive to essential oils.'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Daily Moisture Lotion',
    brand: 'EverydayGlow',
    imageUrl: 'https://images.unsplash.com/photo-1611080080796-a5e152b79808?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG90aW9ufGVufDB8fDB8fHww',
    price: '$12.99',
    kleenScore: 30,
    ingredients: [
      {
        name: 'Parabens',
        toxicityLevel: 'high',
        description: 'Preservatives linked to hormone disruption and potential reproductive harm.'
      },
      {
        name: 'Mineral Oil',
        toxicityLevel: 'medium',
        description: 'Petroleum-derived ingredient that may clog pores and contain contaminants.'
      },
      {
        name: 'Dimethicone',
        toxicityLevel: 'medium',
        description: 'Silicone-based polymer that creates a barrier on skin. May trap bacteria and prevent skin breathing.'
      }
    ],
    alternativeProductId: 'prod-4'
  },
  {
    id: 'prod-4',
    name: 'Hydrating Plant Cream',
    brand: 'PureHerbal',
    imageUrl: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGxvdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    price: '$24.99',
    kleenScore: 95,
    ingredients: [
      {
        name: 'Shea Butter',
        toxicityLevel: 'low',
        description: 'Natural plant fat rich in vitamins and fatty acids. Excellent for moisturizing skin.'
      },
      {
        name: 'Jojoba Oil',
        toxicityLevel: 'low',
        description: 'Natural oil similar to skin\'s sebum. Non-comedogenic and suitable for all skin types.'
      },
      {
        name: 'Vitamin E',
        toxicityLevel: 'low',
        description: 'Antioxidant that protects skin from damage and supports cell health.'
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Refreshing Shower Gel',
    brand: 'FreshScent',
    imageUrl: 'https://images.unsplash.com/photo-1570202583126-2d2915d352af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9keSUyMHdhc2h8ZW58MHx8MHx8fDA%3D',
    price: '$8.99',
    kleenScore: 55,
    ingredients: [
      {
        name: 'Sodium Laureth Sulfate',
        toxicityLevel: 'medium',
        description: 'Surfactant that can be contaminated with 1,4-dioxane, a possible carcinogen.'
      },
      {
        name: 'Artificial Fragrance',
        toxicityLevel: 'high',
        description: 'Synthetic scents that may contain phthalates and other hormone disruptors.'
      },
      {
        name: 'Citric Acid',
        toxicityLevel: 'low',
        description: 'Naturally occurring acid used to adjust pH. Safe for skin use.'
      }
    ],
    alternativeProductId: 'prod-6'
  },
  {
    id: 'prod-6',
    name: 'Organic Body Wash',
    brand: 'EarthPure',
    imageUrl: 'https://images.unsplash.com/photo-1643321610692-618e7e1562b5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGJvZHklMjB3YXNofGVufDB8fDB8fHww',
    price: '$16.99',
    kleenScore: 88,
    ingredients: [
      {
        name: 'Castile Soap',
        toxicityLevel: 'low',
        description: 'Plant-based soap made from vegetable oils. Biodegradable and gentle.'
      },
      {
        name: 'Aloe Vera',
        toxicityLevel: 'low',
        description: 'Soothing plant extract that calms and moisturizes skin.'
      },
      {
        name: 'Orange Essential Oil',
        toxicityLevel: 'low',
        description: 'Natural fragrance from orange peels. Some individuals may be sensitive.'
      }
    ]
  }
];

// Cart items subset
export const cartItems: Product[] = [
  mockProducts[0],
  mockProducts[2],
  mockProducts[4]
];

// Get clean alternatives
export const cleanAlternatives: Product[] = [
  mockProducts[1],
  mockProducts[3],
  mockProducts[5]
];
