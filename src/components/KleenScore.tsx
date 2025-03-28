
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
  const [animatedScore, setAnimatedScore] = useState(0);
  
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

  // Animate score when component mounts or score changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(normalizedScore);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [normalizedScore]);
  
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      className={cn("flex flex-col items-center", className)}
    >
      <div className={cn("relative flex items-center justify-center rounded-full overflow-hidden", sizeClass, bgColor)}>
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          <circle 
            className="kleen-score-ring opacity-25" 
            cx="60" 
            cy="60" 
            r={radius} 
            strokeWidth="6"
            stroke={ringColor} 
            fill="transparent"
          />
          <motion.circle 
            className="kleen-score-ring" 
            cx="60" 
            cy="60" 
            r={radius}
            strokeWidth="6" 
            stroke={ringColor}
            fill="transparent"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <motion.span 
          className={cn("font-satoshi font-bold relative z-10", color)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {Math.round(animatedScore)}
          </motion.span>
        </motion.span>
        
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ boxShadow: `0 0 0px ${ringColor}` }}
          animate={{ boxShadow: `0 0 15px ${ringColor}` }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse"
          }}
        />
      </div>
      {showLabel && (
        <motion.span 
          className="mt-2 text-label font-inter font-medium text-kleen-gray"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Kleen Score
        </motion.span>
      )}
    </motion.div>
  );
};

export default KleenScore;
