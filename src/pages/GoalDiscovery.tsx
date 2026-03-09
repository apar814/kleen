import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Moon, Droplets, Heart, Brain, Shield, Baby, Dumbbell, ArrowRight, ArrowLeft, Star, ChevronRight } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Goal {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface RecommendedProduct {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  kleenScore: number;
  price: number;
  rationale: string;
  caveats: string;
  category: string;
}

const goals: Goal[] = [
  { id: 'hydration', name: 'Hydration', description: 'Stay optimally hydrated with clean electrolytes', icon: <Droplets className="h-6 w-6" />, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'sleep', name: 'Sleep', description: 'Improve sleep quality with safe supplements', icon: <Moon className="h-6 w-6" />, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  { id: 'gut-health', name: 'Gut Health', description: 'Support digestion with clean probiotics', icon: <Heart className="h-6 w-6" />, color: 'bg-rose-50 text-rose-600 border-rose-200' },
  { id: 'recovery', name: 'Recovery', description: 'Post-workout recovery without harmful additives', icon: <Zap className="h-6 w-6" />, color: 'bg-amber-50 text-amber-600 border-amber-200' },
  { id: 'focus', name: 'Focus & Cognition', description: 'Clean nootropics and brain-supporting nutrients', icon: <Brain className="h-6 w-6" />, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 'immunity', name: 'Immunity', description: 'Strengthen immune function naturally', icon: <Shield className="h-6 w-6" />, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
  { id: 'baby', name: 'Baby Safe', description: 'Products verified safe for infants and children', icon: <Baby className="h-6 w-6" />, color: 'bg-pink-50 text-pink-600 border-pink-200' },
  { id: 'muscle', name: 'Muscle Building', description: 'Clean protein and performance supplements', icon: <Dumbbell className="h-6 w-6" />, color: 'bg-orange-50 text-orange-600 border-orange-200' },
];

const mockRecommendations: Record<string, RecommendedProduct[]> = {
  'hydration': [
    { id: '1', name: 'LMNT Electrolyte Mix', brand: 'LMNT', imageUrl: 'https://placehold.co/200x200?text=LMNT', kleenScore: 94, price: 45.00, rationale: 'Zero sugar, no artificial ingredients. Uses sodium, potassium, magnesium in evidence-backed ratios.', caveats: 'High sodium — may not suit restricted-sodium diets.', category: 'Electrolytes' },
    { id: '2', name: 'Nuun Sport', brand: 'Nuun', imageUrl: 'https://placehold.co/200x200?text=Nuun', kleenScore: 82, price: 28.00, rationale: 'Clean ingredient list, vegan, gluten-free. Effervescent tabs for convenience.', caveats: 'Contains stevia — some people report aftertaste.', category: 'Electrolytes' },
    { id: '3', name: 'Liquid IV Hydration', brand: 'Liquid IV', imageUrl: 'https://placehold.co/200x200?text=LIV', kleenScore: 65, price: 25.00, rationale: 'Uses Cellular Transport Technology for faster absorption.', caveats: 'Contains cane sugar and natural flavors with limited transparency.', category: 'Electrolytes' },
  ],
  'sleep': [
    { id: '4', name: 'Momentous Magnesium L-Threonate', brand: 'Momentous', imageUrl: 'https://placehold.co/200x200?text=Momentous', kleenScore: 96, price: 54.99, rationale: 'Highly bioavailable magnesium form that crosses blood-brain barrier. Clean label, third-party tested.', caveats: 'Premium pricing compared to other magnesium forms.', category: 'Sleep Support' },
    { id: '5', name: 'Nordic Naturals Melatonin Gummies', brand: 'Nordic Naturals', imageUrl: 'https://placehold.co/200x200?text=Nordic', kleenScore: 85, price: 19.99, rationale: 'Low-dose melatonin, no artificial colors or flavors.', caveats: 'Gummies contain sugar — capsule form may be cleaner.', category: 'Sleep Support' },
  ],
};

const questions: Record<string, { question: string; options: string[] }[]> = {
  'hydration': [
    { question: 'How active are you?', options: ['Sedentary', 'Moderately active', 'Very active / athlete'] },
    { question: 'Any dietary restrictions?', options: ['None', 'Low sodium', 'Keto', 'Vegan'] },
  ],
  'sleep': [
    { question: 'What sleep issue do you face?', options: ['Falling asleep', 'Staying asleep', 'Sleep quality', 'All of the above'] },
    { question: 'Have you tried supplements before?', options: ['No, first time', 'Yes, melatonin', 'Yes, magnesium', 'Yes, multiple'] },
  ],
};

const GoalDiscovery = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [step, setStep] = useState<'goals' | 'questions' | 'results'>('goals');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setQuestionIndex(0);
    setAnswers([]);
    const goalQuestions = questions[goalId];
    if (goalQuestions && goalQuestions.length > 0) {
      setStep('questions');
    } else {
      setStep('results');
    }
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    const goalQuestions = questions[selectedGoal || ''] || [];
    if (questionIndex < goalQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setStep('results');
    }
  };

  const reset = () => {
    setSelectedGoal(null);
    setStep('goals');
    setQuestionIndex(0);
    setAnswers([]);
  };

  const currentGoal = goals.find(g => g.id === selectedGoal);
  const recommendations = mockRecommendations[selectedGoal || ''] || [];
  const currentQuestions = questions[selectedGoal || ''] || [];

  return (
    <DashboardLayout title="Goal-Based Discovery" description="Tell us your health goal and we'll recommend the cleanest products">
      <AnimatePresence mode="wait">
        {step === 'goals' && (
          <motion.div key="goals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {goals.map((goal, index) => (
                <motion.div key={goal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <Card className={`cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/30 ${goal.color.split(' ')[0]}`} onClick={() => handleGoalSelect(goal.id)}>
                    <CardContent className="pt-6 text-center">
                      <div className={`inline-flex p-3 rounded-xl mb-3 ${goal.color}`}>{goal.icon}</div>
                      <h3 className="font-semibold mb-1">{goal.name}</h3>
                      <p className="text-xs text-muted-foreground">{goal.description}</p>
                      <ChevronRight className="h-4 w-4 mx-auto mt-3 text-muted-foreground/50" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'questions' && currentQuestions[questionIndex] && (
          <motion.div key={`question-${questionIndex}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="max-w-lg mx-auto">
            <div className="mb-6">
              <Button variant="ghost" onClick={reset} className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Goals</Button>
              <Progress value={((questionIndex + 1) / currentQuestions.length) * 100} className="h-2 mb-4" />
              <p className="text-sm text-muted-foreground">Question {questionIndex + 1} of {currentQuestions.length}</p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6">{currentQuestions[questionIndex].question}</h2>
                <div className="space-y-3">
                  {currentQuestions[questionIndex].options.map((option) => (
                    <Button key={option} variant="outline" className="w-full justify-start text-left h-auto py-4" onClick={() => handleAnswer(option)}>
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" onClick={reset}><ArrowLeft className="h-4 w-4 mr-2" /> Back to Goals</Button>
              {currentGoal && (
                <Badge variant="outline" className={`${currentGoal.color} text-sm py-1 px-3`}>
                  {currentGoal.icon}
                  <span className="ml-1">{currentGoal.name}</span>
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              {recommendations.map((product, index) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <Card className={index === 0 ? 'ring-2 ring-primary' : ''}>
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img src={product.imageUrl} alt={product.name} className="w-32 h-32 rounded-lg object-cover bg-muted" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              {index === 0 && <Badge className="bg-primary text-primary-foreground mb-2">Top Pick</Badge>}
                              <p className="text-sm text-muted-foreground">{product.brand} · {product.category}</p>
                              <h3 className="text-lg font-semibold">{product.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">${product.price}</p>
                            </div>
                            <div className="text-center">
                              <div className={`text-3xl font-bold ${product.kleenScore >= 80 ? 'text-primary' : product.kleenScore >= 60 ? 'text-yellow-600' : 'text-destructive'}`}>
                                {product.kleenScore}
                              </div>
                              <p className="text-xs text-muted-foreground">Kleen Score</p>
                            </div>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="p-3 rounded-lg bg-primary/5">
                              <p className="text-sm"><Star className="h-3 w-3 inline mr-1 text-primary" /><strong>Why we recommend it:</strong> {product.rationale}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground"><strong>Caveat:</strong> {product.caveats}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="bg-primary">View Full Scorecard <ArrowRight className="ml-1 h-3 w-3" /></Button>
                            <Button size="sm" variant="outline">Save Product</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default GoalDiscovery;
