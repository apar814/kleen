
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

interface SimpleNavLinksProps {
  links: Array<{
    href: string;
    label: string;
  }>;
}

const SimpleNavLinks: React.FC<SimpleNavLinksProps> = ({ links }) => {
  const location = useLocation();
  
  return (
    <>
      {links.map((link) => (
        <NavigationMenuItem key={link.href}>
          <Link to={link.href} className={cn(
            navigationMenuTriggerStyle(),
            "hover:bg-kleen-mint/10 transition-colors",
            location.pathname === link.href && "bg-kleen-mint/10"
          )}>
            {link.label}
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );
};

export default SimpleNavLinks;
