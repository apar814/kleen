
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, AlertTriangle, Info, ChevronDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import GuestBanner from '@/components/auth/GuestBanner';
import { ToxicIngredient } from '@/types/ToxicIngredients';

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
    updated_at: new Date('2023-05-15')
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
    ai_summary: 'BHA is a preservative that keeps fats from going rancid. The National Toxicology Program classifies it as "reasonably anticipated to be a human carcinogen" and studies show it can disrupt hormones. It's especially concerning in products applied to the lips or stored long-term.',
    found_in: ['Processed foods', 'Vegetable oils', 'Cosmetics', 'Food packaging'],
    clean_alternatives: ['Vitamin E', 'Rosemary extract', 'Ascorbic acid (Vitamin C)'],
    sources: ['https://ntp.niehs.nih.gov/whatwestudy/assessments/cancer/roc/index.html', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6349637/'],
    created_by: 'system',
    updated_at: new Date('2023-06-22')
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
    ai_summary: 'Triclosan is an antibacterial chemical that was once common in hand soaps and toothpastes. The FDA banned it from hand soaps in 2016 because manufacturers couldn't prove it was safe for long-term use or more effective than regular soap. It may disrupt thyroid hormones and contribute to antibiotic resistance.',
    found_in: ['Antibacterial soaps', 'Toothpaste', 'Deodorants', 'Cleaning products'],
    clean_alternatives: ['Tea tree oil', 'Regular soap', 'Alcohol-based sanitizers'],
    sources: ['https://www.fda.gov/consumers/consumer-updates/antibacterial-soap-you-can-skip-it-use-plain-soap-and-water', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3945593/'],
    created_by: 'system',
    updated_at: new Date('2023-04-10')
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
    ai_summary: 'Phthalates are chemicals that make plastic flexible and help fragrances last longer. They're linked to hormone disruption, reproductive issues, and may affect child development. They're often not listed on labels but hidden under "fragrance" or "perfume." Look for products specifically labeled "phthalate-free."',
    found_in: ['Plastic containers', 'Cosmetics', 'Fragrance', 'Vinyl products'],
    clean_alternatives: ['Phthalate-free plastics', 'Glass containers', 'Products with natural fragrances'],
    sources: ['https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2873014/', 'https://www.niehs.nih.gov/health/topics/agents/phthalates/index.cfm'],
    created_by: 'system',
    updated_at: new Date('2023-07-01')
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
    ai_summary: 'Sodium Lauryl Sulfate (SLS) is a surfactant that creates the foaming action in many shampoos, toothpastes, and cleaning products. While it's effective at cleaning, it can be harsh and strip natural oils from skin and hair, causing irritation especially for sensitive individuals. It's not considered highly toxic but may cause problems with regular use.',
    found_in: ['Shampoo', 'Toothpaste', 'Body wash', 'Cleaning products'],
    clean_alternatives: ['Sodium Coco Sulfate', 'Decyl Glucoside', 'Coco Glucoside'],
    sources: ['https://www.cir-safety.org/sites/default/files/SLS.pdf', 'https://pubmed.ncbi.nlm.nih.gov/9687033/'],
    created_by: 'system',
    updated_at: new Date('2023-05-28')
  }
];

// Filter options
const categories = ['Dye', 'Preservative', 'Antimicrobial', 'Plasticizer', 'Surfactant'];
const riskLevels = [
  { value: 1, label: '1 - Low Concern' },
  { value: 2, label: '2 - Slightly Concerning' },
  { value: 3, label: '3 - Moderate Concern' },
  { value: 4, label: '4 - High Concern' },
  { value: 5, label: '5 - Severe Concern' }
];

const IngredientDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<number[]>([]);
  const [filteredIngredients, setFilteredIngredients] = useState(mockIngredients);
  const [activeTab, setActiveTab] = useState('all');

  // Filter ingredients based on search query and filters
  React.useEffect(() => {
    let results = mockIngredients;
    
    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      results = results.filter(ingredient => 
        ingredient.name.toLowerCase().includes(lowerCaseQuery) ||
        ingredient.aliases?.some(alias => alias.toLowerCase().includes(lowerCaseQuery)) ||
        ingredient.category.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(ingredient => selectedCategories.includes(ingredient.category));
    }
    
    // Apply risk level filter
    if (selectedRiskLevels.length > 0) {
      results = results.filter(ingredient => selectedRiskLevels.includes(ingredient.risk_level));
    }

    // Apply tab filter
    if (activeTab === 'high-risk') {
      results = results.filter(ingredient => ingredient.risk_level >= 4);
    } else if (activeTab === 'banned') {
      results = results.filter(ingredient => ingredient.banned_in && ingredient.banned_in.length > 0);
    }
    
    setFilteredIngredients(results);
  }, [searchQuery, selectedCategories, selectedRiskLevels, activeTab]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle risk level selection
  const toggleRiskLevel = (level: number) => {
    setSelectedRiskLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  // Get risk level color based on level
  const getRiskLevelColor = (level: number) => {
    switch(level) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-emerald-100 text-emerald-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search ingredients, aliases, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter size={16} />
                  <span>Category</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm w-56">
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <AlertTriangle size={16} />
                  <span>Risk Level</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm w-56">
                {riskLevels.map((level) => (
                  <DropdownMenuCheckboxItem
                    key={level.value}
                    checked={selectedRiskLevels.includes(level.value)}
                    onCheckedChange={() => toggleRiskLevel(level.value)}
                  >
                    {level.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Ingredients</TabsTrigger>
            <TabsTrigger value="high-risk">High Risk</TabsTrigger>
            <TabsTrigger value="banned">Banned Internationally</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results count */}
        <div className="text-sm text-gray-500 mb-2">
          Showing {filteredIngredients.length} of {mockIngredients.length} ingredients
        </div>

        {/* Ingredients list */}
        <div className="grid grid-cols-1 gap-6">
          {filteredIngredients.length > 0 ? (
            filteredIngredients.map((ingredient) => (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl">{ingredient.name}</CardTitle>
                        <CardDescription>
                          {ingredient.aliases?.length > 0 && (
                            <span className="italic text-gray-500">
                              Also known as: {ingredient.aliases.join(', ')}
                            </span>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-gray-200">{ingredient.category}</Badge>
                        <Badge className={getRiskLevelColor(ingredient.risk_level)}>
                          Risk Level: {ingredient.risk_level}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {/* AI Summary */}
                      <div className="bg-kleen-mint/5 p-4 rounded-lg border border-kleen-mint/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Info size={16} className="text-kleen-mint" />
                          <h4 className="font-medium">AI Summary</h4>
                        </div>
                        <p>{ingredient.ai_summary}</p>
                      </div>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="details">
                          <AccordionTrigger>Scientific Details</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-3 text-sm">
                              <p>{ingredient.description}</p>
                              
                              <div>
                                <h5 className="font-medium mb-1">Health Risks:</h5>
                                <ul className="list-disc list-inside space-y-1">
                                  {ingredient.health_risks.map((risk, idx) => (
                                    <li key={idx}>{risk}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              {ingredient.banned_in && ingredient.banned_in.length > 0 && (
                                <div>
                                  <h5 className="font-medium mb-1">Banned or Restricted In:</h5>
                                  <p>{ingredient.banned_in.join(', ')}</p>
                                </div>
                              )}
                              
                              <div>
                                <h5 className="font-medium mb-1">Commonly Found In:</h5>
                                <div className="flex flex-wrap gap-1">
                                  {ingredient.found_in?.map((product, idx) => (
                                    <Badge variant="secondary" key={idx}>{product}</Badge>
                                  ))}
                                </div>
                              </div>
                              
                              {ingredient.sources && (
                                <div>
                                  <h5 className="font-medium mb-1">Sources:</h5>
                                  <ul className="list-disc list-inside space-y-1">
                                    {ingredient.sources.map((source, idx) => (
                                      <li key={idx} className="truncate">
                                        <a 
                                          href={source} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-kleen-mint hover:underline"
                                        >
                                          {source.split('//')[1].split('/')[0]}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col items-start pt-2">
                    <h4 className="font-medium mb-2">Clean Alternatives</h4>
                    <div className="flex flex-wrap gap-2">
                      {ingredient.clean_alternatives?.map((alternative, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-green-50 text-green-800 hover:bg-green-100">
                          {alternative}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="text-center p-8">
              <h3 className="text-lg font-medium mb-2">No ingredients matched your search</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default IngredientDatabase;
