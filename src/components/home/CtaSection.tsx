import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CtaSection: React.FC = () => {
  return (
    <section className="kleen-section relative overflow-hidden">
      {/* Rich gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-primary" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)' }} />
      
      <div className="kleen-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm mb-8">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white/90">Free to use — no credit card required</span>
          </div>
          
          <h2 className="font-heading text-h1 text-white mb-5">Ready to shop cleaner?</h2>
          <p className="text-body-lg text-white/80 mb-10 max-w-xl mx-auto">
            Join thousands making healthier choices with Kleen's AI-powered shopping analysis.
          </p>
          
          <Link to="/dashboard?tab=cart">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevated font-semibold text-base px-10 h-14 hover:scale-[1.02] transition-all">
              Analyze my cart
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
