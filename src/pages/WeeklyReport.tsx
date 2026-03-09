import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Share2, Download, TrendingUp, TrendingDown, Trophy, Flame, BarChart3, Star, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WeeklyReportData {
  id: string;
  week_start: string;
  week_end: string;
  overall_score: number | null;
  data: {
    scans_count?: number;
    daily_scans?: { day: string; count: number }[];
    best_find?: { name: string; score: number };
    worst_offender?: { name: string; score: number };
    category_breakdown?: { name: string; value: number }[];
    streak?: number;
    challenges_completed?: number;
    previous_score?: number;
  };
  generated_at: string;
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--secondary))', '#f59e0b', '#ef4444'];

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-primary';
  if (score >= 60) return 'text-amber-500';
  return 'text-destructive';
};

const WeeklyReport: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<WeeklyReportData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const fetch = async () => {
      const { data } = await supabase
        .from('weekly_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('week_start', { ascending: false })
        .limit(12);
      if (data) setReports(data as unknown as WeeklyReportData[]);
      setLoading(false);
    };
    fetch();
  }, [user]);

  const latest = reports[0];
  const reportData = latest?.data || {};
  const score = latest?.overall_score || 0;
  const prevScore = reportData.previous_score || 0;
  const scoreDiff = score - prevScore;

  const handleShare = () => {
    const text = `My Kleen weekly health score: ${score}/100 🌿 I scanned ${reportData.scans_count || 0} products this week! #KleenAI`;
    if (navigator.share) {
      navigator.share({ title: 'My Kleen Weekly Report', text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  if (loading) {
    return <DashboardLayout title="Weekly Report" description="Loading..."><div /></DashboardLayout>;
  }

  if (!latest) {
    return (
      <DashboardLayout title="Weekly Health Report" description="Your personalized weekly health summary">
        <Card className="text-center py-16">
          <CardContent>
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">No reports yet</p>
            <p className="text-sm text-muted-foreground/60 mt-1">Start scanning products and your first weekly report will be generated on Sunday!</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Weekly Health Report" description={`Week of ${new Date(latest.week_start).toLocaleDateString()} — ${new Date(latest.week_end).toLocaleDateString()}`}>
      {/* Score Hero */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <p className="text-sm text-muted-foreground mb-2">Overall Week Score</p>
            <div className={`font-heading text-7xl font-bold ${getScoreColor(score)}`}>{score}</div>
            <div className="flex items-center justify-center gap-1 mt-2">
              {scoreDiff > 0 ? <TrendingUp className="h-4 w-4 text-primary" /> : scoreDiff < 0 ? <TrendingDown className="h-4 w-4 text-destructive" /> : null}
              <span className={`text-sm font-medium ${scoreDiff > 0 ? 'text-primary' : scoreDiff < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {scoreDiff > 0 ? '+' : ''}{scoreDiff} from last week
              </span>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <Button onClick={handleShare} className="bg-gradient-to-r from-primary to-primary-glow">
                <Share2 className="h-4 w-4 mr-2" /> Share Report
              </Button>
              <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold">{reportData.scans_count || 0}</div>
            <div className="text-xs text-muted-foreground">Products Scanned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="h-5 w-5 text-orange-500 mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold">{reportData.streak || 0}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-5 w-5 text-amber-500 mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold">{reportData.challenges_completed || 0}</div>
            <div className="text-xs text-muted-foreground">Challenges Done</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="font-heading text-2xl font-bold">{reportData.best_find?.score || '—'}</div>
            <div className="text-xs text-muted-foreground">Best Find</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Daily Scans Chart */}
        {reportData.daily_scans && reportData.daily_scans.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Daily Scan Activity</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={reportData.daily_scans}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Category Breakdown */}
        {reportData.category_breakdown && reportData.category_breakdown.length > 0 && (
          <Card>
            <CardHeader><CardTitle className="text-base">Category Breakdown</CardTitle></CardHeader>
            <CardContent className="flex items-center gap-4">
              <ResponsiveContainer width={140} height={140}>
                <PieChart>
                  <Pie data={reportData.category_breakdown} dataKey="value" nameKey="name" innerRadius={40} outerRadius={65}>
                    {reportData.category_breakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {reportData.category_breakdown.map((cat, i) => (
                  <div key={cat.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground">{cat.name}</span>
                    <span className="font-medium">{cat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Best & Worst */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {reportData.best_find && (
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-primary" />
                <h3 className="font-heading font-semibold">Best Find This Week</h3>
              </div>
              <p className="text-foreground font-medium">{reportData.best_find.name}</p>
              <Badge className="mt-2 bg-primary/10 text-primary">Score: {reportData.best_find.score}/100</Badge>
            </CardContent>
          </Card>
        )}
        {reportData.worst_offender && (
          <Card className="border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h3 className="font-heading font-semibold">Worst Offender</h3>
              </div>
              <p className="text-foreground font-medium">{reportData.worst_offender.name}</p>
              <Badge className="mt-2 bg-destructive/10 text-destructive">Score: {reportData.worst_offender.score}/100</Badge>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Past Reports */}
      {reports.length > 1 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Past Reports</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.slice(1).map(r => (
                <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">
                    {new Date(r.week_start).toLocaleDateString()} — {new Date(r.week_end).toLocaleDateString()}
                  </span>
                  <Badge className={r.overall_score && r.overall_score >= 70 ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-700'}>
                    {r.overall_score || '—'}/100
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default WeeklyReport;
