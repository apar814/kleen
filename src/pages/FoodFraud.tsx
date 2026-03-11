import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, AlertTriangle } from 'lucide-react';

const FRAUD_CATEGORIES = [
  { name: 'Olive Oil', rate: '80%', detail: 'Up to 80% of "Italian" EVOO in US is fraudulent. Cut with cheap oils, false origin.', tip: 'Look for COOC/NAOOA certified, harvest date, estate name, dark glass. Avoid <$8/500ml.' },
  { name: 'Honey', rate: '76%', detail: '~76% ultra-filtered (untraceable). Diluted with corn/rice syrup.', tip: 'Buy True Source Certified or local producers. Pollen should be present.' },
  { name: 'Saffron', rate: '50%+', detail: 'Cut with turmeric, safflower, or dyed corn silk.', tip: 'Buy from reputable sources. Real saffron should not stain yellow immediately.' },
  { name: 'Seafood', rate: '33%', detail: '1 in 3 mislabeled (Oceana). Escolar sold as "white tuna."', tip: 'Buy from trusted fishmongers. Verify species with apps.' },
  { name: 'Oregano', rate: '25%', detail: '25% of oregano tested was not oregano — cut with olive leaves.', tip: 'Buy whole-leaf oregano from Mediterranean sources.' },
  { name: 'Parmesan', rate: 'Common', detail: '"100% Parmesan" with 2-8% cellulose (wood pulp).', tip: 'Real = Parmigiano-Reggiano DOP with consortium stamp.' },
  { name: 'Supplements', rate: 'Widespread', detail: 'Less active ingredient than labeled, spiked with pharma drugs.', tip: 'Look for USP, NSF, or ConsumerLab verified.' },
  { name: 'Organic Grains', rate: 'Growing', detail: 'Imported "organic" grains sometimes never actually organic.', tip: 'Buy domestic organic when possible. Check certifier.' },
];

const FoodFraud = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><Search className="h-8 w-8" /> Food Fraud & Adulteration Detection</h1>
        <p className="text-muted-foreground mt-1">"Is It Real?" — Score products for counterfeit, diluted, or mislabeled fraud risk.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {FRAUD_CATEGORIES.map(f => (
          <Card key={f.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{f.name}</h3>
                <Badge variant="destructive">{f.rate} fraud rate</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{f.detail}</p>
              <Card className="mt-2 bg-green-500/5 border-green-500/20">
                <CardContent className="p-2 text-xs">✅ {f.tip}</CardContent>
              </Card>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default FoodFraud;
