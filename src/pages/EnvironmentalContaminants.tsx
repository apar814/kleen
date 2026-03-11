import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radiation, Globe } from 'lucide-react';

const HEAVY_METALS = [
  { metal: 'Lead', sources: 'Chocolate, cinnamon, juice, baby food, protein powders, bone broth', note: 'Children absorb 4-5x more lead than adults. No safe level.' },
  { metal: 'Arsenic', sources: 'Rice products, apple juice, wine', note: 'Southern US rice has higher arsenic (historical pesticide use). California rice is lower.' },
  { metal: 'Cadmium', sources: 'Chocolate, spinach, peanuts, sunflower seeds', note: 'Dangerous levels found in major chocolate brands (Consumer Reports).' },
  { metal: 'Mercury', sources: 'Large predatory fish (tuna, swordfish, shark)', note: 'Pregnancy limits: <6oz albacore/week. Choose sardines, anchovies, wild salmon instead.' },
];

const EMERGING = [
  { name: 'Dioxins/PCBs', source: 'Animal fats, farmed salmon', status: 'Established' },
  { name: 'Perchlorate', source: 'Water, produce', status: 'Established' },
  { name: 'Pharmaceutical traces', source: 'Water supply', status: 'Emerging' },
  { name: 'Tire dust (6PPD-quinone)', source: 'Seafood near roadways', status: 'Emerging' },
  { name: 'Microplastics in soil', source: 'Sewage sludge fertilizer', status: 'Emerging' },
];

const EnvironmentalContaminants = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><Radiation className="h-8 w-8" /> Radiation & Environmental Contaminants</h1>
        <p className="text-muted-foreground mt-1">Track environmental contamination — heavy metals, radiation, industrial pollutants.</p>
      </div>

      <Tabs defaultValue="metals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metals">Heavy Metals</TabsTrigger>
          <TabsTrigger value="emerging">Emerging Threats</TabsTrigger>
          <TabsTrigger value="sourcing">Clean Sourcing</TabsTrigger>
        </TabsList>

        <TabsContent value="metals" className="space-y-4">
          {HEAVY_METALS.map(m => (
            <Card key={m.metal}>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{m.metal}</h3>
                <p className="text-sm text-muted-foreground mt-1">Sources: {m.sources}</p>
                <p className="text-sm mt-2 text-orange-600 dark:text-orange-400">⚠️ {m.note}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="emerging" className="space-y-4">
          {EMERGING.map(e => (
            <Card key={e.name}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{e.name}</h3>
                  <p className="text-sm text-muted-foreground">{e.source}</p>
                </div>
                <Badge variant={e.status === 'Established' ? 'default' : 'secondary'}>{e.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="sourcing">
          <Card><CardContent className="p-6"><p className="text-muted-foreground">Regional contamination mapping and clean sourcing recommendations — coming soon.</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
);

export default EnvironmentalContaminants;
