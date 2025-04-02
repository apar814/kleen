
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CtaSection: React.FC = () => {
  return (
    <motion.div 
      className="kleen-section bg-kleen-mint text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.div>
  );
};

export default CtaSection;
