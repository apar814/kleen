
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import UserMenu from './auth/UserMenu';
import { Search, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';

interface MainNavigationProps {
  className?: string;
}

const MainNavigationWithAuth: React.FC<MainNavigationProps> = ({ className }) => {
  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Features', href: '/features' },
    { name: 'Products', href: '/explore' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Ingredients', href: '/toxic-ingredients' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className={cn('flex items-center space-x-4', className)}>
      <div className="flex space-x-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="text-gray-700 hover:text-kleen-mint text-sm font-medium"
          >
            {item.name}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        <Link to="/explore">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </Link>
        <Link to="/dashboard?tab=cart">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </Link>
        <UserMenu />
      </div>
    </nav>
  );
};

export default MainNavigationWithAuth;
