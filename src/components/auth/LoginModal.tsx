import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-h3 mb-1">Join Kleen</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Get personalized recommendations and track your clean living journey
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-3">
          <Button
            className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold"
            onClick={() => { onClose(); navigate('/auth'); }}
          >
            Create account <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="w-full h-12"
            onClick={() => { onClose(); navigate('/auth'); }}
          >
            Sign in
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
