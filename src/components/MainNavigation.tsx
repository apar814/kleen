
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
      "w-full py-4 border-b border-gray-100", 
      variant === 'default' ? 'bg-white' : 'bg-transparent',
      className
    )}>
      <div className="kleen-container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-10">
            <KleenLogo size="md" />
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-kleen-mint/10 p-6 no-underline outline-none focus:shadow-md"
                          to="/features"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-kleen-mint">
                            Features
                          </div>
                          <p className="text-sm leading-tight text-kleen-gray/70">
                            Explore all the powerful features of Kleen and how they can help you shop cleaner
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
                        to="/pricing"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-sage focus:bg-kleen-sage"
                      >
                        <div className="text-sm font-medium leading-none">Pricing</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Simple, transparent pricing plans for all your needs
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-kleen-sage p-6 no-underline outline-none focus:shadow-md"
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
                        to="/how-it-works"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-mint/10 focus:bg-kleen-mint/10"
                      >
                        <div className="text-sm font-medium leading-none">How It Works</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Discover how Kleen analyzes your cart and offers cleaner alternatives
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
                <Link to="/pricing" className={navigationMenuTriggerStyle()}>
                  Pricing
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid md:grid-cols-2 gap-3 p-4 w-[400px]">
                    <li>
                      <Link
                        to="/about"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-mint/10 focus:bg-kleen-mint/10"
                      >
                        <div className="text-sm font-medium leading-none">About Us</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Learn about our mission and the team behind Kleen
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/careers"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-mint/10 focus:bg-kleen-mint/10"
                      >
                        <div className="text-sm font-medium leading-none">Careers</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Join our mission to promote cleaner living
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
                          Articles and insights on clean living
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-kleen-mint/10 focus:bg-kleen-mint/10"
                      >
                        <div className="text-sm font-medium leading-none">Contact</div>
                        <p className="line-clamp-2 text-sm leading-snug text-kleen-gray/70">
                          Get in touch with the Kleen team
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/explore" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/dashboard?tab=cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="hidden md:flex">
              Dashboard
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/dashboard?tab=cart">
            <Button variant="default" className="bg-kleen-mint hover:bg-kleen-mint/90">
              Analyze My Cart
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
