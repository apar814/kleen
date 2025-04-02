
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Shield className="h-6 w-6 text-kleen-mint" />,
      title: "Ingredient Analysis",
      description: "We scan every product for potentially harmful ingredients and explain them in plain language."
    },
    {
      icon: <Star className="h-6 w-6 text-kleen-mint" />,
      title: "Cleaner Alternatives",
      description: "Discover healthier product options that align with your values, all without leaving your cart."
    },
    {
      icon: <Heart className="h-6 w-6 text-kleen-mint" />,
      title: "Personal Health Stack",
      description: "Build your personalized collection of clean products that work for your body and lifestyle."
    }
  ];

  return (
    <div className="kleen-section bg-white">
      <div className="kleen-container">
        <h2 className="kleen-heading-h2 text-center mb-4">How Kleen works</h2>
        <p className="text-center text-kleen-gray/80 max-w-2xl mx-auto mb-12">
          We analyze your products for harmful ingredients and suggest cleaner alternatives
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="kleen-feature-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="bg-kleen-mint/10 p-3 rounded-full w-fit mb-4">
                {feature.icon}
              </div>
              <h3 className="kleen-heading-h3 mb-2 text-xl">{feature.title}</h3>
              <p className="kleen-body text-kleen-gray/80">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/dashboard">
            <Button variant="default" size="lg" className="font-inter bg-kleen-mint hover:bg-kleen-mint/90">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
