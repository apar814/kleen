import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingDown, Dumbbell, Activity, Utensils, Flame, TrendingUp,
  CloudRain, Sun, Wind, Scale, Crown, Users,
  Moon, BedDouble, Clock, Zap, Plane, EyeOff,
  Battery, Brain, Footprints, Lightbulb, Sparkles, Target,
  Heart, CircleDot, AlertTriangle, ShieldAlert, Shield, RefreshCw,
  Infinity, Atom, Hourglass, Dna, Recycle,
  Snowflake, Timer, Cpu, HeartPulse, LineChart,
  Crosshair, Frown, PersonStanding,
  Smile, Scissors, Hand,
  Thermometer, BarChart, Gauge, ShieldCheck, ArrowUpCircle,
  Flower, Droplets, AlertOctagon,
  Baby, Apple,
  ArrowRight, ArrowLeft, Star, ChevronRight, Search, X
} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { wellnessGoals, goalCategories, type WellnessGoal } from '@/data/wellnessGoals';

const iconMap: Record<string, React.ReactNode> = {
  TrendingDown: <TrendingDown className="h-5 w-5" />,
  Dumbbell: <Dumbbell className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  Utensils: <Utensils className="h-5 w-5" />,
  Flame: <Flame className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
  CloudRain: <CloudRain className="h-5 w-5" />,
  Sun: <Sun className="h-5 w-5" />,
  Wind: <Wind className="h-5 w-5" />,
  Scale: <Scale className="h-5 w-5" />,
  Crown: <Crown className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  Moon: <Moon className="h-5 w-5" />,
  BedDouble: <BedDouble className="h-5 w-5" />,
  Clock: <Clock className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Plane: <Plane className="h-5 w-5" />,
  EyeOff: <EyeOff className="h-5 w-5" />,
  Battery: <Battery className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
  Footprints: <Footprints className="h-5 w-5" />,
  Lightbulb: <Lightbulb className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Target: <Target className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
  CircleDot: <CircleDot className="h-5 w-5" />,
  AlertTriangle: <AlertTriangle className="h-5 w-5" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
  RefreshCw: <RefreshCw className="h-5 w-5" />,
  Infinity: <Infinity className="h-5 w-5" />,
  Atom: <Atom className="h-5 w-5" />,
  Hourglass: <Hourglass className="h-5 w-5" />,
  Dna: <Dna className="h-5 w-5" />,
  Recycle: <Recycle className="h-5 w-5" />,
  Snowflake: <Snowflake className="h-5 w-5" />,
  Timer: <Timer className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  HeartPulse: <HeartPulse className="h-5 w-5" />,
  LineChart: <LineChart className="h-5 w-5" />,
  Crosshair: <Crosshair className="h-5 w-5" />,
  Bone: <Dumbbell className="h-5 w-5" />,
  Frown: <Frown className="h-5 w-5" />,
  PersonStanding: <PersonStanding className="h-5 w-5" />,
  Smile: <Smile className="h-5 w-5" />,
  Scissors: <Scissors className="h-5 w-5" />,
  Hand: <Hand className="h-5 w-5" />,
  Thermometer: <Thermometer className="h-5 w-5" />,
  BarChart: <BarChart className="h-5 w-5" />,
  Gauge: <Gauge className="h-5 w-5" />,
  ShieldCheck: <ShieldCheck className="h-5 w-5" />,
  ArrowUpCircle: <ArrowUpCircle className="h-5 w-5" />,
  Flower: <Flower className="h-5 w-5" />,
  Droplets: <Droplets className="h-5 w-5" />,
  AlertOctagon: <AlertOctagon className="h-5 w-5" />,
  Baby: <Baby className="h-5 w-5" />,
  Apple: <Apple className="h-5 w-5" />,
};

const categoryColors: Record<string, string> = {
  'Weight & Body Composition': 'bg-orange-50 text-orange-600 border-orange-200',
  'Mental Health & Mood': 'bg-violet-50 text-violet-600 border-violet-200',
  'Sleep & Recovery': 'bg-indigo-50 text-indigo-600 border-indigo-200',
  'Energy & Performance': 'bg-amber-50 text-amber-600 border-amber-200',
  'Gut & Digestion': 'bg-rose-50 text-rose-600 border-rose-200',
  'Longevity & Anti-Aging': 'bg-emerald-50 text-emerald-600 border-emerald-200',
  'Biohacking & Optimization': 'bg-cyan-50 text-cyan-600 border-cyan-200',
  'Pain & Inflammation': 'bg-red-50 text-red-600 border-red-200',
  'Skin, Hair & Beauty': 'bg-pink-50 text-pink-600 border-pink-200',
  'Hormones & Fertility': 'bg-purple-50 text-purple-600 border-purple-200',
  'Heart & Metabolic Health': 'bg-sky-50 text-sky-600 border-sky-200',
  'Immune & Detox': 'bg-teal-50 text-teal-600 border-teal-200',
  'Kids & Family': 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-200',
};

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

// Generic recommendations shown for any goal (will be replaced with real DB data later)
const getGenericRecommendations = (goal: WellnessGoal): RecommendedProduct[] => [
  {
    id: `${goal.id}-1`,
    name: `Top Pick for ${goal.name}`,
    brand: 'Coming Soon',
    imageUrl: `https://placehold.co/200x200/f0fdf4/16a34a?text=${encodeURIComponent(goal.name.slice(0, 8))}`,
    kleenScore: 92,
    price: 39.99,
    rationale: `Our AI is analyzing the cleanest products for ${goal.name.toLowerCase()}. Check back soon for personalized recommendations.`,
    caveats: 'Recommendations will be based on your specific answers and Kleen Score analysis.',
    category: goal.category,
  },
];

