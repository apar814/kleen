import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginModal from '@/components/auth/LoginModal';
import { useAuth } from '@/contexts/AuthContext';

import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import ProductCategories from '@/components/home/ProductCategories';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import Footer from '@/components/home/Footer';

const Index = () => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col bg-background font-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      <main className="flex-1 flex flex-col">
        <HeroSection onLoginClick={() => setIsLoginModalOpen(true)} />
        <ProductCategories />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </motion.div>
  );
};

export default Index;
