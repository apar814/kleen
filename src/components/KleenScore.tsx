
import React from 'react';
import { cn } from '@/lib/utils';

interface KleenScoreProps {
  score: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const KleenScore: React.FC<KleenScoreProps> = ({ 
  score, 
  size = 'md', 
  showLabel = true,
  className 
}) => {
  // Normalize score between 0-100
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  // Calculate colors based on score
  let color = 'text-kleen-red';
  let ringColor = '#D9534F';
  let bgColor = 'bg-kleen-red/10';
  
  if (normalizedScore >= 70) {
    color = 'text-kleen-mint';
    ringColor = '#7AE582';
    bgColor = 'bg-kleen-mint/10';
  } else if (normalizedScore >= 40) {
    color = 'text-yellow-500';
    ringColor = '#F59E0B';
    bgColor = 'bg-yellow-500/10';
  }
  
  // Size configurations
  const dimensions = {
    sm: 'w-16 h-16 text-xl',
    md: 'w-24 h-24 text-3xl',
    lg: 'w-32 h-32 text-4xl'
  };
  
  const sizeClass = dimensions[size];
  
  // Calculate circle properties
  const radius = size === 'sm' ? 30 : size === 'md' ? 45 : 60;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (normalizedScore / 100) * circumference;
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative flex items-center justify-center rounded-full", sizeClass, bgColor)}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
          <circle 
            className="kleen-score-ring opacity-25" 
            cx="60" 
            cy="60" 
            r={radius} 
            stroke={ringColor} 
          />
          <circle 
            className="kleen-score-ring animate-[scan-pulse_4s_ease-in-out_infinite]" 
            cx="60" 
            cy="60" 
            r={radius} 
            stroke={ringColor} 
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <span className={cn("font-satoshi font-bold", color)}>{normalizedScore}</span>
      </div>
      {showLabel && (
        <span className="mt-2 text-label font-inter font-medium text-kleen-gray">Kleen Score</span>
      )}
    </div>
  );
};

export default KleenScore;
