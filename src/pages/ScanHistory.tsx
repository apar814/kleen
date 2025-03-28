
import React from 'react';
import { CalendarIcon, SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for scan history
const mockScans = [
  {
    id: '1',
    date: 'June 15, 2023',
    products: 5,
    toxicProducts: 3,
    kleenScore: 65,
    swaps: 4
  },
  {
    id: '2',
    date: 'May 29, 2023',
    products: 3,
    toxicProducts: 1,
    kleenScore: 78,
    swaps: 2
  },
  {
    id: '3',
    date: 'April 12, 2023',
    products: 7,
    toxicProducts: 5,
    kleenScore: 42,
    swaps: 6
  }
];

const ScanHistory = () => {
  return (
    <DashboardLayout title="Scan History" description="View your past cart scans and analysis results">
      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kleen-gray/60 h-4 w-4" />
          <Input
            placeholder="Search scans..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          Filter by date
        </Button>
      </div>
      
      <div className="space-y-4">
        {mockScans.map((scan, index) => (
          <motion.div
            key={scan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{scan.date}</CardTitle>
                    <CardDescription>Cart analysis with {scan.products} products</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      scan.kleenScore >= 70 ? 'bg-kleen-mint/10 text-kleen-mint' :
                      scan.kleenScore >= 40 ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-kleen-red/10 text-kleen-red'
                    }`}>
                      Kleen Score: {scan.kleenScore}/100
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-kleen-gray/70">Total Products</span>
                    <span className="text-xl font-semibold">{scan.products}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-kleen-gray/70">Toxic Products</span>
                    <span className="text-xl font-semibold text-kleen-red">{scan.toxicProducts}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-kleen-gray/70">Clean Swaps</span>
                    <span className="text-xl font-semibold text-kleen-mint">{scan.swaps}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ScanHistory;
