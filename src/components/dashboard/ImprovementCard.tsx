
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import KleenScore from '@/components/KleenScore';

interface ImprovementCardProps {
  avgAlternativeScore: number;
  percentImprovement: number;
}

const ImprovementCard: React.FC<ImprovementCardProps> = ({ avgAlternativeScore, percentImprovement }) => {
  return (
    <motion.div
      custom={1}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
          }
        })
      }}
      initial="hidden"
      animate="visible"
    >
      <Card className="overflow-hidden border-kleen-sage/30">
        <CardHeader className="bg-gradient-to-r from-kleen-cream to-kleen-white pb-2">
          <CardTitle className="text-xl font-medium">Potential Improvement</CardTitle>
          <CardDescription>Cleanliness after substitutions</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <KleenScore score={avgAlternativeScore} size="md" />
            <div className="text-right">
              <div className="text-2xl font-bold">{avgAlternativeScore}/100</div>
              <div className="flex items-center justify-end mt-1 text-sm">
                <span className="text-kleen-mint font-medium mr-1">+{percentImprovement}%</span>
                <TrendingUp className="w-4 h-4 text-kleen-mint" />
              </div>
              <p className="text-xs text-kleen-gray mt-1">Improvement from original cart</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ImprovementCard;
