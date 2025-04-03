
import React from 'react';
import { Link } from 'react-router-dom';
import KleenLogo from '@/components/KleenLogo';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import MobileNavigation from '@/components/MobileNavigation';
import MainNavigationWithAuth from '@/components/MainNavigationWithAuth';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  return (
    <>
      {/* Announcement Bar (like the green bar in the reference) */}
      <div className="kleen-announcement-bar">
        <div className="kleen-container flex justify-center items-center">
          <span className="mr-2">✨</span>
          <span className="font-medium">Kleen scans your cart for toxins and suggests cleaner alternatives</span>
          <Link to="/dashboard" className="ml-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
            Get started
          </Link>
          <Link to="/about" className="ml-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
            Learn more
          </Link>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="flex items-center justify-between py-4 px-6 md:px-8 lg:px-12 bg-white shadow-sm">
        <div className="flex items-center">
          <MobileNavigation />
          <Link to="/">
            <KleenLogo size="md" />
          </Link>
        </div>
        
        <div className="hidden md:block w-full flex-1 mx-10">
          <MainNavigationWithAuth className="transform-none mx-auto" />
        </div>
        
        <div className="md:hidden">
          <Link to="/dashboard?tab=cart" aria-label="Cart">
            <Button variant="ghost" size="icon" className="hover:bg-kleen-mint/10 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