const questions: Record<string, { question: string; options: string[] }[]> = {
  'weight-loss': [
    { question: 'What is your primary weight loss approach?', options: ['Calorie deficit', 'Intermittent fasting', 'Keto / low-carb', 'Just starting out'] },
    { question: 'Any dietary restrictions?', options: ['None', 'Vegan', 'Gluten-free', 'Dairy-free'] },
  ],
  'anxiety-relief': [
    { question: 'When do you experience the most anxiety?', options: ['Morning', 'Throughout the day', 'Evening / night', 'Social situations'] },
    { question: 'Have you tried supplements for anxiety before?', options: ['No, first time', 'Yes, magnesium', 'Yes, ashwagandha', 'Yes, multiple'] },
  ],
  'fall-asleep': [
    { question: 'What keeps you awake?', options: ['Racing thoughts', 'Physical restlessness', 'Screen time', "Not sure"] },
    { question: 'What time do you typically try to sleep?', options: ['Before 10pm', '10pm - midnight', 'After midnight', 'Irregular'] },
  ],
  'gut-health': [
    { question: 'What digestive issues do you experience?', options: ['Bloating', 'Irregular bowel', 'Food sensitivities', 'General discomfort'] },
    { question: 'Do you currently take probiotics?', options: ['No', 'Yes, daily', 'Occasionally', 'Tried but stopped'] },
  ],
  'longevity': [
    { question: 'What aspect of longevity interests you most?', options: ['Cellular health (NAD+/NMN)', 'Cognitive preservation', 'Physical vitality', 'All of the above'] },
    { question: 'Current supplement routine?', options: ['None', 'Basic multivitamin', 'Several supplements', 'Extensive stack'] },
  ],
  'focus-cognition': [
    { question: 'When do you need the most focus?', options: ['Morning work', 'Afternoon slump', 'Study sessions', 'All day'] },
    { question: 'Caffeine sensitivity?', options: ['None - drink coffee daily', 'Moderate', 'Very sensitive', 'Avoid completely'] },
  ],
};

const GoalDiscovery = () => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [step, setStep] = useState<'goals' | 'questions' | 'results'>('goals');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredGoals = useMemo(() => {
    return wellnessGoals.filter((goal) => {
      const matchesCategory = activeCategory === 'All' || goal.category === activeCategory;
      const matchesSearch = !searchQuery ||
        goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const groupedGoals = useMemo(() => {
    if (activeCategory !== 'All') return { [activeCategory]: filteredGoals };
    const groups: Record<string, WellnessGoal[]> = {};
    filteredGoals.forEach((goal) => {
      if (!groups[goal.category]) groups[goal.category] = [];
      groups[goal.category].push(goal);
    });
    return groups;
  }, [filteredGoals, activeCategory]);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setQuestionIndex(0);
    setAnswers([]);
    if (questions[goalId]?.length) {
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

  const currentGoal = wellnessGoals.find(g => g.id === selectedGoal);
  const recommendations = currentGoal ? getGenericRecommendations(currentGoal) : [];
  const currentQuestions = questions[selectedGoal || ''] || [];
  const goalColor = currentGoal ? categoryColors[currentGoal.category] || 'bg-muted text-foreground' : '';

  return (
    <DashboardLayout title="Goal-Based Discovery" description="Choose from 75 wellness goals — we'll recommend the cleanest products for your journey">
      <AnimatePresence mode="wait">
        {step === 'goals' && (
          <motion.div key="goals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search goals (e.g. sleep, anxiety, longevity...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {goalCategories.map((cat) => (
                <Badge
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer text-xs py-1 px-3 transition-colors"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredGoals.length} of {wellnessGoals.length} goals
            </p>

            {/* Grouped goal cards */}
            {Object.entries(groupedGoals).map(([category, goals]) => (
              <div key={category} className="mb-8">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded-full ${(categoryColors[category] || '').split(' ')[0]}`} />
                  {category}
                  <span className="text-sm font-normal text-muted-foreground">({goals.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {goals.map((goal, index) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.02, 0.3) }}
                    >
                      <Card
                        className={`cursor-pointer hover:shadow-md transition-all border hover:border-primary/30 ${(categoryColors[goal.category] || 'bg-muted').split(' ')[0]}`}
                        onClick={() => handleGoalSelect(goal.id)}
                      >
                        <CardContent className="p-4 flex items-start gap-3">
                          <div className={`shrink-0 p-2 rounded-lg ${categoryColors[goal.category] || 'bg-muted text-foreground'}`}>
                            {iconMap[goal.icon] || <Target className="h-5 w-5" />}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm leading-tight">{goal.name}</h3>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{goal.description}</p>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 mt-0.5" />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {filteredGoals.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p>No goals match your search. Try a different term.</p>
              </div>
            )}
          </motion.div>
        )}

        {step === 'questions' && currentQuestions[questionIndex] && (
          <motion.div key={`question-${questionIndex}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="max-w-lg mx-auto">
            <div className="mb-6">
              <Button variant="ghost" onClick={reset} className="mb-4"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Goals</Button>
              <Progress value={((questionIndex + 1) / currentQuestions.length) * 100} className="h-2 mb-4" />
              <div className="flex items-center gap-2 mb-2">
                {currentGoal && (
                  <Badge variant="outline" className={`${goalColor} text-xs`}>
                    {iconMap[currentGoal.icon]} <span className="ml-1">{currentGoal.name}</span>
                  </Badge>
                )}
              </div>
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
                <Badge variant="outline" className={`${goalColor} text-sm py-1 px-3`}>
                  {iconMap[currentGoal.icon]}
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
                              <p className="text-sm text-muted-foreground"><strong>Note:</strong> {product.caveats}</p>
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
