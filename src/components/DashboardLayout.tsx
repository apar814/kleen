
import React, { ReactNode } from 'react';
import KleenLogo from './KleenLogo';
import { Bell, Settings, User, ShoppingCart, BarChart2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  className 
}) => {
  return (
    <div className="min-h-screen bg-kleen-cream flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <KleenLogo size="md" />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-kleen-gray hover:text-kleen-teal-dark transition-colors">Dashboard</a>
              <a href="#" className="text-kleen-gray hover:text-kleen-teal-dark transition-colors">Products</a>
              <a href="#" className="text-kleen-gray hover:text-kleen-teal-dark transition-colors">Your Stack</a>
              <a href="#" className="text-kleen-gray hover:text-kleen-teal-dark transition-colors">Values</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-kleen-gray">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-kleen-gray">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-kleen-gray">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <KleenLogo size="sm" />
              <p className="text-sm text-kleen-gray mt-2">
                Making clean shopping decisions simple
              </p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-kleen-gray hover:text-kleen-teal-dark transition-colors">Privacy</a>
              <a href="#" className="text-sm text-kleen-gray hover:text-kleen-teal-dark transition-colors">Terms</a>
              <a href="#" className="text-sm text-kleen-gray hover:text-kleen-teal-dark transition-colors">Help</a>
              <a href="#" className="text-sm text-kleen-gray hover:text-kleen-teal-dark transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-10">
        <div className="flex justify-around">
          <Button variant="ghost" className="py-3 flex flex-col items-center text-kleen-teal">
            <BarChart2 className="w-5 h-5" />
            <span className="text-xs mt-1">Dashboard</span>
          </Button>
          <Button variant="ghost" className="py-3 flex flex-col items-center text-kleen-gray">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs mt-1">Products</span>
          </Button>
          <Button variant="ghost" className="py-3 flex flex-col items-center text-kleen-gray">
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
          <Button variant="ghost" className="py-3 flex flex-col items-center text-kleen-gray">
            <Settings className="w-5 h-5" />
            <span className="text-xs mt-1">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
