import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { AlertTriangle, Droplets, Package, Thermometer, Shield, Info, TrendingDown } from 'lucide-react';

const riskColor = (score: number) => {
  if (score <= 25) return 'text-green-500';
  if (score <= 50) return 'text-yellow-500';
  if (score <= 75) return 'text-orange-500';
  return 'text-red-500';
};

const riskBg = (score: number) => {
  if (score <= 25) return 'bg-green-500/10';
  if (score <= 50) return 'bg-yellow-500/10';
  if (score <= 75) return 'bg-orange-500/10';
  return 'bg-red-500/10';
};

const riskLabel = (score: number) => {
  if (score <= 25) return '🟢 Low';
  if (score <= 50) return '🟡 Moderate';
  if (score <= 75) return '🟠 High';
  return '🔴 Critical';
};

const CATEGORY_RISKS = [
  { name: 'Bottled Water', risk: 88, detail: '93% contain microplastics (WHO). ~240K nanoplastic particles/L (Columbia 2024).' },
  { name: 'Sea Salt', risk: 82, detail: 'Up to 1,674 particles/kg detected across studies.' },
  { name: 'Shellfish', risk: 79, detail: 'Filter feeders accumulate particles from ocean pollution.' },
  { name: 'Nylon Tea Bags', risk: 92, detail: '11.6 billion microplastic particles released per bag at brew temp.' },
  { name: 'Honey', risk: 58, detail: 'Bees collect particles from environment; processed through plastic equipment.' },
  { name: 'Canned Goods', risk: 55, detail: 'Plastic can linings leach BPA and microplastics over time.' },
  { name: 'Infant Formula', risk: 65, detail: 'Plastic bottles release millions of particles when heated.' },
  { name: 'Beer & Wine', risk: 52, detail: 'Filtration and plastic-lined equipment introduce particles.' },
];

const PACKAGING_RISKS = [
  { type: 'PET Bottles', score: 85, icon: '🧴', detail: 'Leach 10-100x more than glass. Worse with heat/sunlight.' },
  { type: 'Plastic Pouches', score: 78, icon: '📦', detail: 'High surface area contact with food.' },
  { type: 'Plastic-Lined Cans', score: 55, icon: '🥫', detail: 'BPA/BPS linings migrate into food.' },
  { type: 'Tetra Pak', score: 45, icon: '🧃', detail: 'Polyethylene layer contacts food.' },
  { type: 'Glass', score: 12, icon: '🫙', detail: 'Minimal microplastic risk. Best option.' },
  { type: 'Unlined Metal', score: 15, icon: '🥡', detail: 'Very low microplastic risk.' },
  { type: 'Paper/Cardboard', score: 8, icon: '📄', detail: 'Lowest risk unless PFAS-coated.' },
];

