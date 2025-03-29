
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import ToxicIngredientsDatabase from '@/components/ToxicIngredientsDatabase';

const IngredientDatabase: React.FC = () => {
  return (
    <DashboardLayout 
      title="Ingredient Intelligence"
      description="Analyze and manage the toxic ingredients database that powers Kleen's analysis"
    >
      <ToxicIngredientsDatabase />
    </DashboardLayout>
  );
};

export default IngredientDatabase;
