import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Shield, Sparkles, Leaf } from 'lucide-react';
import KleenLogo from '@/components/KleenLogo';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === 'signup') {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: 'Sign up failed', description: error, variant: 'destructive' });
      } else {
        toast({ title: 'Account created!', description: 'Please check your email to verify your account.' });
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: 'Login failed', description: error, variant: 'destructive' });
      } else {
        navigate('/onboarding');
      }
    }
    setLoading(false);
  };

  const benefits = [
    { icon: Shield, text: 'AI-powered toxin detection' },
    { icon: Sparkles, text: 'Personalized clean alternatives' },
    { icon: Leaf, text: 'Track your wellness journey' },
  ];

  return (
    <div className="min-h-screen flex font-body" style={{ background: 'var(--gradient-hero)' }}>
      {/* Left panel - branding */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="relative z-10">
          <KleenLogo size="lg" />
          <h1 className="font-heading text-h1 text-foreground mt-8 mb-4">
            Shop cleaner.<br /><span className="gradient-text">Live better.</span>
          </h1>
          <p className="text-body-lg text-muted-foreground max-w-md mb-10">
            Join thousands making healthier choices with AI-powered ingredient analysis.
          </p>
          <div className="space-y-4">
            {benefits.map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-body text-foreground font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="lg:hidden mb-8 text-center">
            <KleenLogo size="md" className="justify-center" />
          </div>

          <Card className="shadow-elevated border-border/50">
            <CardContent className="p-8">
              <h2 className="font-heading text-h3 text-foreground mb-1">
                {mode === 'signup' ? 'Create your account' : 'Welcome back'}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {mode === 'signup' ? 'Start your clean living journey today' : 'Sign in to continue your journey'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {mode === 'signup' && (
                    <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <Input
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-12"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold shadow-glow hover:shadow-elevated transition-all"
                >
                  {loading ? 'Loading...' : mode === 'signup' ? 'Create account' : 'Sign in'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
