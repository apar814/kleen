import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, TrendingUp } from 'lucide-react';

const CONTAMINANTS = [
  { name: 'Titanium Dioxide (E171)', type: 'Chemical', status: 'Banned EU, legal US', risk: 'Emerging', detail: 'Used in candy, gum, creamer, dressings. Gut damage, potential carcinogen.' },
  { name: 'Glyphosate', type: 'Pesticide', status: 'Legal worldwide (controversial)', risk: 'Probable', detail: '96% of oat cereals test positive. Used as pre-harvest desiccant. IARC 2A.' },
  { name: 'Ethylene Oxide', type: 'Chemical', status: 'Massive EU recalls', risk: 'Established', detail: 'Used for spice sterilization. Carcinogenic. Hundreds of EU recalls since 2020.' },
  { name: 'BPS/BPF', type: 'Chemical', status: 'Legal (BPA replacements)', risk: 'Emerging', detail: '"BPA-free" replacements may be equally harmful endocrine disruptors.' },
  { name: 'MOSH/MOAH', type: 'Chemical', status: 'EU limits proposed', risk: 'Emerging', detail: 'Mineral oils from recycled cardboard migrate into cereal, pasta, rice.' },
  { name: 'Cadmium in Chocolate', type: 'Heavy Metal', status: 'EU limits exist', risk: 'Established', detail: 'Consumer Reports found dangerous levels in major chocolate brands.' },
  { name: 'Thallium in Kale', type: 'Heavy Metal', status: 'Emerging concern', risk: 'Emerging', detail: 'Cruciferous vegetables absorb thallium from contaminated soil.' },
  { name: 'Silicon Dioxide Nanoparticles (E551)', type: 'Nanoparticle', status: 'Legal', risk: 'Emerging', detail: 'Used in spices, supplements, coffee. Nanoparticle form raises concerns.' },
  { name: 'Chlorate/Perchlorate', type: 'Chemical', status: 'EPA monitoring', risk: 'Established', detail: 'Water treatment → food chain. Thyroid disruptors, especially in children.' },
  { name: 'Melamine', type: 'Chemical', status: 'Banned in food', risk: 'Established', detail: 'Adulterant in imported foods/supplements. Caused 2008 Chinese milk scandal.' },
];

const ContaminantEncyclopedia = () => {
  const [search, setSearch] = React.useState('');
  const filtered = CONTAMINANTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><BookOpen className="h-8 w-8" /> Contaminant Encyclopedia & Emerging Research</h1>
          <p className="text-muted-foreground mt-1">Every contaminant explained — what it is, where it's found, and how to reduce exposure.</p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search contaminants..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>

        <div className="space-y-3">
          {filtered.map(c => (
            <Card key={c.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{c.name}</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline">{c.type}</Badge>
                    <Badge variant={c.risk === 'Established' ? 'destructive' : c.risk === 'Probable' ? 'secondary' : 'outline'}>
                      {c.risk === 'Established' ? '⬛' : c.risk === 'Probable' ? '🟫' : '🟨'} {c.risk}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Status: {c.status}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContaminantEncyclopedia;
