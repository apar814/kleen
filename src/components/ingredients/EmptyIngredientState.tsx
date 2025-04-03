
import React from 'react';

const EmptyIngredientState: React.FC = () => {
  return (
    <div className="text-center p-8">
      <h3 className="text-lg font-medium mb-2">No ingredients matched your search</h3>
      <p className="text-gray-500">Try adjusting your filters or search query</p>
    </div>
  );
};

export default EmptyIngredientState;
