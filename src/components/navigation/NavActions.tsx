
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, ShoppingCart, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NavActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/explore" className="hidden md:block">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="hover:bg-kleen-mint/10 transition-colors">
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
      </Link>
      <Link to="/dashboard?tab=cart">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="hover:bg-kleen-mint/10 transition-colors">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </motion.div>
      </Link>
      <Link to="/dashboard">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" className="hidden md:flex hover:border-kleen-mint hover:text-kleen-mint transition-colors">
            Dashboard
          </Button>
        </motion.div>
      </Link>
      <Link to="/profile">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="md:hidden hover:bg-kleen-mint/10 transition-colors">
            <User className="h-5 w-5" />
          </Button>
        </motion.div>
      </Link>
      <Link to="/dashboard?tab=cart">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="default" className="bg-kleen-mint hover:bg-kleen-mint/90 transition-colors shadow-lg">
            Analyze My Cart
          </Button>
        </motion.div>
      </Link>
    </div>
  );
};

export default NavActions;
