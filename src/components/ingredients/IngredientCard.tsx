
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { ToxicIngredient } from '@/types/ToxicIngredients';

interface IngredientCardProps {
  ingredient: ToxicIngredient;
  getRiskLevelColor: (level: number) => string;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient, getRiskLevelColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-semibold">{ingredient.name}</h3>
              {ingredient.aliases?.length > 0 && (
                <p className="italic text-gray-500 text-sm">
                  Also known as: {ingredient.aliases.join(', ')}
                </p>
              )}
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
              <p className="text-sm">{ingredient.ai_summary}</p>
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
                    
                    {ingredient.found_in && ingredient.found_in.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-1">Commonly Found In:</h5>
                        <div className="flex flex-wrap gap-1">
                          {ingredient.found_in.map((product, idx) => (
                            <Badge variant="secondary" key={idx}>{product}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {ingredient.sources && ingredient.sources.length > 0 && (
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
            
            {/* View Full Details Link */}
            <Link to={`/ingredients/${ingredient.id}`}>
              <Button variant="outline" className="w-full mt-4">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Ingredient Profile
              </Button>
            </Link>
          </div>
        </CardContent>
        
        {ingredient.clean_alternatives && ingredient.clean_alternatives.length > 0 && (
          <CardFooter className="flex flex-col items-start pt-2">
            <h4 className="font-medium mb-2">Clean Alternatives</h4>
            <div className="flex flex-wrap gap-2">
              {ingredient.clean_alternatives.map((alternative, idx) => (
                <Badge key={idx} variant="secondary" className="bg-green-50 text-green-800 hover:bg-green-100">
                  {alternative}
                </Badge>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default IngredientCard;
