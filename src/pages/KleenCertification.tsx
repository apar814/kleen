import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Check } from 'lucide-react';

const TIERS = [
  { name: 'Bronze', emoji: '🥉', range: '70-79', color: 'bg-amber-700/10 border-amber-700/30', requirements: ['No critical flags', 'Label matches claims', 'Basic third-party testing', 'Brand participates in transparency'], price: '$500/yr' },
  { name: 'Silver', emoji: '🥈', range: '80-89', color: 'bg-gray-400/10 border-gray-400/30', requirements: ['All Bronze requirements', 'No processing contaminant concerns', 'Packaging score 70+', 'Tested for heavy metals & pesticides', 'Origin disclosed'], price: '$1,000/yr' },
  { name: 'Gold', emoji: '🥇', range: '90-100', color: 'bg-yellow-500/10 border-yellow-500/30', requirements: ['All Silver requirements', 'Lab-verified results', 'PFAS-free packaging', 'Microplastic mitigation', 'Full sourcing transparency', 'No fraud risk', 'Clean from emerging contaminants'], price: '$2,500/yr' },
  { name: 'Platinum', emoji: '💎', range: 'Invite Only', color: 'bg-blue-500/10 border-blue-500/30', requirements: ['All Gold requirements', 'Annual re-testing', 'Open-book manufacturing', 'Environmental sustainability', 'Worker welfare verified', 'Recyclable packaging'], price: '$5,000/yr' },
];

const KleenCertification = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><Award className="h-8 w-8" /> Kleen Safety Certification Program</h1>
        <p className="text-muted-foreground mt-1">"Kleen Certified" — the new industry standard for food safety transparency.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {TIERS.map(t => (
          <Card key={t.name} className={t.color}>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <span className="text-4xl">{t.emoji}</span>
                <h3 className="text-xl font-bold mt-2">{t.name}</h3>
                <Badge variant="outline" className="mt-1">Score: {t.range}</Badge>
                <p className="text-sm font-semibold mt-2 text-primary">{t.price} per product</p>
              </div>
              <ul className="space-y-2">
                {t.requirements.map(r => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Brand Applications</h3>
          <p className="text-sm text-muted-foreground">Brands can apply for Kleen Certification through the brand portal. Applications undergo testing review, with 10% random audits annually.</p>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default KleenCertification;
