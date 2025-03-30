
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string | null;
  isGuest: boolean;
  values?: string[];
  healthGoals?: string[];
  createdAt: Date;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  verifyMagicLink: (token: string) => Promise<boolean>;
  createGuestSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get localStorage user data or create guest user
const getUserFromStorage = (): User | null => {
  const userData = localStorage.getItem('kleen_user');
  if (userData) {
    const parsed = JSON.parse(userData);
    return {
      ...parsed,
      createdAt: new Date(parsed.createdAt)
    };
  }
  return null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const storedUser = getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const createGuestSession = () => {
    const guestUser: User = {
      id: uuidv4(),
      email: null,
      isGuest: true,
      createdAt: new Date()
    };
    
    setUser(guestUser);
    localStorage.setItem('kleen_user', JSON.stringify(guestUser));
  };

  const login = async (email: string): Promise<void> => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call an API to send magic link
      // For now, we'll simulate the process
      toast({
        title: "Magic link sent!",
        description: `Check your inbox at ${email} for a login link.`,
      });
      // In a real implementation, we would not set the user here
      // This is just for demonstration purposes
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending magic link:", error);
      setIsLoading(false);
      toast({
        title: "Failed to send login link",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const verifyMagicLink = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real implementation, this would verify the token with a backend
      // For now, we'll simulate successful verification
      // Extract email from token (in real implementation this would be done securely)
      const email = atob(token).split(':')[0];
      
      const authenticatedUser: User = {
        id: uuidv4(),
        email,
        isGuest: false,
        createdAt: new Date()
      };
      
      setUser(authenticatedUser);
      localStorage.setItem('kleen_user', JSON.stringify(authenticatedUser));
      setIsLoading(false);
      
      return true;
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('kleen_user');
    toast({
      title: "Logged out successfully",
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user && !user.isGuest,
        login, 
        logout, 
        verifyMagicLink,
        createGuestSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
