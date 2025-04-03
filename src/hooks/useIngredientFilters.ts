
import { useState, useEffect } from 'react';
import { ToxicIngredient } from '@/types/ToxicIngredients';

export const useIngredientFilters = (ingredients: ToxicIngredient[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [filteredIngredients, setFilteredIngredients] = useState<ToxicIngredient[]>(ingredients);

  // Extract unique categories for filter
  const categories = [...new Set(ingredients.map(item => item.category))];

  // Risk levels for filter
  const riskLevels = [
    { value: 1, label: '1 - Low Concern' },
    { value: 2, label: '2 - Slightly Concerning' },
    { value: 3, label: '3 - Moderate Concern' },
    { value: 4, label: '4 - High Concern' },
    { value: 5, label: '5 - Severe Concern' }
  ];

  // Filter ingredients based on search query and filters
  useEffect(() => {
    let results = ingredients;
    
    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      results = results.filter(ingredient => 
        ingredient.name.toLowerCase().includes(lowerCaseQuery) ||
        ingredient.aliases?.some(alias => alias.toLowerCase().includes(lowerCaseQuery)) ||
        ingredient.category.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(ingredient => selectedCategories.includes(ingredient.category));
    }
    
    // Apply risk level filter
    if (selectedRiskLevels.length > 0) {
      results = results.filter(ingredient => selectedRiskLevels.includes(ingredient.risk_level));
    }

    // Apply tab filter
    if (activeTab === 'high-risk') {
      results = results.filter(ingredient => ingredient.risk_level >= 4);
    } else if (activeTab === 'banned') {
      results = results.filter(ingredient => ingredient.banned_in && ingredient.banned_in.length > 0);
    }
    
    setFilteredIngredients(results);
  }, [searchQuery, selectedCategories, selectedRiskLevels, activeTab, ingredients]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Toggle risk level selection
  const toggleRiskLevel = (level: number) => {
    setSelectedRiskLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedRiskLevels([]);
    setActiveTab('all');
  };

  // Get risk level color based on level
  const getRiskLevelColor = (level: number) => {
    switch(level) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-emerald-100 text-emerald-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-orange-100 text-orange-800';
      case 5: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    selectedRiskLevels,
    activeTab,
    setActiveTab,
    filteredIngredients,
    categories,
    riskLevels,
    toggleCategory,
    toggleRiskLevel,
    resetFilters,
    getRiskLevelColor
  };
};
