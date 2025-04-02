import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import KleenLogo from './KleenLogo';
import { Button } from './ui/button';
import { Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface MainNavigationProps {
  variant?: 'default' | 'transparent';
  className?: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ 
  variant = 'default',
  className 
}) => {
  const location = useLocation();
  
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
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-kleen-mint/10 transition-colors">Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-kleen-mint/10 p-6 no-underline outline-none focus:shadow-md hover:bg-kleen-mint/20 transition-colors"
                          to="/explore"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-kleen-mint">
                            Clean Product Database
                          </div>
                          <p className="text-sm leading-tight text-kleen-gray/70">
                            Browse our database of clean products that are free from harmful ingredients
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/categories/personal-care"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-sage focus:bg-kleen-sage"
                      >
                        <div className="text-sm font-medium leading-none">Personal Care</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Skincare, haircare, and personal hygiene products
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categories/household"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-sage focus:bg-kleen-sage"
                      >
                        <div className="text-sm font-medium leading-none">Household</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Cleaning products, laundry, and home essentials
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/categories/food"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-sage focus:bg-kleen-sage"
                      >
                        <div className="text-sm font-medium leading-none">Food & Beverages</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Healthy food options free from harmful additives
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-kleen-mint/10 transition-colors">Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-kleen-sage p-6 no-underline outline-none focus:shadow-md hover:bg-kleen-sage/80 transition-colors"
                          to="/ingredient-database"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Ingredient Database
                          </div>
                          <p className="text-sm leading-tight text-kleen-gray/70">
                            Explore our comprehensive database of potentially harmful ingredients and their effects
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link
                        to="/toxic-ingredients"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-mint/10 focus:bg-kleen-mint/10"
                      >
                        <div className="text-sm font-medium leading-none">Toxic Ingredients Guide</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Learn about the most common harmful ingredients to avoid
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/education/clean-living"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-mint/10 focus:bg-kleen-mint/10"
                      >
                        <div className="text-sm font-medium leading-none">Clean Living Guide</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          How to transition to a cleaner, healthier lifestyle
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/blog"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-mint/10 focus:bg-kleen-mint/10"
                      >
                        <div className="text-sm font-medium leading-none">Blog</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Articles and resources on healthy living and clean products
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/how-it-works" className={cn(
                  navigationMenuTriggerStyle(),
                  "hover:bg-kleen-mint/10 transition-colors",
                  location.pathname === '/how-it-works' && "bg-kleen-mint/10"
                )}>
                  How It Works
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/about" className={cn(
                  navigationMenuTriggerStyle(),
                  "hover:bg-kleen-mint/10 transition-colors",
                  location.pathname === '/about' && "bg-kleen-mint/10"
                )}>
                  About Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/explore" className="hidden md:block">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="hover:bg-kleen-mint/10 transition-colors">
                <Search className="h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          <Link to="/dashboard?tab=cart">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="hover:bg-kleen-mint/10 transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          <Link to="/dashboard">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="hidden md:flex hover:border-kleen-mint hover:text-kleen-mint transition-colors">
                Dashboard
              </Button>
            </motion.div>
          </Link>
          <Link to="/profile">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-kleen-mint/10 transition-colors">
                <User className="h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
          <Link to="/dashboard?tab=cart">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="default" className="bg-kleen-mint hover:bg-kleen-mint/90 transition-colors shadow-lg">
                Analyze My Cart
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default MainNavigation;
