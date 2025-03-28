
import React from 'react';
import { cn } from '@/lib/utils';

interface KleenLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'white';
}

const KleenLogo: React.FC<KleenLogoProps> = ({ 
  size = 'md', 
  className,
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };
  
  const colorClass = variant === 'white' ? 'text-white' : 'text-kleen-teal-dark';

  return (
    <div className={cn("font-bold flex items-center", sizeClasses[size], colorClass, className)}>
      <span className="mr-1">K</span>
      <span className="text-kleen-teal">leen</span>
    </div>
  );
};

export default KleenLogo;
