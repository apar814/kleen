
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCategories: React.FC = () => {
  const categories = [
    {
      name: "Personal Care",
      link: "/categories/personal-care",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Household",
      link: "/categories/household",
      image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Food & Beverages",
      link: "/categories/food",
      image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Beauty",
      link: "/categories/beauty",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Baby Products",
      link: "/categories/baby",
      image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  return (
    <div className="kleen-section bg-kleen-light">
      <div className="kleen-container">
        <h2 className="kleen-heading-h2 text-center mb-12">What we analyze</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={category.link} className="flex flex-col items-center group">
                <div className="w-full aspect-square bg-white rounded-xl overflow-hidden mb-4 shadow-kleen-card group-hover:shadow-kleen-hover transition-shadow relative">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-kleen-mint/10 transition-opacity">
                    <ArrowRight className="h-8 w-8 text-kleen-mint" />
                  </div>
                </div>
                <h3 className="font-medium text-center">{category.name}</h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
