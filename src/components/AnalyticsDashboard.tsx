
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import KleenScore from './KleenScore';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { cleanAlternatives, cartItems, mockProducts } from '@/data/mockData';

// Analytics data
const scoreImprovementData = [
  { name: 'Face Care', original: 45, improved: 92, improvement: 47 },
  { name: 'Body Care', original: 55, improved: 88, improvement: 33 },
  { name: 'Skin Care', original: 30, improved: 95, improvement: 65 },
  { name: 'Hair Care', original: 52, improved: 86, improvement: 34 },
];

const toxicityBreakdown = [
  { name: 'High Toxicity', value: 15, color: '#D9534F' },
  { name: 'Medium Toxicity', value: 20, color: '#F59E0B' },
  { name: 'Low Toxicity', value: 65, color: '#7AE582' },
];

const monthlyTrends = [
  { month: 'Jan', score: 42 },
  { month: 'Feb', score: 48 },
  { month: 'Mar', score: 54 },
  { month: 'Apr', score: 59 },
  { month: 'May', score: 65 },
  { month: 'Jun', score: 73 },
  { month: 'Jul', score: 82 },
];

const AnalyticsDashboard: React.FC = () => {
  // Calculate total cart score
  const avgCartScore = Math.round(cartItems.reduce((sum, item) => sum + item.kleenScore, 0) / cartItems.length);
  const avgAlternativeScore = Math.round(cleanAlternatives.reduce((sum, item) => sum + item.kleenScore, 0) / cleanAlternatives.length);
  const scoreImprovement = avgAlternativeScore - avgCartScore;
  const percentImprovement = Math.round((scoreImprovement / avgCartScore) * 100);

  const cardVariants = {
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
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Summary Card */}
        <motion.div
          custom={0}
          variants={cardVariants}
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

        {/* Improvement Card */}
        <motion.div
          custom={1}
          variants={cardVariants}
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

        {/* Total Products Card */}
        <motion.div
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="overflow-hidden border-kleen-sage/30">
            <CardHeader className="bg-gradient-to-r from-kleen-cream to-kleen-white pb-2">
              <CardTitle className="text-xl font-medium">Cart Analysis</CardTitle>
              <CardDescription>Product breakdown</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mt-2">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold">{cartItems.length}</div>
                    <div className="text-xs text-kleen-gray mt-1">Products</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-500">{cartItems.filter(p => p.kleenScore < 70 && p.kleenScore >= 40).length}</div>
                    <div className="text-xs text-kleen-gray mt-1">Caution</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-kleen-red">{cartItems.filter(p => p.kleenScore < 40).length}</div>
                    <div className="text-xs text-kleen-gray mt-1">High Risk</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Score Improvement Chart */}
        <motion.div
          custom={3}
          variants={cardVariants}
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
                      data={scoreImprovementData}
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

        {/* Toxicity Breakdown */}
        <motion.div
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="border-kleen-sage/30">
            <CardHeader>
              <CardTitle>Toxicity Breakdown</CardTitle>
              <CardDescription>Proportion of ingredient toxicity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={toxicityBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {toxicityBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Table */}
      <motion.div
        custom={5}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-kleen-sage/30">
          <CardHeader>
            <CardTitle>Product Breakdown</CardTitle>
            <CardDescription>Detailed analysis of cart products and alternatives</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Original Score</TableHead>
                  <TableHead>Alternative</TableHead>
                  <TableHead>Improved Score</TableHead>
                  <TableHead>Improvement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item, index) => {
                  const alternative = cleanAlternatives[index];
                  const improvement = alternative.kleenScore - item.kleenScore;
                  
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-10 h-3 rounded-full mr-2 ${
                            item.kleenScore >= 70 ? 'bg-kleen-mint' :
                            item.kleenScore >= 40 ? 'bg-yellow-500' : 'bg-kleen-red'
                          }`} />
                          {item.kleenScore}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{alternative.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-10 h-3 rounded-full mr-2 ${
                            alternative.kleenScore >= 70 ? 'bg-kleen-mint' :
                            alternative.kleenScore >= 40 ? 'bg-yellow-500' : 'bg-kleen-red'
                          }`} />
                          {alternative.kleenScore}
                        </div>
                      </TableCell>
                      <TableCell className="text-kleen-mint">+{improvement}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;
