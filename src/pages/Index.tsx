import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import KleenLogo from '@/components/KleenLogo';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Shield, Heart, ArrowRight, Search, Star } from 'lucide-react';
import MobileNavigation from '@/components/MobileNavigation';
import MainNavigationWithAuth from '@/components/MainNavigationWithAuth';
import LoginModal from '@/components/auth/LoginModal';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-kleen-light">
      {/* Announcement Bar (like the green bar in the reference) */}
      <div className="kleen-announcement-bar">
        <div className="kleen-container flex justify-center items-center">
          <span className="mr-2">✨</span>
          <span className="font-medium">Kleen scans your cart for toxins and suggests cleaner alternatives</span>
          <Link to="/dashboard" className="ml-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors">
            Get started
          </Link>
          <Link to="/about" className="ml-2 text-white/90 hover:text-white text-sm font-medium transition-colors">
            Learn more
          </Link>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="flex items-center justify-between py-4 px-6 md:px-8 lg:px-12 bg-white shadow-sm">
        <div className="flex items-center">
          <MobileNavigation />
          <Link to="/">
            <KleenLogo size="md" />
          </Link>
        </div>
        
        <MainNavigationWithAuth className="hidden md:flex absolute left-1/2 -translate-x-1/2" />
      </div>
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
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
                      onClick={() => setIsLoginModalOpen(true)}
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
              <div className="flex-1 flex justify-center">
                <div className="rounded-lg overflow-hidden shadow-kleen-card">
                  <img 
                    src="/lovable-uploads/b298510c-6fc9-4e63-8997-9e61dee8c65d.png" 
                    alt="Kleen vs Toxic product comparison" 
                    className="w-full object-contain" 
                    style={{ maxHeight: "350px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Categories (inspired by the reference design) */}
        <div className="kleen-section bg-kleen-light">
          <div className="kleen-container">
            <h2 className="kleen-heading-h2 text-center mb-12">What we analyze</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <Link to="/categories/personal-care" className="flex flex-col items-center group">
                <div className="w-full aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-kleen-card group-hover:shadow-kleen-hover transition-shadow relative">
                  <img 
                    src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Personal Care" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-kleen-mint/10 transition-opacity">
                    <ArrowRight className="h-8 w-8 text-kleen-mint" />
                  </div>
                </div>
                <h3 className="font-medium text-center">Personal Care</h3>
              </Link>
              
              <Link to="/categories/household" className="flex flex-col items-center group">
                <div className="w-full aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-kleen-card group-hover:shadow-kleen-hover transition-shadow relative">
                  <img 
                    src="https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Household" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-kleen-mint/10 transition-opacity">
                    <ArrowRight className="h-8 w-8 text-kleen-mint" />
                  </div>
                </div>
                <h3 className="font-medium text-center">Household</h3>
              </Link>
              
              <Link to="/categories/food" className="flex flex-col items-center group">
                <div className="w-full aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-kleen-card group-hover:shadow-kleen-hover transition-shadow relative">
                  <img 
                    src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Food & Beverages" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-kleen-mint/10 transition-opacity">
                    <ArrowRight className="h-8 w-8 text-kleen-mint" />
                  </div>
                </div>
                <h3 className="font-medium text-center">Food & Beverages</h3>
              </Link>
              
              <Link to="/categories/beauty" className="flex flex-col items-center group">
                <div className="w-full aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-kleen-card group-hover:shadow-kleen-hover transition-shadow relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Beauty" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-kleen-mint/10 transition-opacity">
                    <ArrowRight className="h-8 w-8 text-kleen-mint" />
                  </div>
                </div>
                <h3 className="font-medium text-center">Beauty</h3>
              </Link>
              
              <Link to="/categories/baby" className="flex flex-col items-center group">
                <div className="w-full aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-kleen-card group-hover:shadow-kleen-hover transition-shadow relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                    alt="Baby Products" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-kleen-mint/10 transition-opacity">
                    <ArrowRight className="h-8 w-8 text-kleen-mint" />
                  </div>
                </div>
                <h3 className="font-medium text-center">Baby Products</h3>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="kleen-section bg-white">
          <div className="kleen-container">
            <h2 className="kleen-heading-h2 text-center mb-4">How Kleen works</h2>
            <p className="text-center text-kleen-gray/80 max-w-2xl mx-auto mb-12">
              We analyze your products for harmful ingredients and suggest cleaner alternatives
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="kleen-feature-item">
                <div className="bg-kleen-mint/10 p-3 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-kleen-mint" />
                </div>
                <h3 className="kleen-heading-h3 mb-2 text-xl">Ingredient Analysis</h3>
                <p className="kleen-body text-kleen-gray/80">
                  We scan every product for potentially harmful ingredients and explain them in plain language.
                </p>
              </div>
              
              <div className="kleen-feature-item">
                <div className="bg-kleen-mint/10 p-3 rounded-full w-fit mb-4">
                  <Star className="h-6 w-6 text-kleen-mint" />
                </div>
                <h3 className="kleen-heading-h3 mb-2 text-xl">Cleaner Alternatives</h3>
                <p className="kleen-body text-kleen-gray/80">
                  Discover healthier product options that align with your values, all without leaving your cart.
                </p>
              </div>
              
              <div className="kleen-feature-item">
                <div className="bg-kleen-mint/10 p-3 rounded-full w-fit mb-4">
                  <Heart className="h-6 w-6 text-kleen-mint" />
                </div>
                <h3 className="kleen-heading-h3 mb-2 text-xl">Personal Health Stack</h3>
                <p className="kleen-body text-kleen-gray/80">
                  Build your personalized collection of clean products that work for your body and lifestyle.
                </p>
              </div>
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
        
        {/* Testimonials Section */}
        <div className="kleen-section bg-kleen-sage/30">
          <div className="kleen-container">
            <h2 className="kleen-heading-h2 text-center mb-12">Trusted by health-conscious shoppers</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-kleen-card">
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic mb-4">"Kleen has transformed how I shop. I no longer have to research every ingredient — it does the work for me."</p>
                <div className="font-medium">Sarah T.</div>
                <div className="text-sm text-kleen-gray/60">Mother of two</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-kleen-card">
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic mb-4">"I discovered so many cleaner alternatives to products I've used for years. My skin has never felt better!"</p>
                <div className="font-medium">Michael R.</div>
                <div className="text-sm text-kleen-gray/60">Fitness coach</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-kleen-card">
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="italic mb-4">"As someone with allergies, Kleen helps me avoid ingredients that trigger reactions. It's been a game-changer."</p>
                <div className="font-medium">Jessica L.</div>
                <div className="text-sm text-kleen-gray/60">Health blogger</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="kleen-section bg-kleen-mint text-white">
          <div className="kleen-container text-center">
            <h2 className="text-h2 font-inter font-semibold mb-4">Ready to shop cleaner?</h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands making healthier choices with Kleen's free shopping analysis tool.
            </p>
            <Link to="/dashboard?tab=cart">
              <button className="bg-white text-kleen-mint font-medium py-3 px-8 rounded-md hover:bg-white/90 transition-colors">
                Analyze my cart
                <ArrowRight className="ml-2 h-5 w-5 inline-block" />
              </button>
            </Link>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="kleen-container">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <KleenLogo size="md" />
              <p className="mt-2 text-kleen-gray/60 max-w-xs">
                Your AI-powered health assistant for toxin-free shopping.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
              <div>
                <h4 className="font-medium mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><Link to="/features" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Features</Link></li>
                  <li><Link to="/how-it-works" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">How it works</Link></li>
                  <li><Link to="/pricing" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Pricing</Link></li>
                  <li><Link to="/faq" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">FAQ</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">About us</Link></li>
                  <li><Link to="/blog" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Blog</Link></li>
                  <li><Link to="/careers" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Careers</Link></li>
                  <li><Link to="/contact" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><Link to="/terms" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Terms</Link></li>
                  <li><Link to="/privacy" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Privacy</Link></li>
                  <li><Link to="/cookies" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Cookies</Link></li>
                  <li><Link to="/licenses" className="text-kleen-gray/70 hover:text-kleen-mint transition-colors">Licenses</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-kleen-gray/60">
              © {new Date().getFullYear()} Kleen. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-kleen-gray/60 hover:text-kleen-mint transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
              <a href="#" className="text-kleen-gray/60 hover:text-kleen-mint transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-kleen-gray/60 hover:text-kleen-mint transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
