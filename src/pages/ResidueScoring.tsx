import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Syringe, Leaf, Fish, Tag } from 'lucide-react';

const LABEL_CLAIMS = [
  { claim: '"Natural"', meaning: 'Meaningless — no legal definition for most products.', trust: 'Low' },
  { claim: '"Hormone-Free" (Poultry)', meaning: 'Misleading — hormones are already illegal in poultry.', trust: 'Low' },
  { claim: '"Grass-Fed"', meaning: 'May have been grain-finished. Look for "Grass-Fed + Grass-Finished."', trust: 'Medium' },
  { claim: '"Free-Range"', meaning: 'Minimal requirement — access to outdoors (may be tiny door).', trust: 'Medium' },
  { claim: '"Pasture-Raised"', meaning: 'More meaningful — 108+ sq ft/bird outdoors.', trust: 'High' },
  { claim: '"No Antibiotics Ever"', meaning: 'USDA verified claim. Meaningful.', trust: 'High' },
  { claim: '"Antibiotic-Free"', meaning: 'Unregulated term. Not verified.', trust: 'Low' },
  { claim: '"Non-GMO"', meaning: 'No genetically modified ingredients. Verified by Non-GMO Project.', trust: 'High' },
];

const ResidueScoring = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Antibiotic, Hormone & Drug Residue Scoring</h1>
        <p className="text-muted-foreground mt-1">Pharmaceutical contamination — antibiotics, hormones, pesticides, and veterinary drugs.</p>
      </div>

      <Tabs defaultValue="labels" className="space-y-4">
        <TabsList>
          <TabsTrigger value="labels">Label Claims Decoder</TabsTrigger>
          <TabsTrigger value="antibiotics">Antibiotics</TabsTrigger>
          <TabsTrigger value="pesticides">Pesticides</TabsTrigger>
          <TabsTrigger value="seafood">Seafood Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="labels" className="space-y-4">
          {LABEL_CLAIMS.map(l => (
            <Card key={l.claim}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{l.claim}</h3>
                  <p className="text-sm text-muted-foreground">{l.meaning}</p>
                </div>
                <Badge variant={l.trust === 'High' ? 'default' : l.trust === 'Medium' ? 'secondary' : 'destructive'}>{l.trust} Trust</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="antibiotics">
          <Card><CardContent className="p-6"><p className="text-muted-foreground">AMR is WHO's #1 global health threat. High-risk categories: conventional poultry, pork, beef, farmed fish. Database scoring coming soon.</p></CardContent></Card>
        </TabsContent>
        <TabsContent value="pesticides">
          <Card><CardContent className="p-6"><p className="text-muted-foreground">EWG Dirty Dozen/Clean Fifteen integration, glyphosate in oats/wheat, and pesticide residue data — coming soon.</p></CardContent></Card>
        </TabsContent>
        <TabsContent value="seafood">
          <Card><CardContent className="p-6"><p className="text-muted-foreground">Farmed vs wild scoring, country-of-origin risk, FDA import alerts — coming soon.</p></CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  </DashboardLayout>
);

export default ResidueScoring;
