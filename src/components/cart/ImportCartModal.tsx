
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/Product';
import { handleAmazonCartImport } from '@/services/amazonCartService';
import { handleInstacartCartImport } from '@/services/instacartCartService';

type CartSource = 'amazon' | 'instacart';

interface ImportCartModalProps {
  onImport: (products: Product[]) => void;
  onClose: () => void;
}

const ImportCartModal: React.FC<ImportCartModalProps> = ({ onImport, onClose }) => {
  const [cartJson, setCartJson] = useState('');
  const [cartSource, setCartSource] = useState<CartSource>('amazon');
  const { toast } = useToast();

  const handleCartImport = async () => {
    try {
      // Process the cart data based on the selected source
      let products: Product[] = [];
      
      if (cartSource === 'amazon') {
        products = await handleAmazonCartImport(cartJson);
      } else if (cartSource === 'instacart') {
        products = await handleInstacartCartImport(cartJson);
      }
      
      if (products.length === 0) {
        toast({
          title: "Import Failed",
          description: `Could not parse the ${cartSource === 'amazon' ? 'Amazon' : 'Instacart'} cart data. Please check the format and try again.`,
          variant: "destructive",
        });
        return;
      }
      
      onImport(products);
      
      toast({
        title: "Cart Imported",
        description: `Successfully imported ${products.length} products from ${cartSource === 'amazon' ? 'Amazon' : 'Instacart'}.`,
      });
    } catch (error) {
      console.error(`Error importing ${cartSource} cart:`, error);
      toast({
        title: "Import Failed",
        description: `An error occurred while importing the ${cartSource === 'amazon' ? 'Amazon' : 'Instacart'} cart data.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Cart Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <RadioGroup 
            value={cartSource} 
            onValueChange={(value) => setCartSource(value as CartSource)}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amazon" id="amazon" />
              <Label htmlFor="amazon">Amazon</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="instacart" id="instacart" />
              <Label htmlFor="instacart">Instacart</Label>
            </div>
          </RadioGroup>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          {cartSource === 'amazon' 
            ? "Paste your Amazon cart JSON data below. This data can be obtained from the Amazon cart page using our browser extension."
            : "Paste your Instacart cart JSON data below. This data can be obtained from the Instacart cart page using our browser extension."
          }
        </p>
        <Textarea
          placeholder={`Paste ${cartSource === 'amazon' ? 'Amazon' : 'Instacart'} cart JSON here...`}
          className="min-h-[200px] mb-4"
          value={cartJson}
          onChange={(e) => setCartJson(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCartImport}>
            Import Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportCartModal;
