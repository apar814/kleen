
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, AlertTriangle } from 'lucide-react';

interface IngredientsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  riskLevels: { value: number; label: string }[];
  selectedRiskLevels: number[];
  toggleRiskLevel: (level: number) => void;
  resetFilters: () => void;
}

const IngredientsFilter: React.FC<IngredientsFilterProps> = ({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategories,
  toggleCategory,
  riskLevels,
  selectedRiskLevels,
  toggleRiskLevel,
  resetFilters,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search ingredients, aliases, or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2"
        />
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Filter size={16} />
              <span>Category</span>
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm w-56">
            {categories.map((category) => (
              <DropdownMenuCheckboxItem
                key={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              >
                {category}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <AlertTriangle size={16} />
              <span>Risk Level</span>
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm w-56">
            {riskLevels.map((level) => (
              <DropdownMenuCheckboxItem
                key={level.value}
                checked={selectedRiskLevels.includes(level.value)}
                onCheckedChange={() => toggleRiskLevel(level.value)}
              >
                {level.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default IngredientsFilter;
