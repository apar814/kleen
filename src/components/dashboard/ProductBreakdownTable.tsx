
import React from 'react';
import { motion } from 'framer-motion';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Product } from '@/types/Product';
import { getToxicityColor, getToxicityLevel } from '@/utils/metricsUtils';

interface ProductBreakdownTableProps {
  cartItems: Product[];
  cleanAlternatives: Product[];
}

const ProductBreakdownTable: React.FC<ProductBreakdownTableProps> = ({ cartItems, cleanAlternatives }) => {
  return (
    <motion.div
      custom={5}
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
                const improvement = alternative ? alternative.kleenScore - item.kleenScore : 0;
                const itemToxicityLevel = getToxicityLevel(item.kleenScore || 0);
                const alternativeToxicityLevel = alternative ? 
                  getToxicityLevel(alternative.kleenScore || 0) : 'low';
                
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div 
                          className={`w-10 h-3 rounded-full mr-2`} 
                          style={{ backgroundColor: getToxicityColor(itemToxicityLevel) }} 
                        />
                        {item.kleenScore}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {alternative ? alternative.name : 'No alternative'}
                    </TableCell>
                    <TableCell>
                      {alternative ? (
                        <div className="flex items-center">
                          <div 
                            className={`w-10 h-3 rounded-full mr-2`} 
                            style={{ backgroundColor: getToxicityColor(alternativeToxicityLevel) }}
                          />
                          {alternative.kleenScore}
                        </div>
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell className={improvement > 0 ? "text-kleen-mint" : ""}>
                      {improvement > 0 ? `+${improvement}` : improvement}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductBreakdownTable;
