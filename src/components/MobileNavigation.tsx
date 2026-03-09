
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight, Search, ShoppingCart, Heart, Info, Home, Target, Scale, User, Clock, Gift } from 'lucide-react';
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
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  const mainLinks = [
    { href: '/dashboard', icon: <Home className="mr-3 h-5 w-5 text-primary" />, label: 'Dashboard' },
    { href: '/search', icon: <Search className="mr-3 h-5 w-5 text-primary" />, label: 'Product Search' },
    { href: '/compare', icon: <Scale className="mr-3 h-5 w-5 text-primary" />, label: 'Compare Products' },
    { href: '/goals', icon: <Target className="mr-3 h-5 w-5 text-primary" />, label: 'Goal Discovery' },
    { href: '/explore', icon: <Search className="mr-3 h-5 w-5 text-primary" />, label: 'Explore Products' },
    { href: '/dashboard?tab=cart', icon: <ShoppingCart className="mr-3 h-5 w-5 text-primary" />, label: 'Cart Analysis' },
    { href: '/clean-stack', icon: <Heart className="mr-3 h-5 w-5 text-primary" />, label: 'Clean Stack' },
    { href: '/toxic-ingredients', icon: <Info className="mr-3 h-5 w-5 text-primary" />, label: 'Ingredient Database' },
  ];

  const accountLinks = [
    { href: '/profile', icon: <User className="mr-3 h-4 w-4 text-muted-foreground" />, label: 'Profile' },
    { href: '/scan-history', icon: <Clock className="mr-3 h-4 w-4 text-muted-foreground" />, label: 'Scan History' },
    { href: '/referral', icon: <Gift className="mr-3 h-4 w-4 text-muted-foreground" />, label: 'Refer Friends' },
  ];

  const aboutLinks = [
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About Us' },
  ];

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
            <div className="px-2 flex-1 overflow-y-auto">
              {mainLinks.map((item, index) => (
                <motion.div key={item.href + item.label} custom={index} initial="hidden" animate="visible" variants={menuItemVariants}>
                  <Link to={item.href} className={cn("flex items-center p-3 rounded-md hover:bg-accent transition-colors", location.pathname === item.href && "bg-accent/70")} onClick={() => setOpen(false)}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              <Separator className="my-3" />
              <div className="text-sm font-medium text-muted-foreground px-3 py-2">Account</div>
              {accountLinks.map((item, index) => (
                <motion.div key={item.href} custom={index + mainLinks.length} initial="hidden" animate="visible" variants={menuItemVariants}>
                  <Link to={item.href} className="flex items-center p-3 rounded-md hover:bg-accent transition-colors" onClick={() => setOpen(false)}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              <Separator className="my-3" />
              <div className="text-sm font-medium text-muted-foreground px-3 py-2">About</div>
              {aboutLinks.map((item, index) => (
                <motion.div key={item.href} custom={index + mainLinks.length + accountLinks.length} initial="hidden" animate="visible" variants={menuItemVariants}>
                  <Link to={item.href} className="flex items-center p-3 rounded-md hover:bg-accent transition-colors" onClick={() => setOpen(false)}>
                    <ChevronRight className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
          
          <motion.div className="mt-auto p-4 flex justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Link to="/search" onClick={() => setOpen(false)} className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 shadow-md">
                <Search className="mr-2 h-4 w-4" />
                Search Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
