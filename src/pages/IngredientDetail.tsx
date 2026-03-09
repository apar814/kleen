import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  AlertTriangle, CheckCircle, XCircle, Globe, ExternalLink, 
  Share2, ArrowLeft, Beaker, Apple, BookOpen, Flag
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Country flag emojis for banned_in display
const countryFlags: Record<string, string> = {
  'EU': '🇪🇺', 'UK': '🇬🇧', 'Canada': '🇨🇦', 'Japan': '🇯🇵', 'Australia': '🇦🇺',
  'Norway': '🇳🇴', 'Sweden': '🇸🇪', 'Germany': '🇩🇪', 'France': '🇫🇷', 'New Zealand': '🇳🇿',
  'Austria': '🇦🇹', 'Finland': '🇫🇮', 'Switzerland': '🇨🇭', 'China': '🇨🇳', 'Brazil': '🇧🇷',
};

interface Ingredient {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  risk_level: number;
  health_risks: string[];
  banned_in: string[];
  description: string;
  ai_summary: string;
  found_in: string[];
  clean_alternatives: string[];
  sources: string[];
}

const IngredientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredient = async () => {
      if (!id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        toast({ title: 'Error loading ingredient', variant: 'destructive' });
      } else {
        setIngredient(data);
      }
      setLoading(false);
    };
    fetchIngredient();
  }, [id]);

  const getVerdict = (riskLevel: number) => {
    if (riskLevel <= 2) return { label: 'Generally Safe', icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10' };
    if (riskLevel <= 3) return { label: 'Use Caution', icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Avoid', icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10' };
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Did you know about ${ingredient?.name}? ${ingredient?.ai_summary?.slice(0, 100)}... Learn more on Kleen.ai`;
    
    if (navigator.share) {
      await navigator.share({ title: ingredient?.name, text: shareText, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: 'Link copied!', description: 'Share it with friends' });
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Loading..." description="">
        <div className="space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-60 w-full" />
        </div>
      </DashboardLayout>
    );
  }

  if (!ingredient) {
    return (
      <DashboardLayout title="Not Found" description="Ingredient not found">
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">This ingredient doesn't exist in our database.</p>
            <Link to="/ingredients">
              <Button><ArrowLeft className="mr-2 h-4 w-4" /> Back to Database</Button>
            </Link>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const verdict = getVerdict(ingredient.risk_level);

  return (
    <DashboardLayout
      title={ingredient.name}
      description={ingredient.category}
    >
      {/* Back button */}
      <Link to="/ingredients" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Ingredient Database
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Verdict Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className={`border-2 ${verdict.bg} border-transparent`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl ${verdict.bg} flex items-center justify-center`}>
                      <verdict.icon className={`h-7 w-7 ${verdict.color}`} />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-foreground">{ingredient.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{ingredient.category}</Badge>
                        <Badge className={`${verdict.bg} ${verdict.color} border-0`}>
                          Risk Level {ingredient.risk_level}/5
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" /> Share
                  </Button>
                </div>
                
                {/* Verdict banner */}
                <div className={`p-4 rounded-xl ${verdict.bg} flex items-center gap-3`}>
                  <verdict.icon className={`h-6 w-6 ${verdict.color}`} />
                  <div>
                    <span className={`font-heading font-bold ${verdict.color}`}>{verdict.label}</span>
                    <p className="text-sm text-muted-foreground">Kleen's verdict based on scientific research</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  What You Need to Know
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{ingredient.ai_summary}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Technical Description */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <Beaker className="h-5 w-5 text-blue-500" />
                  Scientific Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{ingredient.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Health Risks */}
          {ingredient.health_risks && ingredient.health_risks.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-destructive/20">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-lg flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5" />
                    Known Health Concerns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {ingredient.health_risks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                        <span className="text-foreground">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Banned Countries */}
          {ingredient.banned_in && ingredient.banned_in.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Card className="border-amber-500/20 bg-amber-50/50">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <Globe className="h-5 w-5 text-amber-600" />
                    Banned or Restricted Worldwide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This ingredient is prohibited or restricted in the following countries:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.banned_in.map((country, i) => (
                      <Badge key={i} variant="outline" className="text-amber-700 border-amber-300 bg-amber-100 px-3 py-1.5">
                        <span className="mr-1.5">{countryFlags[country] || <Flag className="h-3 w-3" />}</span>
                        {country}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    💡 Many countries follow the "precautionary principle" — banning substances until proven safe rather than waiting for harm.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Aliases */}
          {ingredient.aliases && ingredient.aliases.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm">Also Known As</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {ingredient.aliases.map((alias, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{alias}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Found In */}
          {ingredient.found_in && ingredient.found_in.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm flex items-center gap-2">
                  <Apple className="h-4 w-4 text-primary" />
                  Commonly Found In
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {ingredient.found_in.map((product, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {product}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Clean Alternatives */}
          {ingredient.clean_alternatives && ingredient.clean_alternatives.length > 0 && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm flex items-center gap-2 text-primary">
                  <CheckCircle className="h-4 w-4" />
                  Cleaner Alternatives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {ingredient.clean_alternatives.map((alt, i) => (
                    <li key={i} className="text-sm text-foreground flex items-center gap-2">
                      <span className="text-primary">✓</span> {alt}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Sources */}
          {ingredient.sources && ingredient.sources.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm">Research & Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {ingredient.sources.map((source, i) => (
                    <li key={i}>
                      <a 
                        href={source} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {new URL(source).hostname}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Share CTA */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
            <CardContent className="p-5 text-center">
              <p className="font-heading font-semibold text-foreground mb-2">Share this knowledge</p>
              <p className="text-sm text-muted-foreground mb-4">
                Help others learn about {ingredient.name}
              </p>
              <Button className="w-full" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share on Social
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IngredientDetail;
