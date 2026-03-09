import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Kleen has transformed how I shop. I no longer have to research every ingredient — it does the work for me.",
    name: "Sarah T.",
    title: "Mother of two",
    avatar: "ST",
  },
  {
    quote: "I discovered so many cleaner alternatives to products I've used for years. My skin has never felt better!",
    name: "Michael R.",
    title: "Fitness coach",
    avatar: "MR",
  },
  {
    quote: "As someone with allergies, Kleen helps me avoid ingredients that trigger reactions. It's been a game-changer.",
    name: "Jessica L.",
    title: "Health blogger",
    avatar: "JL",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="kleen-section bg-card">
      <div className="kleen-container">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-label uppercase tracking-widest text-primary font-semibold mb-3 block">Testimonials</span>
          <h2 className="font-heading text-h2 text-foreground">Loved by health-conscious shoppers</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.name}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="h-full rounded-2xl border border-border/60 bg-background p-7 shadow-card group-hover:shadow-elevated transition-all duration-300">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="font-body text-body text-foreground/80 mb-6 leading-relaxed">"{t.quote}"</p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-sm font-semibold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
