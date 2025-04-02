
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import KleenScore from '@/components/KleenScore';

interface CartHealthCardProps {
  avgCartScore: number;
  scoreImprovement: number;
}

const CartHealthCard: React.FC<CartHealthCardProps> = ({ avgCartScore, scoreImprovement }) => {
  return (
    <motion.div
      custom={0}
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
          <CardTitle className="text-xl font-medium">Cart Health</CardTitle>
          <CardDescription>Current cart cleanliness score</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <KleenScore score={avgCartScore} size="md" />
            <div className="text-right">
              <div className="text-2xl font-bold">{avgCartScore}/100</div>
              <div className="flex items-center justify-end mt-1 text-sm">
                <span className={`${scoreImprovement > 0 ? 'text-kleen-mint' : 'text-kleen-red'} font-medium mr-1`}>
                  {scoreImprovement > 0 ? '+' : ''}{scoreImprovement}
                </span>
                {scoreImprovement > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-kleen-mint" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-kleen-red" />
                )}
              </div>
              <p className="text-xs text-kleen-gray mt-1">
                {scoreImprovement > 0 ? 'Potential improvement with alternatives' : 'Below recommended'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CartHealthCard;
