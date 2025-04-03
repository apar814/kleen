
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IngredientsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const IngredientsTabs: React.FC<IngredientsTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList>
        <TabsTrigger value="all">All Ingredients</TabsTrigger>
        <TabsTrigger value="high-risk">High Risk</TabsTrigger>
        <TabsTrigger value="banned">Banned Internationally</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default IngredientsTabs;
