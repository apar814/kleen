
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight, Search, ShoppingCart, User, Heart, Info, Home } from 'lucide-react';
import KleenLogo from './KleenLogo';
import { Separator } from './ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const MobileNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 max-w-[280px] bg-white/90 backdrop-blur-md">
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <KleenLogo size="sm" />
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <AnimatePresence>
            <div className="px-2">
              {[
                { href: '/dashboard', icon: <Home className="mr-3 h-5 w-5 text-kleen-mint" />, label: 'Dashboard' },
                { href: '/explore', icon: <Search className="mr-3 h-5 w-5 text-kleen-mint" />, label: 'Explore Products' },
                { href: '/dashboard?tab=cart', icon: <ShoppingCart className="mr-3 h-5 w-5 text-kleen-mint" />, label: 'Cart Analysis' },
                { href: '/clean-stack', icon: <Heart className="mr-3 h-5 w-5 text-kleen-mint" />, label: 'Clean Stack' },
                { href: '/toxic-ingredients', icon: <Info className="mr-3 h-5 w-5 text-kleen-mint" />, label: 'Ingredient Database' },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <Link 
                    to={item.href} 
                    className={cn(
                      "flex items-center p-3 rounded-md hover:bg-kleen-sage transition-colors",
                      location.pathname === item.href && "bg-kleen-sage/70"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              <Separator className="my-3" />
              
              <div className="text-sm font-medium text-kleen-gray/70 px-3 py-2">Categories</div>
              
              {[
                { href: '/categories/personal-care', label: 'Personal Care' },
                { href: '/categories/household', label: 'Household' },
                { href: '/categories/food', label: 'Food & Beverages' },
                { href: '/categories/beauty', label: 'Beauty' },
                { href: '/categories/baby', label: 'Baby Products' },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  custom={index + 5}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <Link 
                    to={item.href}
                    className="flex items-center p-3 rounded-md hover:bg-kleen-sage transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              <Separator className="my-3" />
              
              <div className="text-sm font-medium text-kleen-gray/70 px-3 py-2">About</div>
              
              {[
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/about', label: 'About Us' },
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  custom={index + 10}
                  initial="hidden"
                  animate="visible"
                  variants={menuItemVariants}
                >
                  <Link 
                    to={item.href}
                    className="flex items-center p-3 rounded-md hover:bg-kleen-sage transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
          
          <motion.div 
            className="mt-auto p-4 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/dashboard?tab=cart" onClick={() => setOpen(false)}>
              <Button className="w-full bg-kleen-mint hover:bg-kleen-mint/90 shadow-md">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Analyze My Cart
              </Button>
            </Link>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
