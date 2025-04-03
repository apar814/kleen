
import React from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import GuestBanner from '@/components/auth/GuestBanner';
import { ToxicIngredient } from '@/types/ToxicIngredients';
import IngredientsFilter from '@/components/ingredients/IngredientsFilter';
import IngredientsTabs from '@/components/ingredients/IngredientsTabs';
import IngredientCard from '@/components/ingredients/IngredientCard';
import EmptyIngredientState from '@/components/ingredients/EmptyIngredientState';
import IngredientsCount from '@/components/ingredients/IngredientsCount';
import { useIngredientFilters } from '@/hooks/useIngredientFilters';

// Mock data for the ingredient database
const mockIngredients: ToxicIngredient[] = [
  {
    id: '1',
    name: 'Red 40',
    aliases: ['Allura Red AC', 'FD&C Red No. 40'],
    category: 'Dye',
    risk_level: 4,
    health_risks: ['Hyperactivity', 'Allergic reactions', 'Immune system effects'],
    banned_in: ['Norway', 'Austria', 'France'],
    description: 'A synthetic red dye derived from petroleum that is commonly used in foods, beverages, and cosmetics to make them more visually appealing.',
    ai_summary: 'Red 40 is an artificial coloring agent that gives foods and beverages a bright red hue. Studies have linked it to hyperactivity in children and allergic reactions in some individuals. Several European countries have banned it due to safety concerns.',
    found_in: ['Candy', 'Soft drinks', 'Cereals', 'Medications'],
    clean_alternatives: ['Beetroot extract', 'Paprika', 'Anthocyanins (from berries)'],
    sources: ['https://pubmed.ncbi.nlm.nih.gov/23026007/', 'https://www.sciencedirect.com/science/article/abs/pii/S0278691512006941'],
    created_by: 'system',
    updated_at: new Date('2023-05-15').toISOString()
  },
  {
    id: '2',
    name: 'BHA (Butylated Hydroxyanisole)',
    aliases: ['E320'],
    category: 'Preservative',
    risk_level: 5,
    health_risks: ['Endocrine disruption', 'Potential carcinogen', 'Organ system toxicity'],
    banned_in: ['Japan', 'European Union (restricted)'],
    description: 'A synthetic antioxidant used to prevent oils in foods and cosmetics from becoming rancid. It is commonly found in cereals, chewing gum, potato chips, and vegetable oils.',
    ai_summary: 'BHA is a preservative that keeps fats from going rancid. The National Toxicology Program classifies it as "reasonably anticipated to be a human carcinogen" and studies show it can disrupt hormones. It\'s especially concerning in products applied to the lips or stored long-term.',
    found_in: ['Processed foods', 'Vegetable oils', 'Cosmetics', 'Food packaging'],
    clean_alternatives: ['Vitamin E', 'Rosemary extract', 'Ascorbic acid (Vitamin C)'],
    sources: ['https://ntp.niehs.nih.gov/whatwestudy/assessments/cancer/roc/index.html', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6349637/'],
    created_by: 'system',
    updated_at: new Date('2023-06-22').toISOString()
  },
  {
    id: '3',
    name: 'Triclosan',
    aliases: ['5-Chloro-2-(2,4-dichlorophenoxy)phenol'],
    category: 'Antimicrobial',
    risk_level: 4,
    health_risks: ['Endocrine disruption', 'Antibiotic resistance', 'Environmental toxicity'],
    banned_in: ['United States (in certain products)', 'European Union (in certain products)'],
    description: 'An antibacterial and antifungal agent found in many consumer products, including soaps, toothpastes, and cleaning supplies. It has been shown to alter hormone regulation in animals.',
    ai_summary: 'Triclosan is an antibacterial chemical that was once common in hand soaps and toothpastes. The FDA banned it from hand soaps in 2016 because manufacturers couldn\'t prove it was safe for long-term use or more effective than regular soap. It may disrupt thyroid hormones and contribute to antibiotic resistance.',
    found_in: ['Antibacterial soaps', 'Toothpaste', 'Deodorants', 'Cleaning products'],
    clean_alternatives: ['Tea tree oil', 'Regular soap', 'Alcohol-based sanitizers'],
    sources: ['https://www.fda.gov/consumers/consumer-updates/antibacterial-soap-you-can-skip-it-use-plain-soap-and-water', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3945593/'],
    created_by: 'system',
    updated_at: new Date('2023-04-10').toISOString()
  },
  {
    id: '4',
    name: 'Phthalates',
    aliases: ['DEP', 'DEHP', 'DBP'],
    category: 'Plasticizer',
    risk_level: 5,
    health_risks: ['Reproductive toxicity', 'Developmental issues', 'Endocrine disruption'],
    banned_in: ['European Union (in certain products)', 'California'],
    description: 'A group of chemicals used to make plastics more flexible and harder to break. They are used in hundreds of products, including vinyl flooring, lubricating oils, and personal-care products.',
    ai_summary: 'Phthalates are chemicals that make plastic flexible and help fragrances last longer. They\'re linked to hormone disruption, reproductive issues, and may affect child development. They\'re often not listed on labels but hidden under "fragrance" or "perfume." Look for products specifically labeled "phthalate-free."',
    found_in: ['Plastic containers', 'Cosmetics', 'Fragrance', 'Vinyl products'],
    clean_alternatives: ['Phthalate-free plastics', 'Glass containers', 'Products with natural fragrances'],
    sources: ['https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2873014/', 'https://www.niehs.nih.gov/health/topics/agents/phthalates/index.cfm'],
    created_by: 'system',
    updated_at: new Date('2023-07-01').toISOString()
  },
  {
    id: '5',
    name: 'Sodium Lauryl Sulfate (SLS)',
    aliases: ['Sodium dodecyl sulfate', 'SDS'],
    category: 'Surfactant',
    risk_level: 3,
    health_risks: ['Skin irritation', 'Eye irritation', 'Potential organ toxicity with long-term exposure'],
    banned_in: [],
    description: 'A surfactant used in many personal care and cleaning products for its ability to create lather. It is effective at removing oil and dirt but can cause irritation.',
    ai_summary: 'Sodium Lauryl Sulfate (SLS) is a surfactant that creates the foaming action in many shampoos, toothpastes, and cleaning products. While it\'s effective at cleaning, it can be harsh and strip natural oils from skin and hair, causing irritation especially for sensitive individuals. It\'s not considered highly toxic but may cause problems with regular use.',
    found_in: ['Shampoo', 'Toothpaste', 'Body wash', 'Cleaning products'],
    clean_alternatives: ['Sodium Coco Sulfate', 'Decyl Glucoside', 'Coco Glucoside'],
    sources: ['https://www.cir-safety.org/sites/default/files/SLS.pdf', 'https://pubmed.ncbi.nlm.nih.gov/9687033/'],
    created_by: 'system',
    updated_at: new Date('2023-05-28').toISOString()
  }
];

const IngredientDatabase: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    selectedRiskLevels,
    activeTab,
    setActiveTab,
    filteredIngredients,
    categories,
    riskLevels,
    toggleCategory,
    toggleRiskLevel,
    resetFilters,
    getRiskLevelColor
  } = useIngredientFilters(mockIngredients);

  return (
    <DashboardLayout 
      title="Toxic Ingredients Database" 
      description="Learn about potentially harmful ingredients and find cleaner alternatives"
    >
      <GuestBanner />
      
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Search and filters */}
        <IngredientsFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategories={selectedCategories}
          toggleCategory={toggleCategory}
          riskLevels={riskLevels}
          selectedRiskLevels={selectedRiskLevels}
          toggleRiskLevel={toggleRiskLevel}
          resetFilters={resetFilters}
        />

        {/* Tabs */}
        <IngredientsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Results count */}
        <IngredientsCount 
          filteredCount={filteredIngredients.length} 
          totalCount={mockIngredients.length} 
        />

        {/* Ingredients list */}
        <div className="grid grid-cols-1 gap-6">
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((ingredient) => (
              <IngredientCard 
                key={ingredient.id}
                ingredient={ingredient}
                getRiskLevelColor={getRiskLevelColor}
              />
            ))
          ) : (
            <EmptyIngredientState />
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default IngredientDatabase;
