import React, { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export interface ScannedMenuItem {
  item_name: string;
  description?: string;
  price?: string;
  kleen_score: number;
  dietary_tags: string[];
  allergen_flags: string[];
  score_reasoning?: string;
}

interface MenuScanResult {
  restaurant_name?: string;
  items: ScannedMenuItem[];
}

interface MenuScannerDialogProps {
  onScanComplete: (result: MenuScanResult) => void;
}

const MenuScannerDialog: React.FC<MenuScannerDialogProps> = ({ onScanComplete }) => {
  const [scanning, setScanning] = useState(false);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processImage = async (file: File) => {
    setScanning(true);
    try {
      // Convert to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Strip the data URL prefix
          resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke('menu-scan', {
        body: { imageBase64: base64 },
      });

      if (error) {
        throw new Error(error.message || 'Failed to scan menu');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      const items = data?.items || [];
      if (items.length === 0) {
        toast.warning('No menu items detected. Try a clearer photo.');
        return;
      }

      toast.success(`Found ${items.length} menu items!`);
      onScanComplete(data as MenuScanResult);
      setOpen(false);
    } catch (err: any) {
      console.error('Menu scan error:', err);
      toast.error(err.message || 'Failed to analyze menu');
    } finally {
      setScanning(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
    e.target.value = '';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Camera className="h-4 w-4" />
          Scan Menu
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scan a Restaurant Menu</DialogTitle>
        </DialogHeader>
        {scanning ? (
          <div className="py-12 text-center">
            <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground font-medium">Analyzing menu with AI...</p>
            <p className="text-sm text-muted-foreground mt-1">
              Extracting items and scoring each one
            </p>
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Take a photo or upload an image of a restaurant menu to get instant health scores for every item.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1 gap-2"
                onClick={() => cameraInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
                Take Photo
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Button>
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MenuScannerDialog;
