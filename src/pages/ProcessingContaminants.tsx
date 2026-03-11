import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame } from 'lucide-react';

const CONTAMINANTS = [
  { name: 'Acrylamide', iarc: '2A', source: 'Starchy foods >248°F', foods: 'Fries, chips, toast, crackers, cereals, coffee, roasted nuts', tip: 'Boil > roast < 356°F > frying. Golden, not brown.' },
  { name: '3-MCPD & Glycidyl Esters', iarc: '2A', source: 'Vegetable oil refining (esp. palm oil)', foods: 'Oils, margarine, infant formula, bread, fried foods', tip: 'Choose cold-pressed oils. Avoid refined palm oil.' },
  { name: 'PAHs', iarc: '1/2A', source: 'Smoking, grilling, charring', foods: 'Smoked meats/fish, barbecue, smoked tea/cheese', tip: 'Reduce charring. Use marinades (90% HCA reduction).' },
  { name: 'HCAs', iarc: '2A/2B', source: 'High-temp meat cooking', foods: 'Well-done/charred meat', tip: 'Marinate first. Cook lower temp. Avoid char.' },
  { name: 'AGEs', iarc: 'N/A', source: 'High-heat protein+sugar reaction', foods: 'Grilled meat, processed cheese, butter, roasted nuts', tip: 'Cook with moisture (stewing, steaming). Avoid dry high heat.' },
  { name: 'Furans', iarc: '2B', source: 'Thermal processing (canning)', foods: 'Canned foods, jarred baby food, coffee', tip: 'Choose fresh/frozen over canned. Open and stir before heating.' },
  { name: 'Nitrosamines', iarc: '1/2A', source: 'Nitrites + amines during cooking', foods: 'Bacon, hot dogs, deli meats, smoked fish', tip: 'Choose uncured/no-nitrate options. Add vitamin C.' },
  { name: 'Trans Fats', iarc: 'N/A', source: 'Partial hydrogenation', foods: 'If "partially hydrogenated" in ingredients = present', tip: 'Check ingredients, not just label. <0.5g can say "0g."' },
];

const ProcessingContaminants = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><Flame className="h-8 w-8" /> Processing Contaminants & Cooking Byproducts</h1>
        <p className="text-muted-foreground mt-1">Harmful compounds created during manufacturing and cooking — not on any label.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {CONTAMINANTS.map(c => (
          <Card key={c.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold">{c.name}</h3>
                <Badge variant="outline">IARC {c.iarc}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Source: {c.source}</p>
              <p className="text-xs text-muted-foreground mt-1">Found in: {c.foods}</p>
              <Card className="mt-2 bg-primary/5 border-primary/20">
                <CardContent className="p-2 text-xs">💡 {c.tip}</CardContent>
              </Card>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default ProcessingContaminants;
