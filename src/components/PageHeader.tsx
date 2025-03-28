
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, actionButton }) => {
  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="kleen-heading-h1 mb-2">{title}</h1>
        {description && <p className="text-kleen-gray/80">{description}</p>}
      </div>
      
      {actionButton && (
        <Button 
          className="flex-shrink-0 bg-kleen-mint hover:bg-kleen-mint/90 text-white"
          onClick={actionButton.onClick}
        >
          {actionButton.icon && <span className="mr-2">{actionButton.icon}</span>}
          {actionButton.label}
        </Button>
      )}
    </motion.div>
  );
};

export default PageHeader;
