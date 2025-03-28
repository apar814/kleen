
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, BookOpen, Leaf } from "lucide-react";
import { motion } from 'framer-motion';

interface ToxinCategory {
  name: string;
  description: string;
  commonIngredients: string[];
  icon: React.ReactNode;
}

const toxinCategories: ToxinCategory[] = [
  {
    name: "Endocrine Disruptors",
    description: "Chemicals that can interfere with the body's hormone system, potentially causing developmental, reproductive, and neurological issues.",
    commonIngredients: ["Phthalates", "BPA", "Parabens", "Triclosan"],
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />
  },
  {
    name: "Synthetic Fragrances",
    description: "Can contain hundreds of undisclosed chemicals, many linked to allergies, migraines, asthma, and hormone disruption.",
    commonIngredients: ["Fragrance", "Parfum", "Musk Ketone", "Synthetic Musk"],
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />
  },
  {
    name: "Safer Alternatives",
    description: "Natural ingredients that provide similar benefits without harmful effects.",
    commonIngredients: ["Essential Oils", "Plant Extracts", "Mineral-based Preservatives", "Organic Compounds"],
    icon: <Leaf className="h-5 w-5 text-kleen-mint" />
  }
];

const ToxinEducation: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-2">
        <BookOpen className="mr-2 h-5 w-5 text-kleen-teal" />
        <h2 className="text-xl font-medium">Toxin Education</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {toxinCategories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">Common ingredients:</p>
                  <div className="flex flex-wrap gap-1">
                    {category.commonIngredients.map(ingredient => (
                      <span 
                        key={ingredient} 
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToxinEducation;
