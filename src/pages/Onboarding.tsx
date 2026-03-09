import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight, ArrowLeft, Check, Target, Leaf, ShieldAlert, Heart, Sparkles } from 'lucide-react';
import KleenLogo from '@/components/KleenLogo';

const healthGoalOptions = [
  'Weight Loss', 'Muscle Building', 'Better Sleep', 'Gut Health', 'Mental Clarity',
  'Longevity', 'Reduce Inflammation', 'Hormone Balance', 'Heart Health', 'Immune Support',
  'Skin Health', 'Energy Boost', 'Stress Relief', 'Detox', 'Fertility',
];

const dietaryOptions = [
  'Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Gluten-Free',
  'Dairy-Free', 'Organic Only', 'Non-GMO', 'Low Sugar', 'Whole30',
];

const allergenOptions = [
  'Gluten', 'Dairy', 'Nuts', 'Soy', 'Eggs',
  'Shellfish', 'Corn', 'Sesame', 'Sulfites', 'Artificial Dyes',
];

const valueOptions = [
  'Clean Ingredients', 'Sustainability', 'Cruelty-Free', 'Locally Sourced',
  'Minimal Processing', 'Transparent Labeling', 'Fair Trade', 'Low Carbon',
];

const steps = [
  { title: 'Health Goals', subtitle: 'What are you focused on?', icon: Target },
  { title: 'Dietary Needs', subtitle: 'Any diet preferences?', icon: Leaf },
  { title: 'Allergens', subtitle: 'Things to watch out for', icon: ShieldAlert },
  { title: 'Your Values', subtitle: 'What matters most to you?', icon: Heart },
];

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(0);
  const [healthGoals, setHealthGoals] = useState<string[]>([]);
  const [dietaryNeeds, setDietaryNeeds] = useState<string[]>([]);
  const [allergens, setAllergens] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const toggle = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const currentOptions = [healthGoalOptions, dietaryOptions, allergenOptions, valueOptions];
  const currentSelections = [healthGoals, dietaryNeeds, allergens, values];
  const currentSetters = [setHealthGoals, setDietaryNeeds, setAllergens, setValues];

  const handleFinish = async () => {
    if (!user) { navigate('/auth'); return; }
    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({ health_goals: healthGoals, dietary_needs: dietaryNeeds, allergens, values })
      .eq('user_id', user.id);

    if (error) {
      toast({ title: 'Error saving preferences', description: error.message, variant: 'destructive' });
    } else {
      await refreshProfile();
      toast({ title: 'Profile saved!', description: 'Your preferences have been set.' });
      navigate('/dashboard');
    }
    setSaving(false);
  };

  const canProceed = step < 3 || values.length > 0;
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen font-body flex flex-col" style={{ background: 'var(--gradient-hero)' }}>
      <div className="p-6">
        <KleenLogo size="md" />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</span>
              <button onClick={() => navigate('/dashboard')} className="text-sm text-muted-foreground hover:text-primary">
                Skip for now
              </button>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-5 shadow-glow">
                  {React.createElement(steps[step].icon, { className: 'h-7 w-7 text-white' })}
                </div>
                <h2 className="font-heading text-h2 text-foreground mb-2">{steps[step].title}</h2>
                <p className="text-body text-muted-foreground">{steps[step].subtitle}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {currentOptions[step].map((item) => {
                  const selected = currentSelections[step].includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggle(item, currentSelections[step], currentSetters[step])}
                      className={`
                        px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all
                        ${selected
                          ? 'border-primary bg-primary/10 text-primary shadow-soft'
                          : 'border-border bg-card text-foreground hover:border-primary/30 hover:bg-accent'
                        }
                      `}
                    >
                      {selected && <Check className="inline h-4 w-4 mr-1.5" />}
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>

                {step < steps.length - 1 ? (
                  <Button onClick={() => setStep(step + 1)} className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold shadow-glow">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleFinish}
                    disabled={saving}
                    className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold shadow-glow"
                  >
                    {saving ? 'Saving...' : 'Finish setup'}
                    <Sparkles className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
