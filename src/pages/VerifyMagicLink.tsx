
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const VerifyMagicLink: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { verifyMagicLink } = useAuth();
  const navigate = useNavigate();
  const [verificationState, setVerificationState] = useState<'verifying' | 'success' | 'error'>('verifying');

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setVerificationState('error');
        toast({
          title: "Invalid Link",
          description: "The login link is invalid or has expired.",
          variant: "destructive",
        });
        return;
      }

      try {
        const success = await verifyMagicLink(token);
        if (success) {
          setVerificationState('success');
          toast({
            title: "Successfully signed in!",
            description: "Welcome to Kleen.",
          });
          
          // Redirect after a short delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else {
          setVerificationState('error');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setVerificationState('error');
      }
    };

    verifyToken();
  }, [searchParams, verifyMagicLink, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-kleen-light">
      <div className="max-w-md w-full p-8 bg-white shadow-sm rounded-lg text-center">
        {verificationState === 'verifying' && (
          <>
            <Loader2 className="h-12 w-12 text-kleen-mint animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Verifying login link...</h1>
            <p className="text-kleen-gray/70">Please wait while we sign you in.</p>
          </>
        )}

        {verificationState === 'success' && (
          <>
            <div className="bg-kleen-mint/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-kleen-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2">You're signed in!</h1>
            <p className="text-kleen-gray/70 mb-6">Redirecting you to the dashboard...</p>
          </>
        )}

        {verificationState === 'error' && (
          <>
            <div className="bg-red-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold mb-2">Link Invalid or Expired</h1>
            <p className="text-kleen-gray/70 mb-6">The login link is invalid or has expired. Please request a new login link.</p>
            <Button onClick={() => navigate('/')} className="bg-kleen-mint hover:bg-kleen-mint/90">
              Back to Home
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyMagicLink;
