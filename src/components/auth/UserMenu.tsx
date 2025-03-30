
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Settings, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  if (!user) {
    return (
      <>
        <Button 
          variant="ghost" 
          onClick={() => setIsLoginModalOpen(true)}
          className="flex items-center gap-2"
        >
          <User className="h-5 w-5" />
          <span className="hidden md:inline">Sign In</span>
        </Button>
        
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            {user.isGuest ? (
              <User className="h-5 w-5" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-kleen-mint text-white flex items-center justify-center text-xs font-medium">
                {user.email ? user.email[0].toUpperCase() : 'U'}
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            {isAuthenticated ? (
              <div className="flex flex-col">
                <span>{user.email}</span>
                <span className="text-xs text-kleen-gray/70">Signed In</span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span>Guest User</span>
                <span className="text-xs text-kleen-gray/70">
                  <button 
                    onClick={() => {
                      setIsLoginModalOpen(true);
                    }}
                    className="text-kleen-mint hover:underline"
                  >
                    Sign in to save your data
                  </button>
                </span>
              </div>
            )}
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/clean-stack" className="cursor-pointer flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              <span>My Clean Stack</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/settings" className="cursor-pointer flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isAuthenticated ? 'Sign Out' : 'Clear Guest Session'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default UserMenu;
