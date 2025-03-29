import React from 'react';
import { Link } from 'react-router-dom';
import KleenLogo from '@/components/KleenLogo';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Shield, Heart, Star, BarChart2 } from 'lucide-react';
const Index = () => {
  return <div className="min-h-screen flex flex-col bg-kleen-white">
      <header className="px-8 py-6 border-b border-kleen-sage">
        <div className="container mx-auto flex justify-between items-center">
          <KleenLogo size="md" />
          <div className="flex gap-4">
            <Link to="/dashboard">
              <Button variant="outline" className="font-inter">Dashboard</Button>
            </Link>
            <Link to="/dashboard?tab=cart">
              <Button variant="default" className="font-inter bg-kleen-mint hover:bg-kleen-mint/90">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Analyze Cart
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <div className="py-16 md:py-24 px-8 bg-gradient-to-br from-kleen-white to-kleen-sage/20">
          <div className="container mx-auto max-w-3xl text-center">
            <h1 className="kleen-heading-h1 mb-6">
              Shop <span className="text-kleen-mint">cleaner</span>, live better
            </h1>
            <p className="kleen-body text-kleen-gray mb-10 max-w-xl mx-auto">
              Kleen analyzes your shopping cart for toxic ingredients and suggests healthier alternatives that align with your values.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard?tab=cart">
                <button className="kleen-btn-primary">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Try Cart Analysis
                </button>
              </Link>
              <Link to="/dashboard">
                <button className="kleen-btn-secondary">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  View Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-16 px-8 bg-kleen-white">
          <div className="container mx-auto">
            <h2 className="kleen-heading-h2 text-center mb-12">Why Choose Kleen?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="kleen-card p-6 hover:shadow-kleen-hover transition-shadow">
                <div className="bg-kleen-mint/10 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-kleen-mint" />
                </div>
                <h3 className="kleen-heading-h3 mb-2">Ingredient Analysis</h3>
                <p className="kleen-body text-kleen-gray/80">
                  We scan every product for potentially harmful ingredients and explain them in plain language.
                </p>
              </div>
              
              <div className="kleen-card p-6 hover:shadow-kleen-hover transition-shadow">
                <div className="bg-kleen-mint/10 p-3 rounded-full w-fit mb-4">
                  <Star className="h-6 w-6 text-kleen-mint" />
                </div>
                <h3 className="kleen-heading-h3 mb-2">Cleaner Alternatives</h3>
                <p className="kleen-body text-kleen-gray/80">
                  Discover healthier product options that align with your values, all without leaving your cart.
                </p>
              </div>
              
              <div className="kleen-card p-6 hover:shadow-kleen-hover transition-shadow">
                <div className="bg-kleen-mint/10 p-3 rounded-full w-fit mb-4">
                  <Heart className="h-6 w-6 text-kleen-mint" />
                </div>
                <h3 className="kleen-heading-h3 mb-2">Personal Health Stack</h3>
                
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/explore">
                <Button variant="outline" size="lg" className="font-inter">
                  Explore Clean Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-kleen-sage py-8 px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <KleenLogo size="sm" />
              <p className="mt-2 text-label text-kleen-gray">
                © {new Date().getFullYear()} Kleen. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-label text-kleen-gray hover:text-kleen-mint transition-colors">Privacy</a>
              <a href="#" className="text-label text-kleen-gray hover:text-kleen-mint transition-colors">Terms</a>
              <Link to="/referral" className="text-label text-kleen-gray hover:text-kleen-mint transition-colors">Referral</Link>
              <Link to="/profile" className="text-label text-kleen-gray hover:text-kleen-mint transition-colors">Profile</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;