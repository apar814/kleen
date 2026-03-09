import React from 'react';
import AppSidebar from './AppSidebar';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title, description, className }) => {
  return (
    <AppSidebar>
      <div className={`p-6 md:p-8 bg-background min-h-screen ${className || ''}`}>
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-heading text-h1 text-foreground mb-2">{title}</h1>
          {description && (
            <p className="font-body text-body-lg text-muted-foreground max-w-2xl">{description}</p>
          )}
        </motion.header>
        {children}
      </div>
    </AppSidebar>
  );
};

export default DashboardLayout;
