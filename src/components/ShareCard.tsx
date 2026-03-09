import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Download, Share2, Instagram, Twitter, Copy
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ShareCardProps {
  type: 'scan' | 'recipe' | 'cart' | 'challenge' | 'milestone';
  title: string;
  score?: number;
  subtitle?: string;
  badge?: string;
  stats?: { label: string; value: string | number }[];
  template?: 'default' | 'bold' | 'minimal' | 'dark';
  onClose?: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({
  type,
  title,
  score,
  subtitle,
  badge,
  stats,
  template = 'default',
  onClose,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-primary', text: 'text-primary' };
    if (score >= 60) return { bg: 'bg-amber-500', text: 'text-amber-500' };
    return { bg: 'bg-destructive', text: 'text-destructive' };
  };

  const scoreColors = score ? getScoreColor(score) : { bg: 'bg-primary', text: 'text-primary' };

  const templateStyles = {
    default: 'bg-gradient-to-br from-background via-accent to-background',
    bold: 'bg-gradient-to-br from-primary to-primary-glow',
    minimal: 'bg-white',
    dark: 'bg-gradient-to-br from-gray-900 to-gray-800',
  };

  const textStyles = {
    default: 'text-foreground',
    bold: 'text-white',
    minimal: 'text-gray-900',
    dark: 'text-white',
  };

  const handleShare = async () => {
    const shareText = `${badge || '🌿'} ${title}${score ? ` - Score: ${score}/100` : ''}\n\n${subtitle || ''}\n\nGet your health score at kleen.ai`;
    
    if (navigator.share) {
      await navigator.share({
        title: 'My Kleen Score',
        text: shareText,
        url: window.location.origin,
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({ title: 'Copied to clipboard!', description: 'Share it with your friends' });
    }
  };

  const copyToClipboard = async () => {
    const shareText = `${badge || '🌿'} ${title}${score ? ` - Score: ${score}/100` : ''}\n\nGet your health score at kleen.ai`;
    await navigator.clipboard.writeText(shareText);
    toast({ title: 'Copied!', description: 'Text copied to clipboard' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        {/* Preview Card */}
        <div
          ref={cardRef}
          className={`rounded-3xl overflow-hidden shadow-2xl ${templateStyles[template]} p-8`}
        >
          {/* Logo watermark */}
          <div className={`text-xs font-medium mb-6 ${template === 'bold' || template === 'dark' ? 'text-white/60' : 'text-muted-foreground'}`}>
            KLEEN.AI
          </div>

          {/* Badge */}
          {badge && (
            <div className="text-5xl mb-4">{badge}</div>
          )}

          {/* Score */}
          {score !== undefined && (
            <div className="mb-4">
              <div className={`inline-flex items-baseline ${template === 'bold' ? 'text-white' : scoreColors.text}`}>
                <span className="font-heading text-6xl font-bold">{score}</span>
                <span className="text-2xl font-medium ml-1">/100</span>
              </div>
            </div>
          )}

          {/* Title */}
          <h2 className={`font-heading text-2xl font-bold mb-2 ${textStyles[template]}`}>
            {title}
          </h2>

          {/* Subtitle */}
          {subtitle && (
            <p className={`text-sm mb-6 ${template === 'bold' || template === 'dark' ? 'text-white/80' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat, i) => (
                <div key={i} className={`text-center p-3 rounded-xl ${template === 'bold' ? 'bg-white/10' : template === 'dark' ? 'bg-white/5' : 'bg-black/5'}`}>
                  <div className={`font-heading text-xl font-bold ${textStyles[template]}`}>{stat.value}</div>
                  <div className={`text-xs ${template === 'bold' || template === 'dark' ? 'text-white/60' : 'text-muted-foreground'}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* QR Code placeholder */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className={`text-xs ${template === 'bold' || template === 'dark' ? 'text-white/60' : 'text-muted-foreground'}`}>
              Scan to try Kleen.ai
            </div>
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${template === 'bold' ? 'bg-white/10' : 'bg-black/5'}`}>
              📱
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Button 
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              onClick={handleShare}
            >
              <Instagram className="mr-2 h-4 w-4" /> Instagram Story
            </Button>
            <Button 
              className="bg-black text-white"
              onClick={handleShare}
            >
              <Twitter className="mr-2 h-4 w-4" /> Twitter/X
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" /> Copy Text
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> More Options
            </Button>
          </div>
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ShareCard;
