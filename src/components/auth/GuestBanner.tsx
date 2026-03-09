import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const GuestBanner: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) return null;
  
  return (
    <div className="bg-amber-50 border-amber-100 border px-4 py-3 rounded-xl mb-6 flex items-center justify-between">
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
        <p className="text-sm text-amber-800">
          Sign in to save your Clean Stack and personalize your experience
        </p>
      </div>
      <Link to="/auth">
        <Button variant="outline" size="sm" className="border-amber-200 text-amber-800 hover:bg-amber-100">
          Sign In
        </Button>
      </Link>
    </div>
  );
};

export default GuestBanner;
