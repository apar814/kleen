
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import KleenLogo from './KleenLogo';
import { motion } from 'framer-motion';
import ProductsMenu from './navigation/ProductsMenu';
import LearnMenu from './navigation/LearnMenu';
import SimpleNavLinks from './navigation/SimpleNavLinks';
import NavActions from './navigation/NavActions';

interface MainNavigationProps {
  variant?: 'default' | 'transparent';
  className?: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ 
  variant = 'default',
  className 
}) => {
  const simpleLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About Us' }
  ];
  
  return (
    <header className={cn(
      "w-full py-4 relative z-10", 
      variant === 'default' ? 'bg-white/60 backdrop-blur-md shadow-md' : 'bg-transparent',
      className
    )}>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="kleen-container flex items-center justify-between"
      >
        <div className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="mr-10">
              <KleenLogo size="md" />
            </Link>
          </motion.div>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <ProductsMenu />
              <LearnMenu />
              <SimpleNavLinks links={simpleLinks} />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <NavActions />
      </motion.div>
    </header>
  );
};

export default MainNavigation;
