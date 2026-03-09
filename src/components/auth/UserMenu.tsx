import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Settings, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserMenu = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
        <Link to="/auth">
          <Button variant="outline" className="flex items-center gap-1.5 border-border hover:border-primary hover:text-primary transition-colors">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Sign In</span>
          </Button>
        </Link>
      </motion.div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Button variant="ghost" size="icon" className="relative">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground flex items-center justify-center text-xs font-bold">
              {user.email ? user.email[0].toUpperCase() : 'U'}
            </div>
          </Button>
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm">{user.email}</span>
            <span className="text-xs text-muted-foreground">Signed In</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex items-center">
            <User className="mr-2 h-4 w-4" /><span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/clean-stack" className="cursor-pointer flex items-center">
            <Heart className="mr-2 h-4 w-4" /><span>My Clean Stack</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/onboarding" className="cursor-pointer flex items-center">
            <Settings className="mr-2 h-4 w-4" /><span>Edit Preferences</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => { signOut(); navigate('/'); }} className="text-destructive cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" /><span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
