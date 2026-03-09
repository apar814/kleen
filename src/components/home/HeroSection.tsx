import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onLoginClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLoginClick }) => {
  const { user } = useAuth();
  
  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      
      <div className="kleen-container relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-8">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">Trusted by 10,000+ health-conscious shoppers</span>
              </div>
              
              <h1 className="font-heading text-display mb-6 text-foreground">
                Shop cleaner.{' '}
                <span className="gradient-text">Live better.</span>
              </h1>
              
              <p className="font-body text-body-lg text-muted-foreground mb-10 max-w-lg">
                Kleen uses AI to scan your cart for toxic ingredients, explains the risks in plain language, and suggests cleaner swaps — in seconds.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link to="/dashboard?tab=cart">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow hover:shadow-elevated transition-all hover:scale-[1.02] font-semibold text-base px-8 h-13">
                      Analyze my cart
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    size="lg"
                    onClick={onLoginClick}
                    className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow hover:shadow-elevated transition-all hover:scale-[1.02] font-semibold text-base px-8 h-13"
                  >
                    Get started free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
                <Link to="/how-it-works">
                  <Button size="lg" variant="outline" className="font-semibold text-base px-8 h-13 border-2 hover:bg-accent">
                    How it works
                  </Button>
                </Link>
              </div>
              
              {/* Social proof */}
              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-border/60">
                <div>
                  <div className="text-2xl font-heading font-bold text-foreground">50K+</div>
                  <div className="text-sm text-muted-foreground">Products scanned</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <div className="text-2xl font-heading font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Toxins flagged</div>
                </div>
                <div className="w-px h-10 bg-border" />
                <div>
                  <div className="text-2xl font-heading font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">Accuracy rate</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right visual */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Floating cards */}
              <motion.div 
                className="absolute -top-4 -left-4 z-10 glass-card rounded-2xl p-4 shadow-elevated"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Kleen Score</div>
                    <div className="text-2xl font-heading font-bold gradient-text">94</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -right-4 z-10 glass-card rounded-2xl p-4 shadow-elevated"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">3 toxins found</div>
                    <div className="text-xs text-muted-foreground">Swaps available</div>
                  </div>
                </div>
              </motion.div>
              
              <div className="rounded-2xl overflow-hidden shadow-elevated border border-border/50 bg-card">
                <img 
                  src="/lovable-uploads/b298510c-6fc9-4e63-8997-9e61dee8c65d.png" 
                  alt="Kleen product analysis showing clean vs toxic comparison" 
                  className="w-full object-contain" 
                  style={{ maxHeight: "380px" }}
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
