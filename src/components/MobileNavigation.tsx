
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronRight, Search, ShoppingCart, User, Heart, Info, Home } from 'lucide-react';
import KleenLogo from './KleenLogo';
import { Separator } from './ui/separator';

const MobileNavigation: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 max-w-[280px]">
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <KleenLogo size="sm" />
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="px-2">
            <Link to="/dashboard" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <Home className="mr-3 h-5 w-5 text-kleen-mint" />
              <span>Dashboard</span>
            </Link>
            
            <Link to="/explore" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <Search className="mr-3 h-5 w-5 text-kleen-mint" />
              <span>Explore Products</span>
            </Link>
            
            <Link to="/dashboard?tab=cart" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <ShoppingCart className="mr-3 h-5 w-5 text-kleen-mint" />
              <span>Cart Analysis</span>
            </Link>
            
            <Link to="/clean-stack" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <Heart className="mr-3 h-5 w-5 text-kleen-mint" />
              <span>Clean Stack</span>
            </Link>
            
            <Link to="/ingredient-database" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <Info className="mr-3 h-5 w-5 text-kleen-mint" />
              <span>Ingredient Database</span>
            </Link>
            
            <Separator className="my-3" />
            
            <div className="text-sm font-medium text-kleen-gray/70 px-3 py-2">Categories</div>
            
            <Link to="/categories/personal-care" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
              <span>Personal Care</span>
            </Link>
            
            <Link to="/categories/household" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
              <span>Household</span>
            </Link>
            
            <Link to="/categories/food" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
              <span>Food & Beverages</span>
            </Link>
            
            <Link to="/categories/beauty" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
              <span>Beauty</span>
            </Link>
            
            <Link to="/categories/baby" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
              <span>Baby Products</span>
            </Link>
            
            <Separator className="my-3" />
            
            <div className="text-sm font-medium text-kleen-gray/70 px-3 py-2">About</div>
            
            <Link to="/how-it-works" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
              <span>How It Works</span>
            </Link>
            
            <Link to="/about" className="flex items-center p-3 rounded-md hover:bg-kleen-sage" onClick={() => setOpen(false)}>
              <ChevronRight className="mr-3 h-4 w-4 text-kleen-gray/70" />
              <span>About Us</span>
            </Link>
          </div>
          
          <div className="mt-auto p-4 flex justify-center">
            <Link to="/dashboard?tab=cart" onClick={() => setOpen(false)}>
              <Button className="w-full bg-kleen-mint hover:bg-kleen-mint/90">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Analyze My Cart
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
