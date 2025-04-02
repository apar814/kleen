
import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "Kleen has transformed how I shop. I no longer have to research every ingredient — it does the work for me.",
      name: "Sarah T.",
      title: "Mother of two"
    },
    {
      quote: "I discovered so many cleaner alternatives to products I've used for years. My skin has never felt better!",
      name: "Michael R.",
      title: "Fitness coach"
    },
    {
      quote: "As someone with allergies, Kleen helps me avoid ingredients that trigger reactions. It's been a game-changer.",
      name: "Jessica L.",
      title: "Health blogger"
    }
  ];

  return (
    <div className="kleen-section bg-kleen-sage/30">
      <div className="kleen-container">
        <h2 className="kleen-heading-h2 text-center mb-12">Trusted by health-conscious shoppers</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.name}
              className="bg-white p-6 rounded-xl shadow-kleen-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="italic mb-4">{testimonial.quote}</p>
              <div className="font-medium">{testimonial.name}</div>
              <div className="text-sm text-kleen-gray/60">{testimonial.title}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
