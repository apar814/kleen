
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { 
  BarChart2, 
  ShoppingCart, 
  Heart, 
  Package, 
  Search, 
  UserCircle, 
  Share2, 
  Info, 
  Settings, 
  LogOut 
} from "lucide-react";
import KleenLogo from '@/components/KleenLogo';

interface AppSidebarProps {
  children: React.ReactNode;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-kleen-light">
        <Sidebar className="border-r border-gray-100 bg-white">
          <SidebarHeader className="flex items-center justify-center py-8">
            <Link to="/">
              <KleenLogo size="md" />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <p className="px-4 mb-4 text-label text-kleen-gray/60 font-medium uppercase tracking-wider text-xs">MAIN MENU</p>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" isActive={isActive('/dashboard')}>
                  <Link to="/dashboard" className="flex items-center w-full">
                    <BarChart2 className="mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Cart Analysis" isActive={isActive('/dashboard?tab=cart')}>
                  <Link to="/dashboard?tab=cart" className="flex items-center w-full">
                    <ShoppingCart className="mr-2" />
                    <span>Cart Analysis</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Scan History" isActive={isActive('/scan-history')}>
                  <Link to="/scan-history" className="flex items-center w-full">
                    <Package className="mr-2" />
                    <span>Scan History</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Clean Stack" isActive={isActive('/clean-stack')}>
                  <Link to="/clean-stack" className="flex items-center w-full">
                    <Heart className="mr-2" />
                    <span>Clean Stack</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Explore Products" isActive={isActive('/explore')}>
                  <Link to="/explore" className="flex items-center w-full">
                    <Search className="mr-2" />
                    <span>Explore Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Ingredient Database" isActive={isActive('/ingredient-database')}>
                  <Link to="/ingredient-database" className="flex items-center w-full">
                    <Info className="mr-2" />
                    <span>Ingredient Database</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            <p className="px-4 mb-4 mt-8 text-label text-kleen-gray/60 font-medium uppercase tracking-wider text-xs">YOUR ACCOUNT</p>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Profile" isActive={isActive('/profile')}>
                  <Link to="/profile" className="flex items-center w-full">
                    <UserCircle className="mr-2" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Referral" isActive={isActive('/referral')}>
                  <Link to="/referral" className="flex items-center w-full">
                    <Share2 className="mr-2" />
                    <span>Refer Friends</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                  <Link to="#" className="flex items-center w-full">
                    <Settings className="mr-2" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Logout">
                  <Link to="/" className="flex items-center w-full">
                    <LogOut className="mr-2" />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 text-label text-kleen-gray/60">
            <div>Kleen v1.0.0</div>
            <div className="mt-1">Your AI-powered health assistant for toxin-free living.</div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppSidebar;
