
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface ScoreImprovementChartProps {
  data: {
    name: string;
    original: number;
    improved: number;
    improvement: number;
  }[];
}

const ScoreImprovementChart: React.FC<ScoreImprovementChartProps> = ({ data }) => {
  return (
    <motion.div
      custom={3}
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
      <Card className="border-kleen-sage/30">
        <CardHeader>
          <CardTitle>Score Improvement</CardTitle>
          <CardDescription>Before and after using alternatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                original: { color: "#F59E0B" },
                improved: { color: "#7AE582" },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="original" name="Original" fill="var(--color-original)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="improved" name="Improved" fill="var(--color-improved)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ScoreImprovementChart;
