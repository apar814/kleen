
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Database, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const IngredientAnalysisCard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Database className="h-5 w-5 text-kleen-mint mr-2" />
          Ingredient Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Access Kleen's database of toxic ingredients, their health impacts, and clean alternatives for informed decision-making.
        </p>
        <div className="space-y-3">
          <div className="flex items-start">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              Powered by scientific research and regulatory data from global health authorities.
            </p>
          </div>
          <div className="flex items-start">
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-gray-600">
              Updated regularly with new ingredients and emerging research findings.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate('/ingredient-database')}
        >
          Access Database
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IngredientAnalysisCard;
