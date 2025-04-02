
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onLoginClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick }) => {
  const { user } = useAuth();
  
  return (
    <div className="kleen-section bg-white">
      <div className="kleen-container">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="kleen-heading-h1 mb-6">
              Feel great through<br />the power of <span className="text-kleen-mint">cleaner living</span>
            </h1>
            <p className="kleen-body text-kleen-gray/80 mb-8 text-lg max-w-lg">
              Kleen analyzes your shopping cart for toxic ingredients and suggests healthier alternatives that align with your values.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Link to="/dashboard?tab=cart">
                  <button className="kleen-btn-primary">
                    Analyze my cart
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
              ) : (
                <button 
                  className="kleen-btn-primary"
                  onClick={onLoginClick}
                >
                  Get started free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              )}
              <Link to="/how-it-works">
                <button className="kleen-btn-secondary">
                  How it works
                </button>
              </Link>
            </div>
          </div>
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-lg overflow-hidden shadow-kleen-card">
              <img 
                src="/lovable-uploads/b298510c-6fc9-4e63-8997-9e61dee8c65d.png" 
                alt="Kleen vs Toxic product comparison" 
                className="w-full object-contain" 
                style={{ maxHeight: "350px" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
