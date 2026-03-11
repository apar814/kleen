
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
  Shield,
  Utensils,
  Droplets,
  Baby,
  Bot,
  Microscope,
  Biohazard,
  FlaskConical,
  Bug,
  Flame,
  Syringe,
  SearchCheck,
  Radiation,
  Activity,
  AlertTriangle,
  BookOpen,
  Award
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
  
  const isActive = (path: string) => location.pathname === path;
  const isActivePrefix = (prefix: string) => location.pathname.startsWith(prefix);

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
              {[
                { path: '/', icon: Home, label: 'Home' },
                { path: '/dashboard', icon: BarChart2, label: 'Dashboard' },
                { path: '/search', icon: Search, label: 'Product Search' },
                { path: '/compare', icon: Scale, label: 'Compare Products' },
                { path: '/receipt-scanner', icon: FileText, label: 'Receipt Scanner' },
                { path: '/categories', icon: Grid3X3, label: 'Browse Categories' },
                { path: '/recipes', icon: ChefHat, label: 'Recipe Builder' },
                { path: '/banned-ingredients', icon: Globe, label: 'Banned Worldwide' },
                { path: '/grocery-list', icon: ShoppingBag, label: 'Grocery List' },
                { path: '/challenges', icon: Trophy, label: 'Challenges' },
                { path: '/community', icon: Users, label: 'Community' },
                { path: '/ask', icon: MessageSquare, label: 'AI Nutritionist' },
                { path: '/notifications', icon: Bell, label: 'Notifications' },
                { path: '/reports/weekly', icon: BarChart3, label: 'Weekly Report' },
                { path: '/product-requests', icon: ListOrdered, label: 'Product Requests' },
                { path: '/admin', icon: Shield, label: 'Admin' },
                { path: '/dine', icon: Utensils, label: 'Dining' },
                { path: '/water', icon: Droplets, label: 'Water & Drinks' },
                { path: '/baby', icon: Baby, label: 'Baby Safety' },
                { path: '/auto-shop', icon: Bot, label: 'Auto-Shop' },
                { path: '/ingredients', icon: Database, label: 'Ingredient Database' },
                { path: '/scan-history', icon: Package, label: 'Scan History' },
              ].map(item => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton tooltip={item.label} isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center w-full">
                      <item.icon className="mr-2" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            
            <p className={cn("px-4 mb-4 mt-8 text-label text-kleen-gray/60 font-medium uppercase tracking-wider text-xs", collapsed && "hidden")}>
              CONTAMINANT INTELLIGENCE
            </p>
            <SidebarMenu>
              {[
                { path: '/dashboard/exposure', icon: Activity, label: 'Total Exposure' },
                { path: '/contaminants/microplastics', icon: Microscope, label: 'Microplastics' },
                { path: '/contaminants/pfas', icon: FlaskConical, label: 'PFAS Chemicals' },
                { path: '/contaminants/packaging', icon: Package, label: 'Packaging Safety' },
                { path: '/contaminants/mycotoxins', icon: Bug, label: 'Mycotoxins' },
                { path: '/contaminants/processing', icon: Flame, label: 'Processing' },
                { path: '/contaminants/residues', icon: Syringe, label: 'Drug Residues' },
                { path: '/contaminants/fraud', icon: SearchCheck, label: 'Food Fraud' },
                { path: '/contaminants/environmental', icon: Radiation, label: 'Environmental' },
                { path: '/recalls', icon: AlertTriangle, label: 'Recalls & Safety' },
                { path: '/contaminants/encyclopedia', icon: BookOpen, label: 'Encyclopedia' },
                { path: '/certified', icon: Award, label: 'Kleen Certified' },
              ].map(item => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton tooltip={item.label} isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center w-full">
                      <item.icon className="mr-2" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <p className={cn("px-4 mb-4 mt-8 text-label text-kleen-gray/60 font-medium uppercase tracking-wider text-xs", collapsed && "hidden")}>
              YOUR ACCOUNT
            </p>
            <SidebarMenu>
              {[
                { path: '/profile', icon: UserCircle, label: 'Profile' },
                { path: '/referral', icon: Share2, label: 'Refer Friends' },
                { path: '/settings', icon: Settings, label: 'Settings' },
              ].map(item => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton tooltip={item.label} isActive={isActive(item.path)}>
                    <Link to={item.path} className="flex items-center w-full">
                      <item.icon className="mr-2" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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

const cn = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export default AppSidebar;
