import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: "Ingredient Analysis",
    description: "We scan every product for harmful ingredients and explain them in plain language — powered by our database of 500+ flagged compounds.",
    color: "from-primary/15 to-primary/5",
    iconBg: "bg-gradient-to-br from-primary to-primary-glow",
  },
  {
    icon: Sparkles,
    title: "Cleaner Alternatives",
    description: "Discover healthier product options instantly. Our AI recommends swaps that match your values, budget, and dietary needs.",
    color: "from-amber-500/10 to-amber-500/5",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-400",
  },
  {
    icon: Heart,
    title: "Personal Health Stack",
    description: "Build your personalized collection of clean products — curated around your health goals, allergies, and lifestyle.",
    color: "from-rose-500/10 to-rose-500/5",
    iconBg: "bg-gradient-to-br from-rose-500 to-pink-400",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="kleen-section" style={{ background: 'var(--gradient-hero)' }}>
      <div className="kleen-container">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-label uppercase tracking-widest text-primary font-semibold mb-3 block">How it works</span>
          <h2 className="font-heading text-h2 text-foreground mb-4">Three steps to a cleaner cart</h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Kleen does the research so you don't have to. Scan, learn, swap — it's that simple.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              className="relative group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <div className={`h-full rounded-2xl border border-border/60 bg-card p-8 shadow-card group-hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1`}>
                {/* Step number */}
                <div className="absolute top-6 right-6 text-6xl font-heading font-bold text-foreground/[0.04]">
                  {i + 1}
                </div>
                
                <div className={`${feature.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="font-heading text-h3 text-foreground mb-3">{feature.title}</h3>
                <p className="font-body text-body text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-14 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow hover:shadow-elevated transition-all hover:scale-[1.02] font-semibold px-8">
              Start scanning free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
