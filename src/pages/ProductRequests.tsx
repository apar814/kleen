import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AppSidebar from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, ThumbsUp, Search, Package, Clock, CheckCircle, XCircle, Loader2, TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ProductRequest {
  id: string;
  product_name: string;
  brand: string | null;
  upc: string | null;
  notes: string | null;
  status: string;
  upvotes: number;
  user_id: string;
  created_at: string;
}

const ProductRequests: React.FC = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [upc, setUpc] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchRequests();
    if (user) {
      fetchUserUpvotes();
    }
  }, [user]);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('product_requests')
      .select('*')
      .order('upvotes', { ascending: false });

    if (!error && data) {
      setRequests(data);
    }
    setLoading(false);
  };

  const fetchUserUpvotes = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('product_request_upvotes')
      .select('request_id')
      .eq('user_id', user.id);

    if (data) {
      setUserUpvotes(new Set(data.map(u => u.request_id)));
    }
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to submit a request');
      return;
    }

    if (!productName.trim()) {
      toast.error('Product name is required');
      return;
    }

    setSubmitting(true);
    const { error } = await supabase
      .from('product_requests')
      .insert({
        user_id: user.id,
        product_name: productName.trim(),
        brand: brand.trim() || null,
        upc: upc.trim() || null,
        notes: notes.trim() || null
      });

    if (error) {
      toast.error('Failed to submit request');
    } else {
      toast.success('Product request submitted!');
      setProductName('');
      setBrand('');
      setUpc('');
      setNotes('');
      setIsDialogOpen(false);
      fetchRequests();
    }
    setSubmitting(false);
  };

  const handleUpvote = async (requestId: string) => {
    if (!user) {
      toast.error('Please sign in to upvote');
      return;
    }

    const hasUpvoted = userUpvotes.has(requestId);

    if (hasUpvoted) {
      // Remove upvote
      await supabase
        .from('product_request_upvotes')
        .delete()
        .eq('request_id', requestId)
        .eq('user_id', user.id);

      await supabase
        .from('product_requests')
        .update({ upvotes: requests.find(r => r.id === requestId)!.upvotes - 1 })
        .eq('id', requestId);

      setUserUpvotes(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    } else {
      // Add upvote
      await supabase
        .from('product_request_upvotes')
        .insert({ request_id: requestId, user_id: user.id });

      await supabase
        .from('product_requests')
        .update({ upvotes: requests.find(r => r.id === requestId)!.upvotes + 1 })
        .eq('id', requestId);

      setUserUpvotes(prev => new Set(prev).add(requestId));
    }

    fetchRequests();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scored': return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scored': return 'bg-accent/20 text-accent-foreground border border-accent/30';
      case 'rejected': return 'bg-destructive/10 text-destructive border border-destructive/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const filteredRequests = requests.filter(r => 
    r.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.brand?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppSidebar>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Product Requests</h1>
            <p className="text-muted-foreground mt-1">Request products to be scored by the community</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Request a Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Request a Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitRequest} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input 
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., AG1 Greens Powder"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input 
                    id="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="e.g., Athletic Greens"
                  />
                </div>
                <div>
                  <Label htmlFor="upc">UPC/Barcode (if known)</Label>
                  <Input 
                    id="upc"
                    value={upc}
                    onChange={(e) => setUpc(e.target.value)}
                    placeholder="e.g., 012345678901"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional info about this product..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search product requests..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{requests.filter(r => r.status === 'pending').length}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{requests.filter(r => r.status === 'scored').length}</p>
                  <p className="text-sm text-muted-foreground">Scored</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{requests.reduce((sum, r) => sum + r.upvotes, 0)}</p>
                  <p className="text-sm text-muted-foreground">Total Votes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No product requests found</p>
              <p className="text-sm text-muted-foreground mt-1">Be the first to request a product!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-4">
                      {/* Upvote */}
                      <button
                        onClick={() => handleUpvote(request.id)}
                        className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                          userUpvotes.has(request.id) 
                            ? 'bg-primary/10 text-primary' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <ThumbsUp className={`h-5 w-5 ${userUpvotes.has(request.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium mt-1">{request.upvotes}</span>
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">{request.product_name}</h3>
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status}</span>
                          </Badge>
                        </div>
                        {request.brand && (
                          <p className="text-sm text-muted-foreground mt-1">{request.brand}</p>
                        )}
                        {request.notes && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{request.notes}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          Requested {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {/* UPC */}
                      {request.upc && (
                        <div className="hidden md:block text-right">
                          <p className="text-xs text-muted-foreground">UPC</p>
                          <p className="font-mono text-sm">{request.upc}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppSidebar>
  );
};

export default ProductRequests;
