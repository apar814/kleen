import React from 'react';
import { Link } from 'react-router-dom';
import KleenLogo from '@/components/KleenLogo';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import MobileNavigation from '@/components/MobileNavigation';
import MainNavigationWithAuth from '@/components/MainNavigationWithAuth';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
        <div className="kleen-container flex justify-center items-center py-2.5 gap-3 text-sm">
          <span className="hidden sm:inline font-medium">✨ AI-powered toxin detection for your shopping cart</span>
          <span className="sm:hidden font-medium">✨ Scan your cart for toxins</span>
          <Link to="/dashboard" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105">
            Get started →
          </Link>
        </div>
      </div>
      
      {/* Nav */}
      <div className="glass-card border-b border-border/50">
        <div className="flex items-center justify-between py-3 px-5 md:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <MobileNavigation />
            <Link to="/"><KleenLogo size="md" /></Link>
          </div>
          
          <div className="hidden md:block flex-1 mx-8">
            <MainNavigationWithAuth className="transform-none mx-auto" />
          </div>
          
          <div className="md:hidden">
            <Link to="/dashboard?tab=cart" aria-label="Cart">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors rounded-full">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
