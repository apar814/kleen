
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CartSummary from '@/components/CartSummary';
import ProductSwap from '@/components/ProductSwap';
import ProductCard from '@/components/ProductCard';
import KleenScore from '@/components/KleenScore';
import { Button } from '@/components/ui/button';
import { cartItems, cleanAlternatives } from '@/data/mockData';
import { Info, ExternalLink, ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-kleen-teal-dark">Dashboard</h1>
        <p className="text-kleen-gray mt-2">
          Your Amazon cart analysis and healthier alternatives
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary products={cartItems} />
          
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Info className="w-5 h-5 text-kleen-teal" />
              <h2 className="ml-2 text-lg font-medium">Your Values</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-kleen-safe" />
                <span className="ml-2 text-sm">Vegan-friendly</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-kleen-safe" />
                <span className="ml-2 text-sm">No artificial fragrances</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-kleen-safe" />
                <span className="ml-2 text-sm">Cruelty-free</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-kleen-safe" />
                <span className="ml-2 text-sm">Eco-friendly packaging</span>
              </div>
            </div>
            
            <Button 
              variant="outline"
              className="mt-6 w-full text-kleen-gray"
            >
              Edit Your Values
            </Button>
          </div>
          
          <div className="mt-8 glass-panel rounded-xl p-6">
            <h3 className="font-medium mb-2">How Kleen Works</h3>
            <p className="text-sm text-kleen-gray">
              We analyze your Amazon cart, identify problematic ingredients, and suggest healthier alternatives that match your values.
            </p>
            <div className="mt-4">
              <a href="#" className="text-sm text-kleen-teal flex items-center hover:underline">
                <span>Learn more</span>
                <ArrowRight className="ml-1 w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Right Column - Product Analysis */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium">Your Cart Analysis</h2>
              <a 
                href="#" 
                className="text-sm text-kleen-teal flex items-center hover:underline"
              >
                <span>View on Amazon</span>
                <ExternalLink className="ml-1 w-3 h-3" />
              </a>
            </div>
            
            <div className="mb-8">
              <ProductSwap 
                originalProduct={cartItems[selectedProduct]} 
                alternativeProduct={cleanAlternatives[selectedProduct]} 
              />
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-4">All Cart Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cartItems.map((product, index) => (
                  <div 
                    key={product.id} 
                    className={`cursor-pointer transition-all ${selectedProduct === index ? 'ring-2 ring-kleen-teal rounded-xl' : ''}`}
                    onClick={() => setSelectedProduct(index)}
                  >
                    <ProductCard 
                      product={product} 
                      showAlternative={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-kleen-teal to-kleen-teal-dark rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium">Get Chrome Extension</h3>
                <p className="mt-2 text-white/80">
                  Analyze your cart directly on Amazon with our browser extension.
                </p>
                <Button 
                  className="mt-4 bg-white text-kleen-teal-dark hover:bg-kleen-cream"
                >
                  Install Now
                </Button>
              </div>
              <div className="hidden md:block">
                <div className="bg-white rounded-full p-3">
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_chrome-512.png"
                    alt="Chrome"
                    className="w-12 h-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
