import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Heart, MessageCircle, Share2, TrendingUp, Sparkles, Trophy,
  ShoppingCart, ChefHat, Target, Leaf, Search, Send
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SocialPost {
  id: string;
  user_id: string;
  post_type: string;
  content: {
    title?: string;
    score?: number;
    description?: string;
    image_url?: string;
    badge_emoji?: string;
  };
  community: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles?: {
    display_name: string;
    avatar_url: string;
  };
}

const postTypeIcons: Record<string, React.ElementType> = {
  scan: ShoppingCart,
  recipe: ChefHat,
  challenge: Trophy,
  swap: Leaf,
  milestone: Sparkles,
};

const postTypeLabels: Record<string, string> = {
  scan: 'Product Scan',
  recipe: 'Recipe Score',
  challenge: 'Challenge Complete',
  swap: 'Clean Swap',
  milestone: 'Milestone',
};

const CommunityFeed: React.FC = () => {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('social_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (data) {
        let filteredData = activeTab !== 'all' && activeTab !== 'trending'
          ? data.filter(p => p.community === activeTab)
          : data;
        
        // For trending, sort by engagement
        if (activeTab === 'trending') {
          filteredData.sort((a, b) => (b.likes_count + b.comments_count) - (a.likes_count + a.comments_count));
        }
        
        // Map data to include profiles placeholder
        setPosts(filteredData.map(p => ({
          ...p,
          content: p.content as SocialPost['content'],
          profiles: undefined,
        })) as SocialPost[]);
      }
      
      // Fetch user's likes
      if (user) {
        const { data: likesData } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id);
        
        if (likesData) {
          setLikedPosts(new Set(likesData.map(l => l.post_id)));
        }
      }
      
      setLoading(false);
    };
    
    fetchPosts();
  }, [user, activeTab]);

  const handleLike = async (postId: string) => {
    if (!user) {
      toast({ title: 'Sign in to like posts', variant: 'destructive' });
      return;
    }
    
    const isLiked = likedPosts.has(postId);
    
    if (isLiked) {
      await supabase.from('post_likes').delete().eq('user_id', user.id).eq('post_id', postId);
      setLikedPosts(prev => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
      setPosts(posts.map(p => p.id === postId ? { ...p, likes_count: p.likes_count - 1 } : p));
    } else {
      await supabase.from('post_likes').insert({ user_id: user.id, post_id: postId });
      setLikedPosts(prev => new Set(prev).add(postId));
      setPosts(posts.map(p => p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p));
    }
  };

  const handleShare = async (post: SocialPost) => {
    const shareText = `${post.content.title || 'Check this out!'} - ${post.content.score ? `Score: ${post.content.score}/100` : ''}\n\nShared via Kleen.ai`;
    
    if (navigator.share) {
      await navigator.share({ title: post.content.title, text: shareText, url: window.location.origin });
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({ title: 'Copied to clipboard!' });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-amber-600';
    return 'text-destructive';
  };

  return (
    <DashboardLayout
      title="Community Feed"
      description="See what the Kleen community is scanning and swapping"
    >
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <TrendingUp className="h-4 w-4 mr-1" /> Trending
          </TabsTrigger>
          <TabsTrigger value="gym" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🏋️ Gym
          </TabsTrigger>
          <TabsTrigger value="family" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            👩‍👧 Family
          </TabsTrigger>
          <TabsTrigger value="longevity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🧬 Longevity
          </TabsTrigger>
          <TabsTrigger value="diabetes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            🩺 Diabetes
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main feed */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {posts.map((post, i) => {
              const Icon = postTypeIcons[post.post_type] || Sparkles;
              const isLiked = likedPosts.has(post.id);
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="hover:shadow-elevated transition-shadow">
                    <CardContent className="p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={post.profiles?.avatar_url || undefined} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {post.profiles?.display_name?.[0] || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {post.profiles?.display_name || 'Kleen User'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Icon className="h-3 w-3" />
                          {postTypeLabels[post.post_type]}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="mb-4">
                        {post.content.badge_emoji && (
                          <span className="text-4xl mr-3">{post.content.badge_emoji}</span>
                        )}
                        <h3 className="font-heading text-lg font-semibold text-foreground inline">
                          {post.content.title}
                        </h3>
                        {post.content.score && (
                          <span className={`ml-3 font-heading text-2xl font-bold ${getScoreColor(post.content.score)}`}>
                            {post.content.score}/100
                          </span>
                        )}
                        {post.content.description && (
                          <p className="text-sm text-muted-foreground mt-2">{post.content.description}</p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 pt-3 border-t border-border">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={isLiked ? 'text-destructive' : 'text-muted-foreground'}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                          {post.likes_count}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments_count}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-muted-foreground ml-auto"
                          onClick={() => handleShare(post)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {posts.length === 0 && !loading && (
            <Card className="text-center py-12">
              <CardContent>
                <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">No posts yet in this feed</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Scan a product or complete a challenge to share with the community!
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Scans */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Trending This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Protein Powder', 'Almond Milk', 'Energy Bars', 'Multivitamins', 'Pre-Workout'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-bold text-muted-foreground w-6">#{i + 1}</span>
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{Math.floor(Math.random() * 500) + 100} scans</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-heading text-base flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Sarah M.', points: 2450, badge: '🏆' },
                  { name: 'Mike R.', points: 2180, badge: '🥈' },
                  { name: 'Emma L.', points: 1920, badge: '🥉' },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-accent/50">
                    <span className="text-xl">{user.badge}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.points} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
            <CardContent className="p-5 text-center">
              <Sparkles className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="font-heading font-semibold text-foreground mb-2">Share Your Journey</p>
              <p className="text-sm text-muted-foreground mb-4">
                Scan a product to auto-post to the community
              </p>
              <Button className="w-full bg-gradient-to-r from-primary to-primary-glow">
                <Search className="mr-2 h-4 w-4" /> Scan a Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommunityFeed;
