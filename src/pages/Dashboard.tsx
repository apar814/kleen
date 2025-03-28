
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ShoppingCart, Heart, Info, Settings, BarChart2 } from "lucide-react";
import KleenLogo from '@/components/KleenLogo';
import CartAnalysis from '@/components/CartAnalysis';

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
                <SidebarMenuButton tooltip="Dashboard" isActive={false}>
                  <BarChart2 />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Cart Analysis" isActive={true}>
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
            <div className="mt-1">Making shopping cleaner, one cart at a time.</div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-8 bg-gray-50">
          <header className="mb-8">
            <h1 className="kleen-heading-h1 mb-2">Cart Analysis</h1>
            <p className="kleen-body text-kleen-gray/80">Analyze your shopping cart for healthier alternatives</p>
          </header>
          <CartAnalysis />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
