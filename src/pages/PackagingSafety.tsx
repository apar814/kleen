import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, AlertTriangle, Shield } from 'lucide-react';

const CHEMICALS = [
  { name: 'BPA/BPS/BPF', found: 'Can linings, plastics, receipts', risk: 'Endocrine disruptors linked to cancer, infertility, obesity', level: 'High' },
  { name: 'Phthalates', found: 'PVC wraps, soft plastics, caps', risk: 'Endocrine disruptors, reproductive harm', level: 'High' },
  { name: 'Styrene', found: 'Polystyrene #6 cups/containers', risk: 'Probable carcinogen (IARC 2A)', level: 'High' },
  { name: 'Antimony', found: 'PET bottles', risk: 'Increases with heat and storage time', level: 'Moderate' },
  { name: 'Formaldehyde', found: 'Melamine dishware', risk: 'Carcinogen at high exposure', level: 'Moderate' },
  { name: 'MOSH/MOAH', found: 'Recycled cardboard → dry foods', risk: 'MOAH is potentially carcinogenic', level: 'High' },
  { name: 'Photoinitiators', found: 'UV-cured inks on packaging', risk: 'Endocrine disruption concerns', level: 'Moderate' },
  { name: 'Lead', found: 'Some ceramics, crystal glassware', risk: 'Neurotoxin, no safe level', level: 'High' },
];

const COOKWARE_GUIDE = [
  { material: 'Teflon/PTFE', score: 35, emoji: '⚠️', note: 'Releases toxic fumes >500°F. PFAS concerns.' },
  { material: 'Ceramic-coated', score: 70, emoji: '🟡', note: 'PFAS-free but coating degrades over time.' },
  { material: 'Stainless Steel', score: 92, emoji: '✅', note: 'Inert, durable. Small nickel leaching possible.' },
  { material: 'Cast Iron', score: 90, emoji: '✅', note: 'Adds dietary iron. Season properly.' },
  { material: 'Glass', score: 95, emoji: '✅', note: 'Completely inert. Best for storage and baking.' },
  { material: 'Copper', score: 60, emoji: '🟡', note: 'Must be lined. Unlined copper is toxic.' },
  { material: 'Aluminum', score: 40, emoji: '⚠️', note: 'Reacts with acidic foods. Anodized is safer.' },
  { material: 'Silicone', score: 65, emoji: '🟡', note: 'Generally safe but quality varies. Avoid cheap.' },
];

const PackagingSafety = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Packaging Migration & Container Safety</h1>
          <p className="text-muted-foreground mt-1">What migrates from containers into your food — chemicals you can't see on any label.</p>
        </div>

        <Tabs defaultValue="chemicals" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chemicals">Chemicals Tracked</TabsTrigger>
            <TabsTrigger value="cookware">Cookware Guide</TabsTrigger>
            <TabsTrigger value="storage">Storage Scanner</TabsTrigger>
          </TabsList>

          <TabsContent value="chemicals" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {CHEMICALS.map(c => (
                <Card key={c.name}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{c.name}</h3>
                      <Badge variant={c.level === 'High' ? 'destructive' : 'secondary'}>{c.level}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Found in: {c.found}</p>
                    <p className="text-xs text-muted-foreground mt-1">{c.risk}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cookware" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {COOKWARE_GUIDE.map(c => (
                <Card key={c.material}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <span className="text-3xl">{c.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{c.material}</h3>
                        <span className="text-lg font-bold">{c.score}/100</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{c.note}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Storage Container Scanner</CardTitle>
                <CardDescription>Scan food containers to get a safety score — coming soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">This feature will let you scan resin codes and identify container materials to assess BPA, phthalate, and microplastic leaching risk.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PackagingSafety;
