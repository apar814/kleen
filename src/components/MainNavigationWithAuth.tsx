
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import UserMenu from './auth/UserMenu';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface MainNavigationProps {
  className?: string;
}

const MainNavigationWithAuth: React.FC<MainNavigationProps> = ({ className }) => {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Products', href: '/explore' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Ingredients', href: '/toxic-ingredients' },
    { name: 'About', href: '/about' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('flex items-center space-x-4 bg-white/70 backdrop-blur-md py-3 px-6 rounded-full shadow-md w-full max-w-4xl mx-auto', className)}
    >
      <div className="flex space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "text-gray-700 hover:text-kleen-mint text-sm font-medium relative",
              location.pathname === item.href && "text-kleen-mint"
            )}
          >
            {item.name}
            {location.pathname === item.href && (
              <motion.div 
                layoutId="navigation-underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-kleen-mint rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-3 ml-auto">
        <Link to="/explore">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-kleen-mint/10 transition-colors">
            <Search className="h-5 w-5" />
          </Button>
        </Link>
        <Link to="/dashboard?tab=cart">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-kleen-mint/10 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </Link>
        <UserMenu />
      </div>
    </motion.nav>
  );
};

export default MainNavigationWithAuth;
