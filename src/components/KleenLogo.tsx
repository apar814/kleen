
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
  
  const colorClass = variant === 'white' ? 'text-white' : 'text-kleen-dark';

  return (
    <div className={cn("font-semibold flex items-center", sizeClasses[size], colorClass, className)}>
      <span className="text-kleen-mint">kleen</span>
    </div>
  );
};

export default KleenLogo;
