
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ShoppingCart, Heart, Info, Settings, BarChart2, Plus, Activity, Home } from "lucide-react";
import KleenLogo from '@/components/KleenLogo';
import CartAnalysis from '@/components/CartAnalysis';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-kleen-white">
        <Sidebar className="border-r border-kleen-sage">
          <SidebarHeader className="flex items-center justify-center py-8">
            <KleenLogo size="md" />
          </SidebarHeader>
          <SidebarContent>
            <p className="px-4 mb-4 text-label text-kleen-gray font-medium">MAIN MENU</p>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" isActive={true}>
                  <BarChart2 />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Cart Analysis" isActive={false}>
                  <ShoppingCart />
                  <span>Cart Analysis</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Saved Products">
                  <Heart />
                  <span>Saved Products</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="About">
                  <Info />
                  <span>About Kleen</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 text-label text-kleen-gray">
            <div>Kleen v0.1.0 (MVP)</div>
            <div className="mt-1">Your AI-powered health czar for toxin-free living.</div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-8 bg-gray-50 overflow-auto">
          <motion.header 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="kleen-heading-h1 mb-2">Dashboard</h1>
            <p className="kleen-body text-kleen-gray/80">Empowering you to live toxin-free through smarter shopping</p>
          </motion.header>
          
          <Tabs defaultValue="analytics">
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
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
