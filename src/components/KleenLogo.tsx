import React from 'react';
import { cn } from '@/lib/utils';

interface KleenLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'white';
}

const KleenLogo: React.FC<KleenLogoProps> = ({ size = 'md', className, variant = 'default' }) => {
  const sizeClasses = { sm: 'text-xl', md: 'text-2xl', lg: 'text-4xl' };
  
  return (
    <div className={cn("font-heading font-bold flex items-center gap-1.5 tracking-tight", sizeClasses[size], className)}>
      <div className="relative">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
          <span className="text-primary-foreground text-sm font-bold">K</span>
        </div>
      </div>
      <span className={variant === 'white' ? 'text-white' : 'text-foreground'}>
        kleen<span className="gradient-text">.ai</span>
      </span>
    </div>
  );
};

export default KleenLogo;
