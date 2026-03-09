
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
    { name: 'Search', href: '/search' },
    { name: 'Compare', href: '/compare' },
    { name: 'Goals', href: '/goals' },
    { name: 'Products', href: '/explore' },
    { name: 'Ingredients', href: '/toxic-ingredients' },
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn('flex items-center justify-center bg-[#f2e8dc]/80 backdrop-blur-md py-2.5 px-6 rounded-lg shadow-md w-full max-w-5xl mx-auto', className)}
    >
      <div className="flex space-x-5 items-center justify-center">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "text-gray-700 hover:text-primary text-sm font-medium relative whitespace-nowrap transition-colors duration-200",
              location.pathname === item.href && "text-primary"
            )}
          >
            {item.name}
            {location.pathname === item.href && (
              <motion.div 
                layoutId="navigation-underline"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-2 ml-auto">
        <Link to="/search" aria-label="Search">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>
        </Link>
        <Link to="/dashboard?tab=cart" aria-label="Cart">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </motion.div>
        </Link>
        <UserMenu />
      </div>
    </motion.nav>
  );
};

export default MainNavigationWithAuth;
