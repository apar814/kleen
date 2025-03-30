
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import LoginModal from './LoginModal';
import { AlertTriangle } from 'lucide-react';

const GuestBanner: React.FC = () => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  if (!user || !user.isGuest) {
    return null;
  }
  
  return (
    <>
      <div className="bg-amber-50 border-amber-100 border px-4 py-3 rounded-md mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
          <p className="text-sm text-amber-800">
            Sign in to save your Clean Stack and personalize your experience
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-amber-200 text-amber-800 hover:bg-amber-100"
          onClick={() => setIsLoginModalOpen(true)}
        >
          Sign In
        </Button>
      </div>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default GuestBanner;
