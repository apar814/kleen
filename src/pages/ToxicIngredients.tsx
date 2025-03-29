
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, Search, AlertTriangle, Filter } from "lucide-react";
import { ToxicIngredient } from '@/types/ToxicIngredients';

// Mock data based on the schema from masterplan.md
const mockToxicIngredients: ToxicIngredient[] = [
  {
    id: '1',
    name: 'Red 40',
    aliases: ['Allura Red AC', 'FD&C Red No. 40'],
    category: 'Dye',
    risk_level: 4,
    health_risks: ['ADHD', 'Allergic reactions', 'Hyperactivity in children'],
    banned_in: ['Norway', 'Austria', 'France'],
    description: 'Synthetic food dye derived from petroleum. Studies suggest it may cause behavioral issues in children and has been linked to allergic reactions.',
    ai_summary: 'Red 40 is a common artificial food coloring that gives foods a bright red appearance. Research suggests it may trigger hyperactivity in children and cause allergic reactions in some people. Several European countries have banned it due to safety concerns.',
    found_in: ['Candy', 'Soft drinks', 'Breakfast cereals', 'Medications'],
    clean_alternatives: ['Beet juice', 'Paprika', 'Berry juices', 'Annatto'],
    sources: ['https://pubmed.ncbi.nlm.nih.gov/23026007/', 'https://www.sciencedirect.com/science/article/abs/pii/S0278691512005400'],
    created_by: 'system',
    updated_at: new Date('2023-10-15').toISOString(),
  },
  {
    id: '2',
    name: 'Triclosan',
    aliases: ['5-chloro-2-(2,4-dichlorophenoxy)phenol', 'TCS'],
    category: 'Antimicrobial',
    risk_level: 5,
    health_risks: ['Endocrine disruption', 'Antibiotic resistance', 'Environmental toxicity'],
    banned_in: ['USA (in certain products)', 'EU'],
    description: 'Antibacterial chemical used in consumer products. May interfere with hormone function and contribute to antibiotic resistance.',
    ai_summary: 'Triclosan is an antibacterial chemical found in soaps, toothpastes, and other personal care products. Studies show it can disrupt hormone systems, potentially affecting thyroid function. It may also contribute to antibiotic resistance and harm aquatic ecosystems when washed down drains.',
    found_in: ['Antibacterial soap', 'Toothpaste', 'Deodorants', 'Cleaning products'],
    clean_alternatives: ['Tea tree oil products', 'Regular soap and water', 'Essential oil-based cleansers'],
    sources: ['https://www.fda.gov/consumers/consumer-updates/5-things-know-about-triclosan', 'https://pubmed.ncbi.nlm.nih.gov/26528805/'],
    created_by: 'system',
    updated_at: new Date('2023-11-20').toISOString(),
  },
  {
    id: '3',
    name: 'BHA (Butylated hydroxyanisole)',
    aliases: ['E320'],
    category: 'Preservative',
    risk_level: 4,
    health_risks: ['Cancer risk', 'Endocrine disruption', 'Allergic reactions'],
    banned_in: ['Japan', 'EU (restricted)'],
    description: 'Synthetic antioxidant preservative that may have endocrine-disrupting effects and potential carcinogenic properties.',
    ai_summary: 'BHA is a preservative added to many foods and personal care products to extend shelf life. The National Toxicology Program classifies it as "reasonably anticipated to be a human carcinogen." Animal studies show it can affect hormone levels and may cause cancer with high doses over time.',
    found_in: ['Processed foods', 'Packaged snacks', 'Lipsticks', 'Moisturizers'],
    clean_alternatives: ['Vitamin E (Tocopherol)', 'Rosemary extract', 'Ascorbic acid (Vitamin C)'],
    sources: ['https://ntp.niehs.nih.gov/ntp/roc/content/profiles/butylatedhydroxyanisole.pdf'],
    created_by: 'system',
    updated_at: new Date('2024-01-05').toISOString(),
  }
];

const fetchToxicIngredients = async (): Promise<ToxicIngredient[]> => {
  // In a real implementation, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockToxicIngredients), 500);
  });
};

