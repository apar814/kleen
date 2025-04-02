
import React from 'react';
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyCartStateProps {
  isAnalyzing: boolean;
}

const EmptyCartState: React.FC<EmptyCartStateProps> = ({ isAnalyzing }) => {
  return (
    <Card className="border-dashed border-2 border-gray-300 bg-gray-50">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 mb-4 text-center">
          <Search className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-lg">
            {isAnalyzing ? "Analyzing your cart..." : "Click 'Analyze Cart' to check your cart for cleaner alternatives."}
          </p>
        </div>
        {!isAnalyzing && (
          <div className="text-sm text-gray-400 text-center max-w-md">
            <p>Your cart will be analyzed for toxic or controversial ingredients, and we'll suggest cleaner alternatives.</p>
          </div>
        )}
        {isAnalyzing && (
          <div className="animate-pulse mt-4">
            <div className="h-2 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-2 bg-gray-300 rounded w-40"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyCartState;
