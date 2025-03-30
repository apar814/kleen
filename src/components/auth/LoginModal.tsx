
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import MagicLinkForm from './MagicLinkForm';
import { ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { createGuestSession } = useAuth();

  const handleContinueAsGuest = () => {
    createGuestSession();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-2">Sign in to Kleen</DialogTitle>
          <DialogDescription className="text-kleen-gray/70">
            Get personalized product recommendations and save your clean stack
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <MagicLinkForm />
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-center text-kleen-gray/70 mb-4">
              Or continue without an account
            </p>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleContinueAsGuest}
            >
              Continue as guest
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
