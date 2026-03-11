import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Droplets, MapPin, Factory } from 'lucide-react';

const COOKWARE_DATA = [
  { material: 'Teflon (PTFE)', risk: 'High', temp: '>500°F releases toxic fumes', icon: '⚠️', alternatives: ['Stainless Steel', 'Cast Iron'] },
  { material: 'Ceramic (PFAS-free)', risk: 'Low', temp: 'Safe to 800°F', icon: '✅', alternatives: ['Caraway', 'GreenPan'] },
  { material: 'Stainless Steel', risk: 'None', temp: 'Safe at all cooking temps', icon: '✅', alternatives: [] },
  { material: 'Cast Iron', risk: 'None', temp: 'Safe at all cooking temps', icon: '✅', alternatives: [] },
  { material: 'Carbon Steel', risk: 'None', temp: 'Safe at all cooking temps', icon: '✅', alternatives: [] },
  { material: 'Glass', risk: 'None', temp: 'Safe at all cooking temps', icon: '✅', alternatives: [] },
];

const PACKAGING_SOURCES = [
  { source: 'Fast Food Wrappers', risk: 'High', detail: 'Many chains use PFAS-treated grease-proof wrappers' },
  { source: 'Microwave Popcorn Bags', risk: 'High', detail: 'PFAS coating prevents grease from soaking through' },
  { source: 'Pizza Boxes', risk: 'Moderate', detail: 'Grease-resistant coatings may contain PFAS' },
  { source: 'Paper Plates', risk: 'Moderate', detail: 'Water/grease-resistant coatings often PFAS-based' },
  { source: 'Takeout Containers', risk: 'High', detail: 'Molded fiber bowls frequently contain PFAS' },
];

const PFASScoring = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">PFAS "Forever Chemicals" Intelligence</h1>
          <p className="text-muted-foreground mt-1">Track and reduce your exposure to per- and polyfluoroalkyl substances that never break down.</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="cookware">Cookware</TabsTrigger>
            <TabsTrigger value="packaging">Packaging</TabsTrigger>
            <TabsTrigger value="map">Contamination Map</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-red-500/5 border-red-500/20">
                <CardContent className="p-4 text-center">
                  <Droplets className="h-8 w-8 mx-auto text-red-500 mb-2" />
                  <h3 className="font-semibold">Water</h3>
                  <p className="text-xs text-muted-foreground mt-1">EPA advisory: 4 ppt. Many utilities exceed this level.</p>
                </CardContent>
              </Card>
              <Card className="bg-orange-500/5 border-orange-500/20">
                <CardContent className="p-4 text-center">
                  <Factory className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                  <h3 className="font-semibold">Packaging</h3>
                  <p className="text-xs text-muted-foreground mt-1">PFAS in food wrappers, popcorn bags, and takeout containers.</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-500/5 border-yellow-500/20">
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
                  <h3 className="font-semibold">Cookware</h3>
                  <p className="text-xs text-muted-foreground mt-1">Non-stick coatings release PFAS at high temperatures.</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">What are PFAS?</h3>
                <p className="text-sm text-muted-foreground">PFAS (per- and polyfluoroalkyl substances) are a group of ~12,000 synthetic chemicals used since the 1940s. They're called "forever chemicals" because they don't break down in the environment or the human body. They accumulate over time and are linked to cancer, thyroid disease, immune suppression, reproductive issues, and liver damage. PFAS are found in drinking water, food packaging, cookware, and even rainfall worldwide.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>PFAS in Your Water</CardTitle>
                <CardDescription>Enter your zip code to check local PFAS levels (coming soon — data being populated).</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">This feature will cross-reference the pfas_water_data table with your location to show PFAS levels in your tap water and recommend effective filters (carbon block + reverse osmosis).</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cookware" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {COOKWARE_DATA.map(c => (
                <Card key={c.material}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{c.icon} {c.material}</h3>
                      <Badge variant={c.risk === 'None' ? 'default' : c.risk === 'Low' ? 'secondary' : 'destructive'}>{c.risk} Risk</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{c.temp}</p>
                    {c.alternatives.length > 0 && <p className="text-xs mt-1">Recommended brands: {c.alternatives.join(', ')}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="packaging" className="space-y-4">
            {PACKAGING_SOURCES.map(p => (
              <Card key={p.source}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{p.source}</h3>
                    <p className="text-sm text-muted-foreground">{p.detail}</p>
                  </div>
                  <Badge variant={p.risk === 'High' ? 'destructive' : 'secondary'}>{p.risk}</Badge>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> PFAS Contamination Map</CardTitle>
                <CardDescription>Interactive map of contamination hotspots — coming soon.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Map visualization will display military bases, industrial sites, and water utilities with known PFAS contamination.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PFASScoring;
