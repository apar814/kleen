
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ShoppingCart, Heart, Info, Settings } from "lucide-react";
import KleenLogo from '@/components/KleenLogo';
import CartAnalysis from '@/components/CartAnalysis';

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center py-4">
            <KleenLogo size="md" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
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
          <SidebarFooter className="p-4 text-xs text-gray-500">
            <div>Kleen v0.1.0 (MVP)</div>
            <div className="mt-1">Making shopping cleaner, one cart at a time.</div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-6">
          <CartAnalysis />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