const MicroplasticsScoring = () => {
  const [plasticBottles, setPlasticBottles] = useState([5]);
  const [cannedGoods, setCannedGoods] = useState([3]);
  const [microwavePlastic, setMicrowavePlastic] = useState([2]);
  const [seafood, setSeafood] = useState([2]);
  const [teaBagType, setTeaBagType] = useState<'nylon' | 'paper' | 'loose'>('paper');

  const calculateExposure = () => {
    const bottleParticles = plasticBottles[0] * 240000;
    const cannedParticles = cannedGoods[0] * 15000;
    const microwaveParticles = microwavePlastic[0] * 4220000;
    const seafoodParticles = seafood[0] * 50000;
    const teaParticles = teaBagType === 'nylon' ? 11600000000 / 7 : teaBagType === 'paper' ? 100000 : 0;
    return { bottleParticles, cannedParticles, microwaveParticles, seafoodParticles, teaParticles, total: bottleParticles + cannedParticles + microwaveParticles + seafoodParticles + teaParticles };
  };

  const exposure = calculateExposure();

  const formatNumber = (n: number) => {
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
    if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
    return n.toString();
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-foreground">Microplastics & Nanoplastics Intelligence</h1>
          <p className="text-muted-foreground mt-1">
            Quantifying the invisible crisis — microplastic contamination risk for every product.
          </p>
        </motion.div>

        <Tabs defaultValue="calculator" className="space-y-4">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="calculator">Exposure Calculator</TabsTrigger>
            <TabsTrigger value="categories">Category Risk</TabsTrigger>
            <TabsTrigger value="packaging">Packaging</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Droplets className="h-5 w-5 text-blue-500" /> Weekly Exposure Calculator</CardTitle>
                <CardDescription>Estimate your weekly microplastic particle intake based on habits.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Plastic water bottles per week: {plasticBottles[0]}</label>
                      <Slider value={plasticBottles} onValueChange={setPlasticBottles} min={0} max={20} step={1} className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Canned goods per week: {cannedGoods[0]}</label>
                      <Slider value={cannedGoods} onValueChange={setCannedGoods} min={0} max={15} step={1} className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Microwave-in-plastic per week: {microwavePlastic[0]}</label>
                      <Slider value={microwavePlastic} onValueChange={setMicrowavePlastic} min={0} max={14} step={1} className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Seafood meals per week: {seafood[0]}</label>
                      <Slider value={seafood} onValueChange={setSeafood} min={0} max={7} step={1} className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Tea bag type</label>
                      <div className="flex gap-2 mt-2">
                        {(['nylon', 'paper', 'loose'] as const).map(t => (
                          <Button key={t} size="sm" variant={teaBagType === t ? 'default' : 'outline'} onClick={() => setTeaBagType(t)} className="capitalize">{t}</Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Card className={`${riskBg(Math.min(100, exposure.total / 1e8))}`}>
                    <CardContent className="p-6 text-center space-y-4">
                      <h3 className="text-lg font-semibold">Estimated Weekly Intake</h3>
                      <div className={`text-4xl font-bold ${riskColor(Math.min(100, exposure.total / 1e8))}`}>
                        {formatNumber(exposure.total)}
                      </div>
                      <p className="text-sm text-muted-foreground">microplastic particles</p>
                      <div className="text-left space-y-2 text-sm">
                        <div className="flex justify-between"><span>Water bottles</span><span>{formatNumber(exposure.bottleParticles)}</span></div>
                        <div className="flex justify-between"><span>Canned goods</span><span>{formatNumber(exposure.cannedParticles)}</span></div>
                        <div className="flex justify-between"><span>Microwave plastic</span><span>{formatNumber(exposure.microwaveParticles)}</span></div>
                        <div className="flex justify-between"><span>Seafood</span><span>{formatNumber(exposure.seafoodParticles)}</span></div>
                        <div className="flex justify-between"><span>Tea bags</span><span>{formatNumber(exposure.teaParticles)}</span></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2"><TrendingDown className="h-4 w-4" /> Quick Reduction Tips</h4>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>• Switch to glass/stainless water bottles → eliminates largest source</li>
                      <li>• Never microwave in plastic — transfer to glass/ceramic first</li>
                      <li>• Use loose leaf tea or paper tea bags instead of nylon</li>
                      <li>• Choose glass-packaged products when available</li>
                      <li>• Let hot foods cool before placing in plastic containers</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {CATEGORY_RISKS.map(cat => (
                <motion.div key={cat.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{cat.name}</h3>
                        <Badge className={riskBg(cat.risk)} variant="outline">
                          <span className={riskColor(cat.risk)}>{riskLabel(cat.risk)}</span>
                        </Badge>
                      </div>
                      <Progress value={cat.risk} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">{cat.detail}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packaging" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PACKAGING_RISKS.map(pkg => (
                <Card key={pkg.type}>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{pkg.icon}</div>
                    <h3 className="font-semibold">{pkg.type}</h3>
                    <div className={`text-2xl font-bold mt-1 ${riskColor(pkg.score)}`}>{pkg.score}/100</div>
                    <Progress value={pkg.score} className="h-2 mt-2 mb-2" />
                    <p className="text-xs text-muted-foreground">{pkg.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Research Findings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Nanoplastics in Bottled Water', journal: 'PNAS, 2024', finding: '~240,000 nanoplastic particles per liter detected using stimulated Raman scattering microscopy. 90% were nanoplastics (<1μm) that can cross cell membranes and the blood-brain barrier.' },
                  { title: 'Nylon Tea Bag Microplastic Release', journal: 'Environmental Science & Technology, 2019', finding: 'A single nylon tea bag releases approximately 11.6 billion microplastics and 3.1 billion nanoplastics at brewing temperature (95°C).' },
                  { title: 'Microplastics in Sea Salt', journal: 'Environmental Science & Technology, 2017', finding: 'Sea salts from various countries contained up to 1,674 microplastic particles per kilogram, with sea salt consistently containing more than rock or lake salt.' },
                  { title: 'Microwave Plastic Containers', journal: 'Environmental Science & Technology, 2023', finding: 'Microwaving plastic food containers releases up to 4.22 million microplastic particles per square centimeter at 100°C.' },
                  { title: 'Microplastics in Human Blood', journal: 'Environment International, 2022', finding: 'First study detecting microplastics in human blood. PET, polystyrene, and polyethylene found in 77% of tested individuals.' },
                ].map(study => (
                  <Card key={study.title} className="bg-muted/50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{study.title}</h4>
                      <Badge variant="outline" className="text-xs mt-1">{study.journal}</Badge>
                      <p className="text-sm text-muted-foreground mt-2">{study.finding}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MicroplasticsScoring;
