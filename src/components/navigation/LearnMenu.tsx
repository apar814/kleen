
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const LearnMenu = () => {
  return (
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
  );
};

export default LearnMenu;
