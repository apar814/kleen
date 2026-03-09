import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import {
  Trophy, Target, Flame, Share2, CheckCircle, Clock,
  Dumbbell, Baby, Dna, Heart, Scale, User
} from 'lucide-react';

interface Challenge {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: string;
  points: number;
  badge_emoji: string;
  is_active: boolean;
}

interface UserChallenge {
  id: string;
  challenge_id: string;
  status: string;
  progress: number;
  completed_at: string | null;
  challenges?: Challenge;
}

const categoryIcons: Record<string, React.ElementType> = {
  gym: Dumbbell,
  family: Baby,
  longevity: Dna,
  diabetes: Heart,
  weight_loss: Scale,
  aging: User,
};

const categoryLabels: Record<string, string> = {
  gym: 'Gym & Performance',
  family: 'Family & Kids',
  longevity: 'Longevity',
  diabetes: 'Diabetes',
  weight_loss: 'Weight Loss',
  aging: 'Healthy Aging',
};

const Challenges: React.FC = () => {
  const { user, profile } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch all active challenges
      const { data: challengesData } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true);
      
      if (challengesData) setChallenges(challengesData);
      
      // Fetch user's challenges
      if (user) {
        const { data: userChallengesData } = await supabase
          .from('user_challenges')
          .select('*, challenges(*)')
          .eq('user_id', user.id);
        
        if (userChallengesData) setUserChallenges(userChallengesData);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [user]);

  const joinChallenge = async (challengeId: string) => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Create an account to join challenges', variant: 'destructive' });
      return;
    }
    
    const { data, error } = await supabase
      .from('user_challenges')
      .insert({ user_id: user.id, challenge_id: challengeId, status: 'in_progress', progress: 0 })
      .select('*, challenges(*)')
      .single();
    
    if (error) {
      if (error.code === '23505') {
        toast({ title: 'Already joined', description: 'You are already part of this challenge' });
      } else {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
    } else {
      setUserChallenges([...userChallenges, data]);
      toast({ title: '🎯 Challenge accepted!', description: 'Complete the challenge to earn your badge!' });
    }
  };

  const isJoined = (challengeId: string) => userChallenges.some(uc => uc.challenge_id === challengeId);
  const getUserChallenge = (challengeId: string) => userChallenges.find(uc => uc.challenge_id === challengeId);

  const filteredChallenges = activeTab === 'all' 
    ? challenges 
    : activeTab === 'my' 
      ? challenges.filter(c => isJoined(c.id))
      : challenges.filter(c => c.category === activeTab);

  const completedCount = userChallenges.filter(uc => uc.status === 'completed').length;
  const totalPoints = userChallenges
    .filter(uc => uc.status === 'completed')
    .reduce((acc, uc) => acc + (uc.challenges?.points || 0), 0);

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-primary/10 text-primary';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'hard': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout
      title="Clean Swap Challenges"
      description="Weekly challenges to level up your health game"
    >
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <Flame className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold text-foreground">{userChallenges.filter(uc => uc.status === 'in_progress').length}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-6 w-6 text-amber-500 mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold text-foreground">{completedCount}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold text-foreground">{totalPoints}</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Share2 className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold text-foreground">{completedCount}</div>
            <div className="text-xs text-muted-foreground">Badges Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All Challenges
          </TabsTrigger>
          <TabsTrigger value="my" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            My Challenges
          </TabsTrigger>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <TabsTrigger 
              key={key} 
              value={key}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Challenges grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge, i) => {
          const Icon = categoryIcons[challenge.category] || Target;
          const userChallenge = getUserChallenge(challenge.id);
          const joined = !!userChallenge;
          const completed = userChallenge?.status === 'completed';
          
          return (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`h-full ${completed ? 'border-primary bg-primary/5' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                        {challenge.badge_emoji}
                      </div>
                      <div>
                        <CardTitle className="font-heading text-base">{challenge.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            <Icon className="h-3 w-3 mr-1" />
                            {categoryLabels[challenge.category]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-foreground">
                      +{challenge.points} points
                    </span>
                    {joined && !completed && (
                      <div className="flex items-center gap-2">
                        <Progress value={userChallenge?.progress || 0} className="w-20 h-2" />
                        <span className="text-xs text-muted-foreground">{userChallenge?.progress}%</span>
                      </div>
                    )}
                  </div>
                  
                  {completed ? (
                    <Button className="w-full" variant="outline" disabled>
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" /> Completed!
                    </Button>
                  ) : joined ? (
                    <Button className="w-full" variant="outline">
                      <Clock className="mr-2 h-4 w-4" /> In Progress
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-primary-glow"
                      onClick={() => joinChallenge(challenge.id)}
                    >
                      <Target className="mr-2 h-4 w-4" /> Accept Challenge
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">No challenges found in this category</p>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default Challenges;
