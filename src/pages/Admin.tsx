import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AppSidebar from '@/components/AppSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, Package, Trophy, Flag, BarChart3, 
  Search, CheckCircle, XCircle, Clock, TrendingUp,
  AlertTriangle, Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalScansToday: number;
  totalScansWeek: number;
  pendingRequests: number;
  pendingScores: number;
}

interface ProductRequest {
  id: string;
  product_name: string;
  brand: string | null;
  upc: string | null;
  status: string;
  upvotes: number;
  created_at: string;
  user_id: string;
}

interface CommunityScore {
  id: string;
  product_id: string;
  proposed_score: number;
  reasoning: string | null;
  status: string;
  created_at: string;
  user_id: string;
  products?: { name: string } | null;
}

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalScansToday: 0,
    totalScansWeek: 0,
    pendingRequests: 0,
    pendingScores: 0
  });
  const [productRequests, setProductRequests] = useState<ProductRequest[]>([]);
  const [communityScores, setCommunityScores] = useState<CommunityScore[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (error || !data) {
      toast.error('Access denied. Admin privileges required.');
      navigate('/dashboard');
      return;
    }

    setIsAdmin(true);
    fetchDashboardData();
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch stats in parallel
      const [productsRes, requestsRes, scoresRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('product_requests').select('*').eq('status', 'pending').order('upvotes', { ascending: false }),
        supabase.from('community_scores').select('*, products(name)').eq('status', 'pending').order('created_at', { ascending: false })
      ]);

      setStats(prev => ({
        ...prev,
        totalProducts: productsRes.count || 0,
        pendingRequests: requestsRes.data?.length || 0,
        pendingScores: scoresRes.data?.length || 0
      }));

      setProductRequests(requestsRes.data || []);
      setCommunityScores(scoresRes.data as CommunityScore[] || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestStatus = async (requestId: string, status: 'scored' | 'rejected') => {
    const { error } = await supabase
      .from('product_requests')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', requestId);

    if (error) {
      toast.error('Failed to update request');
      return;
    }

    toast.success(`Request ${status === 'scored' ? 'marked as scored' : 'rejected'}`);
    fetchDashboardData();
  };

  const handleScoreReview = async (scoreId: string, status: 'approved' | 'rejected', productId?: string, proposedScore?: number) => {
    if (!user) return;

    const { error: scoreError } = await supabase
      .from('community_scores')
      .update({ 
        status, 
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', scoreId);

    if (scoreError) {
      toast.error('Failed to update score review');
      return;
    }

    // If approved, update the product's kleen_score
    if (status === 'approved' && productId && proposedScore !== undefined) {
      await supabase
        .from('products')
        .update({ kleen_score: proposedScore })
        .eq('id', productId);
    }

    toast.success(`Score ${status}`);
    fetchDashboardData();
  };

  if (!isAdmin) {
    return (
      <AppSidebar>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-kleen-primary" />
        </div>
      </AppSidebar>
    );
  }

  return (
    <AppSidebar>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground mt-1">Manage products, users, and content</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Requests
              {stats.pendingRequests > 0 && (
                <Badge variant="destructive" className="ml-1">{stats.pendingRequests}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="scores" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Scores
              {stats.pendingScores > 0 && (
                <Badge variant="destructive" className="ml-1">{stats.pendingScores}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="moderation" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Moderation
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalProducts}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingRequests}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Scores</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingScores}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Challenges</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Product Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {productRequests.slice(0, 5).map(request => (
                    <div key={request.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{request.product_name}</p>
                        <p className="text-sm text-muted-foreground">{request.brand || 'Unknown brand'}</p>
                      </div>
                      <Badge variant="outline">{request.upvotes} votes</Badge>
                    </div>
                  ))}
                  {productRequests.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No pending requests</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Score Submissions</CardTitle>
                </CardHeader>
                <CardContent>
                  {communityScores.slice(0, 5).map(score => (
                    <div key={score.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{score.products?.name || 'Unknown product'}</p>
                        <p className="text-sm text-muted-foreground">Proposed: {score.proposed_score}/100</p>
                      </div>
                      <Badge>{score.status}</Badge>
                    </div>
                  ))}
                  {communityScores.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No pending scores</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Product Management</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search products..." 
                        className="pl-10 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button>Add Product</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Product management interface coming soon. Use the database directly for now.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Product Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Product Requests Queue</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : productRequests.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No pending product requests</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>UPC</TableHead>
                        <TableHead>Upvotes</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productRequests.map(request => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.product_name}</TableCell>
                          <TableCell>{request.brand || '-'}</TableCell>
                          <TableCell className="font-mono text-sm">{request.upc || '-'}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{request.upvotes}</Badge>
                          </TableCell>
                          <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleRequestStatus(request.id, 'scored')}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Score
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleRequestStatus(request.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Scores Tab */}
          <TabsContent value="scores">
            <Card>
              <CardHeader>
                <CardTitle>Community Score Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : communityScores.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No pending score submissions</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Proposed Score</TableHead>
                        <TableHead>Reasoning</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {communityScores.map(score => (
                        <TableRow key={score.id}>
                          <TableCell className="font-medium">{score.products?.name || 'Unknown'}</TableCell>
                          <TableCell>
                            <Badge className={
                              score.proposed_score >= 80 ? 'bg-green-500' :
                              score.proposed_score >= 60 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }>
                              {score.proposed_score}/100
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">{score.reasoning || '-'}</TableCell>
                          <TableCell>{new Date(score.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleScoreReview(score.id, 'approved', score.product_id, score.proposed_score)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => handleScoreReview(score.id, 'rejected')}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No flagged content to review</p>
                  <p className="text-sm text-muted-foreground mt-1">Posts with 3+ reports will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppSidebar>
  );
};

export default Admin;
