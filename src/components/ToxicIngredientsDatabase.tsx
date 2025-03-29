
import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ToxicIngredient } from '@/types/ToxicIngredients';

// Mock data with all required fields from ToxicIngredient type
const mockToxicIngredients: ToxicIngredient[] = [
  {
    id: '1',
    name: 'Red 40',
    aliases: ['Allura Red AC', 'FD&C Red No. 40'],
    category: 'Dye',
    risk_level: 4,
    health_risks: ['Hyperactivity in children', 'Allergic reactions', 'Possible carcinogen'],
    banned_in: ['Norway', 'Sweden', 'France'],
    description: 'Synthetic food dye derived from petroleum that may cause allergic reactions and has been linked to hyperactivity in children.',
    ai_summary: 'Red 40 is an artificial food coloring commonly found in candies, soft drinks, and processed foods. Studies suggest it may contribute to hyperactivity in children and cause allergic reactions in some people.',
    found_in: ['Candy', 'Soft drinks', 'Cereals', 'Baked goods'],
    clean_alternatives: ['Beetroot extract', 'Annatto', 'Paprika'],
    sources: ['https://pubmed.ncbi.nlm.nih.gov/23026007/', 'https://www.fda.gov/food/food-additives-petitions/color-additives-questions-and-answers-consumers'],
    created_by: 'system',
    updated_at: '2023-04-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Triclosan',
    aliases: ['5-Chloro-2-(2,4-dichlorophenoxy)phenol', 'TCS'],
    category: 'Antimicrobial',
    risk_level: 5,
    health_risks: ['Hormone disruption', 'Antibiotic resistance', 'Environmental toxin'],
    banned_in: ['United States (in soaps)', 'European Union'],
    description: 'An antibacterial and antifungal agent found in many consumer products that has been linked to hormone disruption and may contribute to antibiotic resistance.',
    ai_summary: 'Triclosan is an antimicrobial chemical added to many personal care products. Research suggests it may disrupt hormones, particularly thyroid function, and contribute to the development of antibiotic-resistant bacteria.',
    found_in: ['Antibacterial soaps', 'Toothpaste', 'Deodorants', 'Cleaning products'],
    clean_alternatives: ['Tea tree oil', 'Alcohol-based sanitizers', 'Plain soap and water'],
    sources: ['https://www.fda.gov/consumers/consumer-updates/5-things-know-about-triclosan', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3945593/'],
    created_by: 'system',
    updated_at: '2023-05-22T14:45:00Z'
  },
  {
    id: '3',
    name: 'BHA (Butylated Hydroxyanisole)',
    aliases: ['E320', '2-tert-butyl-4-methoxyphenol'],
    category: 'Preservative',
    risk_level: 4,
    health_risks: ['Possible carcinogen', 'Endocrine disruption', 'Allergic reactions'],
    banned_in: ['Japan', 'European Union (restricted)'],
    description: 'A synthetic antioxidant used as a preservative in foods, cosmetics and packaging that has been classified as a possible human carcinogen.',
    ai_summary: 'BHA is a synthetic preservative that extends shelf life in many foods and personal care products. The National Toxicology Program classifies it as "reasonably anticipated to be a human carcinogen" and studies show it may disrupt hormone function.',
    found_in: ['Processed foods', 'Chewing gum', 'Cosmetics', 'Food packaging'],
    clean_alternatives: ['Vitamin E (Tocopherol)', 'Rosemary extract', 'Ascorbic acid (Vitamin C)'],
    sources: ['https://ntp.niehs.nih.gov/whatwestudy/assessments/cancer/roc/index.html', 'https://www.efsa.europa.eu/en/efsajournal/pub/5215'],
    created_by: 'system',
    updated_at: '2023-03-10T09:15:00Z'
  }
];

const ToxicIngredientsDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<ToxicIngredient | null>(null);

  const filteredIngredients = mockToxicIngredients.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.aliases?.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ingredient.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search ingredients by name, alias, or category..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filter
          </Button>
          <Button variant="outline">Risk Level</Button>
          <Button variant="outline">Category</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIngredients.map((ingredient) => (
          <Dialog key={ingredient.id}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-semibold">{ingredient.name}</CardTitle>
                    <Badge className={`
                      ${ingredient.risk_level >= 4 ? 'bg-red-500' : 
                        ingredient.risk_level >= 3 ? 'bg-orange-500' : 
                        'bg-yellow-500'} hover:bg-opacity-80`}
                    >
                      Risk Level {ingredient.risk_level}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{ingredient.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{ingredient.ai_summary}</p>
                  {ingredient.health_risks && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-500 mb-1">Health Concerns:</p>
                      <div className="flex flex-wrap gap-1">
                        {ingredient.health_risks.slice(0, 3).map((risk, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-red-50">{risk}</Badge>
                        ))}
                        {ingredient.health_risks.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-red-50">+{ingredient.health_risks.length - 3} more</Badge>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span className="text-2xl">{ingredient.name}</span>
                  <Badge className={`
                    ${ingredient.risk_level >= 4 ? 'bg-red-500' : 
                      ingredient.risk_level >= 3 ? 'bg-orange-500' : 
                      'bg-yellow-500'} text-sm px-2 py-1`}
                  >
                    Risk Level {ingredient.risk_level}
                  </Badge>
                </DialogTitle>
                <p className="text-gray-500">{ingredient.category}</p>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-sm">{ingredient.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">AI Summary</h3>
                    <p className="text-sm">{ingredient.ai_summary}</p>
                  </div>

                  {ingredient.health_risks && (
                    <div>
                      <h3 className="font-medium mb-2">Health Risks</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {ingredient.health_risks.map((risk, i) => (
                          <li key={i}>{risk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {ingredient.aliases && ingredient.aliases.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Also Known As</h3>
                      <div className="flex flex-wrap gap-2">
                        {ingredient.aliases.map((alias, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{alias}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {ingredient.banned_in && ingredient.banned_in.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Banned/Restricted In</h3>
                      <div className="flex flex-wrap gap-2">
                        {ingredient.banned_in.map((country, i) => (
                          <Badge key={i} variant="destructive" className="text-xs">{country}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {ingredient.found_in && ingredient.found_in.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Commonly Found In</h3>
                      <div className="flex flex-wrap gap-2">
                        {ingredient.found_in.map((product, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{product}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {ingredient.clean_alternatives && ingredient.clean_alternatives.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Clean Alternatives</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {ingredient.clean_alternatives.map((alt, i) => (
                          <li key={i}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {ingredient.sources && ingredient.sources.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium mb-2">Sources & References</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {ingredient.sources.map((source, i) => (
                      <li key={i}>
                        <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default ToxicIngredientsDatabase;
