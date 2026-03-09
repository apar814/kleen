import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { type ScannedMenuItem } from './MenuScannerDialog';

interface ScannedMenuResultsProps {
  restaurantName?: string;
  items: ScannedMenuItem[];
  onLogMeal: (item: ScannedMenuItem) => void;
}

const getScoreColor = (score: number | null) => {
  if (!score) return 'text-muted-foreground';
  if (score >= 80) return 'text-primary';
  if (score >= 60) return 'text-secondary-foreground';
  if (score >= 40) return 'text-muted-foreground';
  return 'text-destructive';
};

const ScannedMenuResults: React.FC<ScannedMenuResultsProps> = ({
  restaurantName,
  items,
  onLogMeal,
}) => {
  const sorted = [...items].sort((a, b) => b.kleen_score - a.kleen_score);
  const best = sorted.filter(i => i.kleen_score >= 70);
  const avoid = sorted.filter(i => i.kleen_score < 50);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">
            AI Menu Scan{restaurantName ? `: ${restaurantName}` : ''}
          </h3>
          <Badge variant="secondary" className="ml-auto">{items.length} items found</Badge>
        </div>

        {best.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-primary mb-2">✅ Best Options</h4>
            <div className="space-y-2">
              {best.map((item, i) => (
                <MenuItemRow key={i} item={item} onLog={onLogMeal} variant="best" />
              ))}
            </div>
          </div>
        )}

        {avoid.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-destructive mb-2">⚠️ Avoid</h4>
            <div className="space-y-2">
              {avoid.map((item, i) => (
                <MenuItemRow key={i} item={item} onLog={onLogMeal} variant="avoid" />
              ))}
            </div>
          </div>
        )}

        <details className="mt-2">
          <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
            View all {items.length} items ranked
          </summary>
          <div className="space-y-2 mt-2">
            {sorted.map((item, i) => (
              <MenuItemRow key={i} item={item} onLog={onLogMeal} />
            ))}
          </div>
        </details>
      </CardContent>
    </Card>
  );
};

const MenuItemRow: React.FC<{
  item: ScannedMenuItem;
  onLog: (item: ScannedMenuItem) => void;
  variant?: 'best' | 'avoid';
}> = ({ item, onLog, variant }) => {
  const borderClass = variant === 'avoid' ? 'border-destructive/20 bg-destructive/5' : '';
  return (
    <div className={`p-3 border rounded-lg ${borderClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {variant === 'best' && <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />}
            {variant === 'avoid' && <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0" />}
            <span className="font-medium text-sm truncate">{item.item_name}</span>
            {item.price && <span className="text-xs text-muted-foreground">{item.price}</span>}
          </div>
          {item.description && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{item.description}</p>
          )}
          {item.score_reasoning && (
            <p className="text-xs text-muted-foreground/70 mt-0.5 italic">{item.score_reasoning}</p>
          )}
          <div className="flex flex-wrap gap-1 mt-1">
            {item.dietary_tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
            ))}
            {item.allergen_flags.map(flag => (
              <Badge key={flag} variant="secondary" className="text-[10px] px-1.5 py-0">⚠️ {flag}</Badge>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className={`text-lg font-bold ${getScoreColor(item.kleen_score)}`}>
            {item.kleen_score}
          </span>
          <Button size="sm" variant="ghost" className="mt-1 h-6 text-xs" onClick={() => onLog(item)}>
            Log
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScannedMenuResults;
