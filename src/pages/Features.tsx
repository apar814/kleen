
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Shield, Heart, ArrowRight, Search, Star } from 'lucide-react';

const Features = () => {
  return (
    <DashboardLayout 
      title="Kleen Features" 
      description="Explore the powerful features of Kleen that help you make healthier choices"
    >
      <div className="grid gap-8">
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-6">How Kleen Helps You Shop Cleaner</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-kleen-sage/10 rounded-xl">
              <div className="w-16 h-16 bg-kleen-mint/10 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-kleen-mint" />
              </div>
              <h3 className="text-lg font-medium mb-2">Ingredient Scanner</h3>
              <p className="text-kleen-gray/70">Automatically scan your cart and identify potentially harmful ingredients in seconds.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-kleen-sage/10 rounded-xl">
              <div className="w-16 h-16 bg-kleen-mint/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-kleen-mint" />
              </div>
              <h3 className="text-lg font-medium mb-2">AI-Powered Analysis</h3>
              <p className="text-kleen-gray/70">Get plain-language explanations of each ingredient and its potential health impacts.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 bg-kleen-sage/10 rounded-xl">
              <div className="w-16 h-16 bg-kleen-mint/10 rounded-full flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-kleen-mint" />
              </div>
              <h3 className="text-lg font-medium mb-2">Cleaner Alternatives</h3>
              <p className="text-kleen-gray/70">Discover healthier product swaps that match your preferences and values.</p>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-xl p-8 shadow-kleen-card">
          <h2 className="text-2xl font-semibold mb-6">Additional Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-kleen-mint/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Heart className="h-6 w-6 text-kleen-mint" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Clean Stack</h3>
                <p className="text-kleen-gray/70">Save your favorite clean products and build a personalized health stack you can trust.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-kleen-mint/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Search className="h-6 w-6 text-kleen-mint" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Comprehensive Ingredient Database</h3>
                <p className="text-kleen-gray/70">Access our growing database of potentially harmful ingredients and evidence-based information.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-kleen-mint/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="h-6 w-6 text-kleen-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Shopping History</h3>
                <p className="text-kleen-gray/70">Keep track of your product analyses and monitor your progress toward cleaner shopping.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-kleen-mint/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="h-6 w-6 text-kleen-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Multi-Platform Support</h3>
                <p className="text-kleen-gray/70">Access Kleen on desktop, mobile, and as a browser extension for seamless shopping.</p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="mt-8 flex justify-center">
          <Link to="/pricing">
            <Button className="bg-kleen-mint hover:bg-kleen-mint/90 mr-4">
              View Pricing
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="outline">
              Learn How It Works
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Features;
