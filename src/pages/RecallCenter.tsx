import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Newspaper, MapPin, Shield } from 'lucide-react';

const MOCK_RECALLS = [
  { product: 'Organic Baby Spinach', brand: 'Fresh Farms', reason: 'Listeria monocytogenes contamination', severity: 'Class I', date: '2026-03-05', states: 'Nationwide' },
  { product: 'Peanut Butter Cups', brand: 'ChocoCo', reason: 'Undeclared milk allergen', severity: 'Class I', date: '2026-03-03', states: 'CA, OR, WA, NV' },
  { product: 'Ground Turkey', brand: 'MeatPack', reason: 'Salmonella contamination', severity: 'Class I', date: '2026-02-28', states: 'TX, OK, AR, LA' },
  { product: 'Frozen Berries Mix', brand: 'BerryBest', reason: 'Hepatitis A risk', severity: 'Class I', date: '2026-02-25', states: 'Nationwide' },
];

const MOCK_OUTBREAKS = [
  { pathogen: 'E. coli O157:H7', source: 'Romaine lettuce', cases: 45, states: 12, status: 'Active' },
  { pathogen: 'Salmonella', source: 'Backyard poultry contact', cases: 120, states: 28, status: 'Active' },
  { pathogen: 'Listeria', source: 'Deli meats', cases: 18, states: 6, status: 'Investigation' },
];

const RecallCenter = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><AlertTriangle className="h-8 w-8" /> Food Safety News & Recall Center</h1>
        <p className="text-muted-foreground mt-1">Real-time food safety monitoring — the "Bloomberg Terminal for food safety."</p>
      </div>

      <Tabs defaultValue="recalls" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recalls">Active Recalls</TabsTrigger>
          <TabsTrigger value="outbreaks">Outbreak Tracker</TabsTrigger>
          <TabsTrigger value="news">Safety News</TabsTrigger>
          <TabsTrigger value="brands">Brand Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="recalls" className="space-y-4">
          {MOCK_RECALLS.map(r => (
            <Card key={r.product} className="border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{r.brand} — {r.product}</h3>
                  <Badge variant="destructive">{r.severity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{r.reason}</p>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>📅 {r.date}</span>
                  <span>📍 {r.states}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="outbreaks" className="space-y-4">
          {MOCK_OUTBREAKS.map(o => (
            <Card key={o.pathogen + o.source}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{o.pathogen}</h3>
                  <Badge variant={o.status === 'Active' ? 'destructive' : 'secondary'}>{o.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Source: {o.source}</p>
                <div className="flex gap-4 mt-2 text-xs">
                  <span>{o.cases} cases</span>
                  <span>{o.states} states affected</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="news">
          <Card><CardContent className="p-6"><p className="text-muted-foreground">AI-curated food safety news aggregated from FDA, USDA, CDC — coming soon.</p></CardContent></Card>
        </TabsContent>
        <TabsContent value="brands">
          <Card><CardContent className="p-6"><p className="text-muted-foreground">Brand Safety Report Cards with A-F grades — coming soon.</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
);

export default RecallCenter;
