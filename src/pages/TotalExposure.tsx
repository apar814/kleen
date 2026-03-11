import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Brain, Heart, Shield } from 'lucide-react';

const EXPOSURE_CATEGORIES = [
  { name: 'Microplastics', score: 62, icon: '🧴', color: 'text-orange-500' },
  { name: 'PFAS', score: 45, icon: '🧪', color: 'text-yellow-500' },
  { name: 'Heavy Metals', score: 38, icon: '⚗️', color: 'text-yellow-500' },
  { name: 'Mycotoxins', score: 28, icon: '🍄', color: 'text-green-500' },
  { name: 'Processing Contaminants', score: 55, icon: '🔥', color: 'text-orange-500' },
  { name: 'Packaging Migration', score: 42, icon: '📦', color: 'text-yellow-500' },
  { name: 'Pesticides', score: 35, icon: '🌿', color: 'text-yellow-500' },
  { name: 'Drug Residues', score: 20, icon: '💊', color: 'text-green-500' },
  { name: 'Endocrine Disruptors', score: 48, icon: '⚡', color: 'text-yellow-500' },
];

const BODY_MAP = [
  { organ: '🧠 Brain', contaminants: 'Mercury, nanoplastics, lead', risk: 'High' },
  { organ: '🦋 Thyroid', contaminants: 'Perchlorate, PFAS, BPA', risk: 'High' },
  { organ: '🫁 Liver', contaminants: 'Mycotoxins, AGEs, alcohol', risk: 'Moderate' },
  { organ: '🫘 Kidneys', contaminants: 'Cadmium, OTA, PFAS', risk: 'Moderate' },
  { organ: '🦴 Bones', contaminants: 'Lead (stored for decades)', risk: 'Moderate' },
  { organ: '🧬 Reproductive', contaminants: 'Phthalates, BPA, xenoestrogens', risk: 'High' },
  { organ: '🔬 Fat Tissue', contaminants: 'Dioxins, PCBs, PFAS (bioaccumulate)', risk: 'High' },
  { organ: '🦠 Gut', contaminants: 'Microplastics, emulsifiers', risk: 'Moderate' },
];

const REDUCTION_ACTIONS = [
  { action: 'Switch to glass water bottles', reduction: 38, target: 'Microplastics' },
  { action: 'Replace non-stick with stainless steel', reduction: 25, target: 'PFAS' },
  { action: 'Go organic on top 5 produce', reduction: 67, target: 'Pesticides' },
  { action: 'Stop microwaving in plastic', reduction: 45, target: 'Microplastics' },
  { action: 'Choose wild-caught over farmed fish', reduction: 30, target: 'Drug Residues' },
];

const TotalExposure = () => (
  <DashboardLayout>
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2"><Activity className="h-8 w-8" /> Total Exposure Dashboard</h1>
        <p className="text-muted-foreground mt-1">Unified contaminant risk assessment across all categories.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {EXPOSURE_CATEGORIES.map(c => (
          <Card key={c.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{c.icon}</span>
                <span className={`text-lg font-bold ${c.color}`}>{c.score}</span>
              </div>
              <h3 className="font-medium text-sm">{c.name}</h3>
              <Progress value={c.score} className="h-2 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Body Contaminant Map</CardTitle>
          <CardDescription>Where contaminants accumulate in your body.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {BODY_MAP.map(b => (
              <div key={b.organ} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <h4 className="font-medium">{b.organ}</h4>
                  <p className="text-xs text-muted-foreground">{b.contaminants}</p>
                </div>
                <Badge variant={b.risk === 'High' ? 'destructive' : 'secondary'}>{b.risk}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Reduction Roadmap</CardTitle>
          <CardDescription>Prioritized actions for the biggest impact.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {REDUCTION_ACTIONS.map((a, i) => (
            <div key={a.action} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
              <span className="text-lg font-bold text-primary">#{i + 1}</span>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{a.action}</h4>
                <p className="text-xs text-muted-foreground">Target: {a.target}</p>
              </div>
              <Badge variant="default">-{a.reduction}%</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default TotalExposure;
