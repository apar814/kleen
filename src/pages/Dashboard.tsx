import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Shield, TrendingUp, AlertTriangle, Leaf, ArrowRight,
  ShoppingCart, Search, BookOpen, ChefHat, BarChart3, Zap, Heart, Eye
} from 'lucide-react';

// Kleen vs Toxic comparison data
const comparisonData = [
  {
    toxic: { name: 'Red 40 (Allura Red)', risk: 5, found: 'Candy, cereals, drinks', harm: 'Linked to hyperactivity in children, potential carcinogen' },
    clean: { name: 'Beet Juice Extract', benefit: 'Natural color from beets, rich in antioxidants' },
  },
  {
    toxic: { name: 'Sodium Benzoate', risk: 4, found: 'Sodas, salad dressings', harm: 'Forms benzene (carcinogen) when combined with vitamin C' },
    clean: { name: 'Citric Acid', benefit: 'Natural preservative from citrus fruits' },
  },
  {
    toxic: { name: 'BHA (Butylated Hydroxyanisole)', risk: 5, found: 'Chips, butter, cereals', harm: 'Reasonably anticipated to be a human carcinogen (NTP)' },
    clean: { name: 'Vitamin E (Tocopherols)', benefit: 'Natural antioxidant preservative, supports cell health' },
  },
  {
    toxic: { name: 'Titanium Dioxide', risk: 4, found: 'Candy coating, supplements', harm: 'Banned in EU food. Potential DNA damage via nanoparticles' },
    clean: { name: 'Rice Starch', benefit: 'Natural coating agent, easily digestible' },
  },
];

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [activeComparison, setActiveComparison] = useState(0);
  const displayName = profile?.display_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';

  const metrics = [
    { label: 'Kleen Score', value: '78', suffix: '/100', icon: Shield, color: 'text-primary', bgColor: 'bg-primary/10', trend: '+5 this week' },
    { label: 'Products Scanned', value: '24', icon: Search, color: 'text-blue-600', bgColor: 'bg-blue-50', trend: '3 today' },
    { label: 'Toxins Avoided', value: '47', icon: AlertTriangle, color: 'text-destructive', bgColor: 'bg-destructive/10', trend: '12 this month' },
    { label: 'Clean Swaps Made', value: '18', icon: Leaf, color: 'text-emerald-600', bgColor: 'bg-emerald-50', trend: '5 this week' },
  ];

  const quickActions = [
    { label: 'Grocery List', icon: ShoppingCart, to: '/grocery-list', desc: 'Build & score your cart' },
    { label: 'Search Products', icon: Search, to: '/search', desc: 'Find & score any product' },
    { label: 'Challenges', icon: BarChart3, to: '/challenges', desc: 'Weekly clean swap goals' },
    { label: 'Recipe Builder', icon: ChefHat, to: '/recipes', desc: 'AI-powered clean recipes' },
    { label: 'Community', icon: Heart, to: '/community', desc: 'See trending scans' },
    { label: 'Ingredients DB', icon: BookOpen, to: '/ingredients', desc: 'Full ingredient deep-dives' },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${displayName}`}
      description="Your clean living command center"
    >
      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="border-border/60 hover:shadow-elevated transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${m.bgColor} flex items-center justify-center`}>
                    <m.icon className={`h-5 w-5 ${m.color}`} />
                  </div>
                  <Badge variant="outline" className="text-xs">{m.trend}</Badge>
                </div>
                <div className="font-heading text-3xl font-bold text-foreground">
                  {m.value}<span className="text-lg text-muted-foreground font-normal">{m.suffix || ''}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{m.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Kleen vs Toxic - Interactive */}
        <div className="lg:col-span-2">
          <Card className="border-border/60">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-h3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Kleen vs Toxic
                </CardTitle>
                <Badge className="bg-destructive/10 text-destructive border-0">Educational</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Tap to explore common toxic ingredients and their clean alternatives</p>
            </CardHeader>
            <CardContent>
              {/* Selector pills */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {comparisonData.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveComparison(i)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all ${
                      activeComparison === i
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {c.toxic.name.split(' (')[0]}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Toxic side */}
                <motion.div key={`toxic-${activeComparison}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border-2 border-destructive/20 bg-destructive/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span className="font-heading font-semibold text-destructive">Toxic</span>
                    <Badge variant="outline" className="ml-auto text-destructive border-destructive/30">
                      Risk {comparisonData[activeComparison].toxic.risk}/5
                    </Badge>
                  </div>
                  <h4 className="font-heading font-bold text-foreground mb-2">{comparisonData[activeComparison].toxic.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    <strong>Found in:</strong> {comparisonData[activeComparison].toxic.found}
                  </p>
                  <div className="p-3 rounded-xl bg-destructive/10">
                    <p className="text-sm text-destructive font-medium">⚠️ {comparisonData[activeComparison].toxic.harm}</p>
                  </div>
                </motion.div>

                {/* Clean side */}
                <motion.div key={`clean-${activeComparison}`} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="h-5 w-5 text-primary" />
                    <span className="font-heading font-semibold text-primary">Clean Alternative</span>
                  </div>
                  <h4 className="font-heading font-bold text-foreground mb-2">{comparisonData[activeComparison].clean.name}</h4>
                  <div className="p-3 rounded-xl bg-primary/10 mt-6">
                    <p className="text-sm text-primary font-medium">✅ {comparisonData[activeComparison].clean.benefit}</p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-h3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((a) => (
              <Link key={a.label} to={a.to}>
                <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <a.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{a.label}</div>
                    <div className="text-xs text-muted-foreground">{a.desc}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Health Score Overview */}
      <Card className="border-border/60 mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="font-heading text-h3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Your Wellness Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: 'Clean Eating Score', value: 72, color: 'bg-primary' },
              { label: 'Toxin Exposure Reduction', value: 58, color: 'bg-emerald-500' },
              { label: 'Goal Progress', value: 45, color: 'bg-blue-500' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-sm font-bold text-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-3" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
