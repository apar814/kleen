
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Brain, Heart, Lungs, Shield } from "lucide-react";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HealthCategory {
  name: string;
  score: number;
  icon: React.ReactNode;
  impact: string;
}

interface HealthScoreOverviewProps {
  className?: string;
}

const healthCategories: HealthCategory[] = [
  {
    name: "Brain Health",
    score: 65,
    icon: <Brain className="h-5 w-5" />,
    impact: "Products with neurotoxins may affect cognitive function and clarity."
  },
  {
    name: "Hormone Balance",
    score: 45,
    icon: <Activity className="h-5 w-5" />,
    impact: "Endocrine disruptors can interfere with normal hormone function."
  },
  {
    name: "Respiratory System",
    score: 75,
    icon: <Lungs className="h-5 w-5" />,
    impact: "VOCs and fragrances may irritate airways and reduce air quality."
  },
  {
    name: "Overall Wellness",
    score: 60,
    icon: <Shield className="h-5 w-5" />,
    impact: "Combined exposure to multiple toxins can affect general wellbeing."
  }
];

const HealthScoreOverview: React.FC<HealthScoreOverviewProps> = ({ className }) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Heart className="mr-2 h-5 w-5 text-kleen-teal" />
          Health Impact Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {healthCategories.map((category, index) => {
            // Determine color based on score
            let scoreColor = 'text-kleen-red';
            let progressColor = 'bg-kleen-red';
            
            if (category.score >= 70) {
              scoreColor = 'text-kleen-mint';
              progressColor = 'bg-kleen-mint';
            } else if (category.score >= 40) {
              scoreColor = 'text-yellow-500';
              progressColor = 'bg-yellow-500';
            }
            
            return (
              <motion.div 
                key={category.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-1.5 rounded-full bg-gray-100 mr-2">
                      {category.icon}
                    </div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <span className={cn("text-sm font-bold", scoreColor)}>{category.score}</span>
                </div>
                
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <motion.div 
                    className={cn("h-2 rounded-full", progressColor)}
                    initial={{ width: 0 }}
                    animate={{ width: `${category.score}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  />
                </div>
                
                <p className="text-xs text-gray-500">{category.impact}</p>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthScoreOverview;
