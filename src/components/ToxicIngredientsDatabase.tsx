
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  Ban, 
  Heart, 
  Info, 
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToxicIngredient } from '@/types/ToxicIngredients';

// Mock data for toxic ingredients
const mockToxicIngredients: ToxicIngredient[] = [
  {
    id: '1',
    name: 'Red 40',
    aliases: ['Allura Red AC', 'FD&C Red No. 40'],
    category: 'Dye',
    risk_level: 4,
    health_risks: ['Hyperactivity', 'Allergic Reactions', 'Cancer Risk'],
    banned_in: ['Norway', 'Austria', 'Finland'],
    description: 'Synthetic food coloring that has been linked to behavioral issues in children and potential carcinogenic effects in animal studies.',
    ai_summary: 'Red 40 is an artificial food coloring that may cause hyperactivity in children and has been linked to allergic reactions. Several European countries have banned it due to health concerns.',
    found_in: ['Candy', 'Breakfast Cereals', 'Soft Drinks', 'Snack Foods'],
    clean_alternatives: ['Beet Juice', 'Paprika', 'Berry Juices'],
    sources: ['https://pubmed.ncbi.nlm.nih.gov/23026007/', 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2957945/']
  },
  {
    id: '2',
    name: 'Parabens',
    aliases: ['Methylparaben', 'Propylparaben', 'Butylparaben'],
    category: 'Preservative',
    risk_level: 3,
    health_risks: ['Endocrine Disruption', 'Breast Cancer Risk', 'Reproductive Toxicity'],
    banned_in: ['European Union (partially)'],
    description: 'Synthetic preservatives commonly used in cosmetics and personal care products. Studies suggest they may disrupt hormone function and potentially increase cancer risk.',
    ai_summary: 'Parabens are preservatives used in many personal care products that can mimic estrogen in the body, potentially disrupting hormones. Some types have been restricted in EU cosmetics due to health concerns.',
    found_in: ['Shampoos', 'Moisturizers', 'Makeup', 'Toothpaste'],
    clean_alternatives: ['Grapefruit Seed Extract', 'Vitamin E', 'Rosemary Extract'],
    sources: ['https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4158642/', 'https://pubmed.ncbi.nlm.nih.gov/27541256/']
  },
  {
    id: '3',
    name: 'BHA (Butylated Hydroxyanisole)',
    aliases: ['E320'],
    category: 'Preservative',
    risk_level: 5,
    health_risks: ['Endocrine Disruption', 'Cancer', 'Organ System Toxicity'],
    banned_in: ['Japan', 'European Union (in infant foods)'],
    description: 'Synthetic antioxidant used to preserve fats and oils. The National Toxicology Program classifies it as "reasonably anticipated to be a human carcinogen."',
    ai_summary: 'BHA is a preservative that keeps foods from going rancid, but it\'s linked to cancer and hormone disruption. It\'s banned in Japan and limited in the EU, especially in baby foods.',
    found_in: ['Processed Foods', 'Vegetable Oils', 'Potato Chips', 'Cereal'],
    clean_alternatives: ['Vitamin E', 'Rosemary Extract', 'Mixed Tocopherols'],
    sources: ['https://ntp.niehs.nih.gov/whatwestudy/assessments/cancer/roc/index.html', 'https://pubmed.ncbi.nlm.nih.gov/19482919/']
  }
];

const ToxicIngredientsDatabase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<ToxicIngredient | null>(null);
  
  // Filter ingredients based on search term
  const filteredIngredients = mockToxicIngredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.aliases?.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ingredient.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskLevelBadge = (level: number) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[level as keyof typeof colors]}>
        Level {level}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="kleen-heading-h2">Toxic Ingredients Database</h2>
        <Button className="bg-kleen-mint hover:bg-kleen-mint/90">
          <Plus className="mr-2 h-4 w-4" /> Add Ingredient
        </Button>
      </div>
      
      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kleen-gray/60 h-4 w-4" />
          <Input
            placeholder="Search ingredients by name, alias, or category..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Health Risks</TableHead>
                  <TableHead>Banned In</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIngredients.length > 0 ? (
                  filteredIngredients.map((ingredient) => (
                    <TableRow key={ingredient.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {ingredient.name}
                        {ingredient.aliases && ingredient.aliases.length > 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="ml-1 h-3 w-3 text-gray-400 inline" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Also known as: {ingredient.aliases.join(', ')}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </TableCell>
                      <TableCell>{ingredient.category}</TableCell>
                      <TableCell>{getRiskLevelBadge(ingredient.risk_level)}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {ingredient.health_risks.slice(0, 2).map((risk, index) => (
                            <Badge key={index} variant="outline" className="whitespace-nowrap">
                              {risk}
                            </Badge>
                          ))}
                          {ingredient.health_risks.length > 2 && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge variant="outline" className="bg-gray-100">
                                    +{ingredient.health_risks.length - 2}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{ingredient.health_risks.slice(2).join(', ')}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {ingredient.banned_in && ingredient.banned_in.length > 0 ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge variant="destructive" className="whitespace-nowrap">
                                  <Ban className="mr-1 h-3 w-3" />
                                  {ingredient.banned_in.length} {ingredient.banned_in.length === 1 ? 'region' : 'regions'}
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Banned in: {ingredient.banned_in.join(', ')}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="text-gray-500 text-sm">None reported</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedIngredient(ingredient)}
                            >
                              Details
                            </Button>
                          </DialogTrigger>
                          {selectedIngredient && (
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center">
                                  <span className="mr-2">{selectedIngredient.name}</span>
                                  {getRiskLevelBadge(selectedIngredient.risk_level)}
                                </DialogTitle>
                                <DialogDescription>
                                  Category: {selectedIngredient.category}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Technical Description</h3>
                                    <p className="text-sm text-gray-600">{selectedIngredient.description}</p>
                                  </div>
                                  
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">AI Summary</h3>
                                    <div className="bg-blue-50 p-3 rounded-md">
                                      <p className="text-sm text-gray-700">{selectedIngredient.ai_summary}</p>
                                    </div>
                                  </div>
                                  
                                  {selectedIngredient.aliases && selectedIngredient.aliases.length > 0 && (
                                    <div>
                                      <h3 className="text-sm font-medium mb-2">Also Known As</h3>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedIngredient.aliases.map((alias, index) => (
                                          <Badge key={index} variant="outline">
                                            {alias}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {selectedIngredient.banned_in && selectedIngredient.banned_in.length > 0 && (
                                    <div>
                                      <h3 className="text-sm font-medium mb-2">Banned or Restricted In</h3>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedIngredient.banned_in.map((location, index) => (
                                          <Badge key={index} variant="destructive">
                                            {location}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-sm font-medium mb-2">Health Risks</h3>
                                    <div className="flex flex-wrap gap-1">
                                      {selectedIngredient.health_risks.map((risk, index) => (
                                        <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                          <AlertTriangle className="mr-1 h-3 w-3" />
                                          {risk}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {selectedIngredient.found_in && selectedIngredient.found_in.length > 0 && (
                                    <div>
                                      <h3 className="text-sm font-medium mb-2">Commonly Found In</h3>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedIngredient.found_in.map((item, index) => (
                                          <Badge key={index} variant="outline" className="bg-gray-100">
                                            {item}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {selectedIngredient.clean_alternatives && selectedIngredient.clean_alternatives.length > 0 && (
                                    <div>
                                      <h3 className="text-sm font-medium mb-2">Clean Alternatives</h3>
                                      <div className="flex flex-wrap gap-1">
                                        {selectedIngredient.clean_alternatives.map((alternative, index) => (
                                          <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                            <Heart className="mr-1 h-3 w-3" />
                                            {alternative}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {selectedIngredient.sources && selectedIngredient.sources.length > 0 && (
                                    <div>
                                      <h3 className="text-sm font-medium mb-2">Scientific Sources</h3>
                                      <ul className="space-y-1 text-sm">
                                        {selectedIngredient.sources.map((source, index) => (
                                          <li key={index}>
                                            <a 
                                              href={source} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="text-blue-600 hover:text-blue-800 flex items-center"
                                            >
                                              Source {index + 1}
                                              <ExternalLink className="ml-1 h-3 w-3" />
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          )}
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                      No ingredients found matching your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToxicIngredientsDatabase;
