
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, ShoppingCart } from 'lucide-react';

const HowItWorks = () => {
  return (
    <DashboardLayout 
      title="How Kleen Works" 
      description="Learn how Kleen helps you find toxin-free products for a healthier lifestyle"
    >
      <div className="grid gap-8">
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-6">Our Process</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-kleen-mint/10 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-kleen-mint" />
              </div>
              <h3 className="text-lg font-medium mb-2">1. Scan Your Cart</h3>
              <p className="text-kleen-gray/70">Connect Kleen to your shopping cart with our browser extension or mobile app.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-kleen-mint/10 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-kleen-mint" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9L9 3L15 3L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">2. Analyze Ingredients</h3>
              <p className="text-kleen-gray/70">Our AI identifies potentially harmful ingredients in your products and explains the risks.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-kleen-mint/10 rounded-full flex items-center justify-center mb-4">
                <Check className="h-8 w-8 text-kleen-mint" />
              </div>
              <h3 className="text-lg font-medium mb-2">3. Discover Alternatives</h3>
              <p className="text-kleen-gray/70">Get personalized suggestions for cleaner, safer alternatives to problematic products.</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link to="/dashboard?tab=cart">
              <Button className="bg-kleen-mint hover:bg-kleen-mint/90">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Additional content could be added here */}
      </div>
    </DashboardLayout>
  );
};

export default HowItWorks;
