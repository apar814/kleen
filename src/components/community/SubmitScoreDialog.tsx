import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Star, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface SubmitScoreDialogProps {
  productId: string;
  productName: string;
  currentScore?: number | null;
  children: React.ReactNode;
}

const SubmitScoreDialog: React.FC<SubmitScoreDialogProps> = ({
  productId,
  productName,
  currentScore,
  children
}) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [proposedScore, setProposedScore] = useState(currentScore || 50);
  const [reasoning, setReasoning] = useState('');
  const [ingredientNotes, setIngredientNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-secondary-foreground';
    return 'text-destructive';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to submit a score');
      return;
    }

    if (!reasoning.trim()) {
      toast.error('Please provide reasoning for your score');
      return;
    }

    setSubmitting(true);

    const { error } = await supabase
      .from('community_scores' as any)
      .insert({
        product_id: productId,
        user_id: user.id,
        proposed_score: proposedScore,
        reasoning: reasoning.trim(),
        ingredient_notes: ingredientNotes.trim() || null
      });

    if (error) {
      if (error.code === '23505') {
        toast.error('You have already submitted a score for this product');
      } else {
        toast.error('Failed to submit score');
      }
    } else {
      toast.success('Score submitted for review!');
      setReasoning('');
      setIngredientNotes('');
      setIsOpen(false);
    }
    
    setSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Submit a Score
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-2">
          <p className="text-sm text-muted-foreground">
            Help the community by scoring: <span className="font-medium text-foreground">{productName}</span>
          </p>
          {currentScore && (
            <p className="text-xs text-muted-foreground mt-1">
              Current score: {currentScore}/100
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Score Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Your Proposed Score</Label>
              <Badge className={getScoreColor(proposedScore)}>
                {proposedScore}/100 - {getScoreLabel(proposedScore)}
              </Badge>
            </div>
            <Slider
              value={[proposedScore]}
              onValueChange={([value]) => setProposedScore(value)}
              min={0}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0 - Poor</span>
              <span>50 - Fair</span>
              <span>100 - Excellent</span>
            </div>
          </div>

          {/* Reasoning */}
          <div>
            <Label htmlFor="reasoning">Reasoning *</Label>
            <Textarea
              id="reasoning"
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="Explain why you're proposing this score. Consider ingredient quality, certifications, transparency, etc."
              rows={3}
              required
            />
          </div>

          {/* Ingredient Notes */}
          <div>
            <Label htmlFor="ingredientNotes">Ingredient Notes (optional)</Label>
            <Textarea
              id="ingredientNotes"
              value={ingredientNotes}
              onChange={(e) => setIngredientNotes(e.target.value)}
              placeholder="Any specific notes about ingredients (good or concerning)..."
              rows={2}
            />
          </div>

          {/* Guidelines */}
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              <strong>Scoring Guidelines:</strong> Consider ingredient quality, artificial additives, 
              certifications (organic, non-GMO), transparency, and potential health concerns. 
              Your submission will be reviewed before being applied.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Score for Review'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitScoreDialog;
