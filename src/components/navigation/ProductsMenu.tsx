
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const ProductsMenu = () => {
  return (
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
  );
};

export default ProductsMenu;
