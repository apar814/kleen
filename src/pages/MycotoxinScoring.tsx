import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bug } from 'lucide-react';

const MYCOTOXINS = [
  { name: 'Aflatoxins', group: 'Group 1 Carcinogen', foods: 'Peanuts, corn, tree nuts, spices', risk: 'Critical', detail: 'Most potent natural carcinogen. Liver cancer risk. Organic does NOT mean lower aflatoxin.' },
  { name: 'Ochratoxin A (OTA)', group: 'Group 2B', foods: 'Coffee, wine, dried fruits, cocoa', risk: 'High', detail: 'Nephrotoxic. Instant/cheap coffee blends have highest levels.' },
  { name: 'Deoxynivalenol (DON)', group: 'Immune suppressant', foods: 'Wheat, barley, corn', risk: 'High', detail: 'Also called "vomitoxin." Suppresses immune function.' },
  { name: 'Zearalenone', group: 'Endocrine disruptor', foods: 'Corn, wheat', risk: 'High', detail: 'Mimics estrogen. Linked to reproductive issues.' },
  { name: 'Fumonisins', group: 'Group 2B', foods: 'Corn products', risk: 'High', detail: 'Associated with neural tube defects and esophageal cancer.' },
  { name: 'Patulin', group: 'GI toxin', foods: 'Apple products', risk: 'Moderate', detail: 'Found in apple juice, cider, applesauce. GI damage.' },
  { name: 'Ergot Alkaloids', group: 'Neurotoxin', foods: 'Rye, wheat', risk: 'Moderate', detail: 'Can cause ergotism. Historically caused mass poisonings.' },
  { name: 'Citrinin', group: 'Nephrotoxin', foods: 'Rice, red yeast rice supplements', risk: 'Moderate', detail: 'Kidney damage. Often co-occurs with OTA.' },
];

const MycotoxinScoring = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><Bug className="h-8 w-8" /> Mycotoxin & Mold Contamination</h1>
        <p className="text-muted-foreground mt-1">Invisible mold-derived toxins in grains, nuts, coffee, and spices.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {MYCOTOXINS.map(m => (
          <Card key={m.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{m.name}</h3>
                <Badge variant={m.risk === 'Critical' ? 'destructive' : m.risk === 'High' ? 'destructive' : 'secondary'}>{m.risk}</Badge>
              </div>
              <Badge variant="outline" className="text-xs">{m.group}</Badge>
              <p className="text-xs text-muted-foreground mt-2">Found in: {m.foods}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default MycotoxinScoring;
