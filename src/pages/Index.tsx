
import React from 'react';
import { Link } from 'react-router-dom';
import KleenLogo from '@/components/KleenLogo';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <KleenLogo size="md" />
          <Link to="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Shop <span className="text-kleen-teal">cleaner</span>, live better
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Kleen analyzes your shopping cart for toxic ingredients and suggests healthier alternatives.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-kleen-teal hover:bg-kleen-teal-dark">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Try Cart Analysis
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kleen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
