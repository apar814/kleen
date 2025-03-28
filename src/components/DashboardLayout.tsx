
import React from 'react';
import AppSidebar from './AppSidebar';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  title,
  description,
  className 
}) => {
  return (
    <AppSidebar>
      <div className={`p-8 bg-gray-50 min-h-screen ${className}`}>
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="kleen-heading-h1 mb-2">{title}</h1>
          {description && (
            <p className="kleen-body text-kleen-gray/80">{description}</p>
          )}
        </motion.header>
        
        {children}
      </div>
    </AppSidebar>
  );
};

export default DashboardLayout;
