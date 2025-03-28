
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Activity, ShoppingCart } from "lucide-react";
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CartAnalysis from '@/components/CartAnalysis';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import DashboardLayout from '@/components/DashboardLayout';

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'analytics';
  
  // Set the tab based on URL parameters
  useEffect(() => {
    const validTabs = ['analytics', 'cart'];
    if (!validTabs.includes(tab)) {
      setSearchParams({ tab: 'analytics' });
    }
  }, [tab, setSearchParams]);
  
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Empowering you to live toxin-free through smarter shopping"
    >
      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="analytics" className="text-base">
            <Activity className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="cart" className="text-base">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart Analysis
          </TabsTrigger>
        </TabsList>
        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>
        <TabsContent value="cart">
          <CartAnalysis />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