const ToxicIngredients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedIngredient, setSelectedIngredient] = useState<ToxicIngredient | null>(null);
  
  const { data: ingredients = [], isLoading } = useQuery({
    queryKey: ['toxicIngredients'],
    queryFn: fetchToxicIngredients,
  });

  // Filter ingredients based on search term and category
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ingredient.aliases?.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory ? ingredient.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Extract unique categories for filter
  const categories = [...new Set(ingredients.map(item => item.category))];

  const getRiskLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-green-200 text-green-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-start gap-6 mb-8">
        <h1 className="text-3xl font-semibold">Toxic Ingredients Database</h1>
        <p className="text-muted-foreground">
          Our comprehensive database of ingredients with potential health concerns. 
          We track risk levels, health impacts, and cleaner alternatives.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search by ingredient name or alias..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-2">
          <select 
            className="px-4 py-2 border rounded-md bg-white"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}>
            Clear Filters
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Ingredients ({filteredIngredients.length})</span>
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" /> Risk Level Legend:
              <span className="ml-1 px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs">1-2 Low</span>
              <span className="ml-1 px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs">3 Medium</span>
              <span className="ml-1 px-2 py-0.5 rounded bg-red-100 text-red-800 text-xs">4-5 High</span>
            </Badge>
          </CardTitle>
          <CardDescription>
            Browse our database of ingredients flagged for potential health concerns
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading ingredients database...</div>
          ) : filteredIngredients.length === 0 ? (
            <div className="text-center py-8">No ingredients found matching your search criteria.</div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingredient</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Risk Level</TableHead>
                    <TableHead>Health Risks</TableHead>
                    <TableHead>Found In</TableHead>
                    <TableHead>Banned In</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIngredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                      <TableCell className="font-medium">
                        {ingredient.name}
                        {ingredient.aliases && ingredient.aliases.length > 0 && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Also known as: {ingredient.aliases.join(', ')}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{ingredient.category}</TableCell>
                      <TableCell>
                        <Badge className={`${getRiskLevelColor(ingredient.risk_level)} font-semibold`}>
                          {ingredient.risk_level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {ingredient.health_risks && ingredient.health_risks.map((risk, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {risk}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {ingredient.found_in && ingredient.found_in.slice(0, 2).join(', ')}
                        {ingredient.found_in && ingredient.found_in.length > 2 && '...'}
                      </TableCell>
                      <TableCell>
                        {ingredient.banned_in && ingredient.banned_in.join(', ')}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-1"
                              onClick={() => setSelectedIngredient(ingredient)}
                            >
                              <Info className="h-3 w-3" /> View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            {selectedIngredient && (
                              <>
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    {selectedIngredient.name}
                                    <Badge className={getRiskLevelColor(selectedIngredient.risk_level)}>
                                      Risk Level: {selectedIngredient.risk_level}
                                    </Badge>
                                  </DialogTitle>
                                  <DialogDescription>
                                    {selectedIngredient.category} • 
                                    {selectedIngredient.banned_in && selectedIngredient.banned_in.length > 0 && 
                                      ` Banned in ${selectedIngredient.banned_in.join(', ')}`}
                                  </DialogDescription>
                                </DialogHeader>
                                <ScrollArea className="max-h-[60vh]">
                                  <div className="space-y-6 p-4">
                                    <div>
                                      <h3 className="font-semibold mb-2">AI Summary</h3>
                                      <p className="text-muted-foreground">
                                        {selectedIngredient.ai_summary}
                                      </p>
                                    </div>
                                    
                                    <div>
                                      <h3 className="font-semibold mb-2">Technical Description</h3>
                                      <p className="text-muted-foreground">
                                        {selectedIngredient.description}
                                      </p>
                                    </div>
                                    
                                    {selectedIngredient.aliases && selectedIngredient.aliases.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold mb-2">Also Known As</h3>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedIngredient.aliases.map((alias, i) => (
                                            <Badge key={i} variant="outline">{alias}</Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {selectedIngredient.health_risks && selectedIngredient.health_risks.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold mb-2">Health Risks</h3>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedIngredient.health_risks.map((risk, i) => (
                                            <Badge key={i} variant="destructive">{risk}</Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {selectedIngredient.found_in && selectedIngredient.found_in.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold mb-2">Commonly Found In</h3>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedIngredient.found_in.map((product, i) => (
                                            <Badge key={i} variant="secondary">{product}</Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {selectedIngredient.clean_alternatives && selectedIngredient.clean_alternatives.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold mb-2">Cleaner Alternatives</h3>
                                        <div className="flex flex-wrap gap-2">
                                          {selectedIngredient.clean_alternatives.map((alt, i) => (
                                            <Badge key={i} variant="outline" className="bg-kleen-mint/10 text-kleen-mint border-kleen-mint/20">
                                              {alt}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    
                                    {selectedIngredient.sources && selectedIngredient.sources.length > 0 && (
                                      <div>
                                        <h3 className="font-semibold mb-2">Sources</h3>
                                        <ul className="list-disc list-inside text-sm text-muted-foreground">
                                          {selectedIngredient.sources.map((source, i) => (
                                            <li key={i}>
                                              <a href={source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                {source.length > 50 ? `${source.substring(0, 50)}...` : source}
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </ScrollArea>
                              </>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ToxicIngredients;
