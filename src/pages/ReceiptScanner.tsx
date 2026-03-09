import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import {
  Upload, Camera, Loader2, FileText, ShoppingCart, AlertTriangle,
  Shield, TrendingUp, Share2
} from 'lucide-react';

interface ReceiptProduct {
  name: string;
  price: string | null;
  kleenScore: number;
  scoreBand: string;
  concern: string | null;
}

interface ReceiptResult {
  storeName: string | null;
  date: string | null;
  totalSpent: string | null;
  products: ReceiptProduct[];
  overallScore: number;
  overallBand: string;
  summary: string;
  topConcerns: string[];
  topPositives: string[];
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-primary';
  if (score >= 40) return 'text-yellow-600';
  return 'text-destructive';
};

const getBandColor = (band: string) => {
  switch (band) {
    case 'Excellent': return 'bg-emerald-100 text-emerald-800';
    case 'Good': return 'bg-primary/10 text-primary';
    case 'Mixed': return 'bg-yellow-100 text-yellow-800';
    case 'Weak': return 'bg-orange-100 text-orange-800';
    case 'Avoid': return 'bg-destructive/10 text-destructive';
    default: return 'bg-muted text-muted-foreground';
  }
};

const ReceiptScanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReceiptResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload an image of your receipt.', variant: 'destructive' });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload an image under 10MB.', variant: 'destructive' });
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    setLoading(true);
    setResult(null);

    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke('receipt-scan', {
        body: { imageBase64: base64 },
      });

      if (error) throw error;
      if (data?.error) {
        toast({ title: 'Analysis failed', description: data.error, variant: 'destructive' });
      } else if (data?.data) {
        setResult(data.data);
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Failed to analyze receipt', variant: 'destructive' });
    }
    setLoading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <DashboardLayout title="Receipt Scanner" description="Upload a grocery receipt for an instant health report card">
      {/* Upload Area */}
      {!result && !loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card
            className="border-dashed border-2 border-border hover:border-primary/50 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-h3 text-foreground mb-2">Drop your receipt here</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Upload a photo of your grocery receipt and our AI will analyze every item for harmful ingredients
              </p>
              <div className="flex gap-3">
                <Button className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-glow">
                  <Upload className="h-4 w-4 mr-2" /> Upload Photo
                </Button>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" /> Take Photo
                </Button>
              </div>
              <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Loading */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
          {previewUrl && (
            <img src={previewUrl} alt="Receipt" className="w-48 h-64 object-cover rounded-xl mx-auto mb-6 shadow-card opacity-50" />
          )}
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <h3 className="font-heading text-h3 text-foreground mb-2">Analyzing your receipt...</h3>
          <p className="text-muted-foreground">Identifying products and checking ingredients</p>
        </motion.div>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Report Card Header */}
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-glow p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-heading text-h2">Receipt Report Card</h2>
                    <p className="opacity-80 text-sm mt-1">
                      {result.storeName && `${result.storeName} · `}{result.date || 'Recent purchase'}
                      {result.totalSpent && ` · ${result.totalSpent}`}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-heading font-bold">{result.overallScore}</div>
                    <Badge className="bg-white/20 text-white border-0 mt-1">{result.overallBand}</Badge>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-body text-foreground">{result.summary}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {result.topPositives?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-primary" /> Top Positives
                      </h4>
                      <ul className="space-y-1">
                        {result.topPositives.map((p, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-primary">✓</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.topConcerns?.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" /> Top Concerns
                      </h4>
                      <ul className="space-y-1">
                        {result.topConcerns.map((c, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-destructive">⚠</span> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Product Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  Product Breakdown ({result.products?.length || 0} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.products?.map((product, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="flex items-center gap-4 p-3 rounded-xl border border-border/60 hover:bg-muted/30 transition-colors"
                    >
                      <div className={`text-2xl font-bold w-12 text-center ${getScoreColor(product.kleenScore)}`}>
                        {product.kleenScore}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        {product.concern && (
                          <p className="text-xs text-muted-foreground mt-0.5">{product.concern}</p>
                        )}
                      </div>
                      {product.price && (
                        <span className="text-sm text-muted-foreground">{product.price}</span>
                      )}
                      <Badge className={getBandColor(product.scoreBand)}>{product.scoreBand}</Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button onClick={() => { setResult(null); setPreviewUrl(null); }} variant="outline" className="flex-1">
                <Upload className="h-4 w-4 mr-2" /> Scan Another Receipt
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" /> Share Report Card
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default ReceiptScanner;
