import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: "Personal Care", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", link: "/categories/personal-care" },
  { name: "Household", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", link: "/categories/household" },
  { name: "Food & Beverages", image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", link: "/categories/food" },
  { name: "Beauty", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", link: "/categories/beauty" },
  { name: "Baby Products", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60", link: "/categories/baby" },
];

const ProductCategories: React.FC = () => {
  return (
    <section className="kleen-section bg-card">
      <div className="kleen-container">
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-label uppercase tracking-widest text-primary font-semibold mb-3 block">Categories</span>
          <h2 className="font-heading text-h2 text-foreground">What we analyze</h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={cat.link} className="group block">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted shadow-card group-hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-semibold text-white text-sm">{cat.name}</h3>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-primary/20 backdrop-blur-[2px] transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-soft">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
