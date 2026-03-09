
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
  LogOut,
  Home,
  ChevronLeft,
  Menu,
  Database,
  Globe,
  Grid3X3,
  FileText,
  ChefHat,
  Scale,
  ShoppingBag,
  Trophy,
  Users,
  Bell,
  BarChart3,
  MessageSquare,
  ListOrdered,
  Shield
} from "lucide-react";
import KleenLogo from '@/components/KleenLogo';
import { Button } from "./ui/button";
import { useAuth } from '@/contexts/AuthContext';

interface AppSidebarProps {
  children: React.ReactNode;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const { logout, user } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isActiveWithQuery = (path: string, query: string) => {
    return location.pathname === path && location.search.includes(query);
  };

  return (
    <SidebarProvider defaultOpen={!collapsed}>
      <div className="flex min-h-screen w-full bg-kleen-light">
        <Sidebar className="border-r border-gray-100 bg-white">
          <SidebarHeader className="flex items-center justify-between py-6 px-4">
            <Link to="/" className={collapsed ? "hidden" : "block"}>
              <KleenLogo size="md" />
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)}
              className="text-kleen-gray/70 hover:text-kleen-mint"
            >
              {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <p className={cn("px-4 mb-4 text-label text-kleen-gray/60 font-medium uppercase tracking-wider text-xs", collapsed && "hidden")}>
              MAIN MENU
            </p>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Home" isActive={isActive('/')}>
                  <Link to="/" className="flex items-center w-full">
                    <Home className="mr-2" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" isActive={isActive('/dashboard')}>
                  <Link to="/dashboard" className="flex items-center w-full">
                    <BarChart2 className="mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Product Search" isActive={isActive('/search')}>
                  <Link to="/search" className="flex items-center w-full">
                    <Search className="mr-2" />
                    <span>Product Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Compare Products" isActive={isActive('/compare')}>
                  <Link to="/compare" className="flex items-center w-full">
                    <Scale className="mr-2" />
                    <span>Compare Products</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Receipt Scanner" isActive={isActive('/receipt-scanner')}>
                  <Link to="/receipt-scanner" className="flex items-center w-full">
                    <FileText className="mr-2" />
                    <span>Receipt Scanner</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Browse Categories" isActive={isActive('/categories')}>
                  <Link to="/categories" className="flex items-center w-full">
                    <Grid3X3 className="mr-2" />
                    <span>Browse Categories</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Recipe Builder" isActive={isActive('/recipes')}>
                  <Link to="/recipes" className="flex items-center w-full">
                    <ChefHat className="mr-2" />
                    <span>Recipe Builder</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Banned Ingredients" isActive={isActive('/banned-ingredients')}>
                  <Link to="/banned-ingredients" className="flex items-center w-full">
                    <Globe className="mr-2" />
                    <span>Banned Worldwide</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Grocery List" isActive={isActive('/grocery-list')}>
                  <Link to="/grocery-list" className="flex items-center w-full">
                    <ShoppingBag className="mr-2" />
                    <span>Grocery List</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Challenges" isActive={isActive('/challenges')}>
                  <Link to="/challenges" className="flex items-center w-full">
                    <Trophy className="mr-2" />
                    <span>Challenges</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Community Feed" isActive={isActive('/community')}>
                  <Link to="/community" className="flex items-center w-full">
                    <Users className="mr-2" />
                    <span>Community</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="AI Nutritionist" isActive={isActive('/ask')}>
                  <Link to="/ask" className="flex items-center w-full">
                    <MessageSquare className="mr-2" />
                    <span>AI Nutritionist</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Notifications" isActive={isActive('/notifications')}>
                  <Link to="/notifications" className="flex items-center w-full">
                    <Bell className="mr-2" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Weekly Report" isActive={isActive('/reports/weekly')}>
                  <Link to="/reports/weekly" className="flex items-center w-full">
                    <BarChart3 className="mr-2" />
                    <span>Weekly Report</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Product Requests" isActive={isActive('/product-requests')}>
                  <Link to="/product-requests" className="flex items-center w-full">
                    <ListOrdered className="mr-2" />
                    <span>Product Requests</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Admin" isActive={isActive('/admin')}>
                  <Link to="/admin" className="flex items-center w-full">
                    <Shield className="mr-2" />
                    <span>Admin</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Ingredient Database" isActive={isActive('/ingredients') || isActive('/toxic-ingredients')}>
                  <Link to="/ingredients" className="flex items-center w-full">
                    <Database className="mr-2" />
                    <span>Ingredient Database</span>
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
            </SidebarMenu>
            
            <p className={cn("px-4 mb-4 mt-8 text-label text-kleen-gray/60 font-medium uppercase tracking-wider text-xs", collapsed && "hidden")}>
              YOUR ACCOUNT
            </p>
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
                <SidebarMenuButton tooltip="Settings" isActive={isActive('/settings')}>
                  <Link to="/settings" className="flex items-center w-full">
                    <Settings className="mr-2" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Logout">
                  <button className="flex items-center w-full" onClick={logout}>
                    <LogOut className="mr-2" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className={cn("p-4 text-label text-kleen-gray/60", collapsed && "hidden")}>
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

// This utility function handles conditional className merging
const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export default AppSidebar;
