
import React from 'react';

interface IngredientsCountProps {
  filteredCount: number;
  totalCount: number;
}

const IngredientsCount: React.FC<IngredientsCountProps> = ({ filteredCount, totalCount }) => {
  return (
    <div className="text-sm text-gray-500 mb-2">
      Showing {filteredCount} of {totalCount} ingredients
    </div>
  );
};

export default IngredientsCount;
