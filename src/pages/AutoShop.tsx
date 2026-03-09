import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AppSidebar from '@/components/AppSidebar';
import AutoShopPreferences from '@/components/autoshop/AutoShopPreferences';
import OrderReviewCard from '@/components/autoshop/OrderReviewCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bot, ShoppingCart, History, Settings, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const DEFAULT_PROFILE = {
  preferred_stores: [] as string[],
  budget: 100,
  schedule: 'weekly',
  min_score: 70,
  must_haves: [] as string[],
  never_buy: [] as string[],
  household_size: 2,
  dietary_preferences: [] as string[],
  active: true,
  delivery_day: 'sunday',
};

const AutoShop: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [approving, setApproving] = useState(false);

  const fetchData = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);

    // Fetch profile
    const { data: profileData } = await supabase
      .from('auto_shop_profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (profileData) {
      setProfileId(profileData.id);
      setProfile({
        preferred_stores: (profileData.preferred_stores as string[]) || [],
        budget: Number(profileData.budget),
        schedule: profileData.schedule,
        min_score: profileData.min_score,
        must_haves: (profileData.must_haves as string[]) || [],
        never_buy: (profileData.never_buy as string[]) || [],
        household_size: profileData.household_size,
        dietary_preferences: (profileData.dietary_preferences as string[]) || [],
        active: profileData.active,
        delivery_day: profileData.delivery_day || 'sunday',
      });
    }

    // Fetch orders
    const { data: orderData } = await supabase
      .from('auto_shop_orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    setOrders(orderData || []);
    setLoading(false);
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSaveProfile = async (form: typeof DEFAULT_PROFILE) => {
    if (!user) { toast.error('Please sign in'); return; }
    setSaving(true);

    const payload = { ...form, user_id: user.id };

    if (profileId) {
      const { error } = await supabase
        .from('auto_shop_profiles')
        .update(payload)
        .eq('id', profileId);
      if (error) toast.error('Failed to update preferences');
      else toast.success('Preferences saved!');
    } else {
      const { data, error } = await supabase
        .from('auto_shop_profiles')
        .insert(payload)
        .select()
        .single();
      if (error) toast.error('Failed to save preferences');
      else {
        setProfileId(data.id);
        toast.success('Preferences created!');
      }
    }
    setProfile(form);
    setSaving(false);
  };

  const handleGenerateOrder = async () => {
    if (!user || !profileId) {
      toast.error('Save your preferences first');
      return;
    }
    setGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('auto-shop', {
        body: { profile },
      });

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);

      // Save to database
      const { data: order, error: insertErr } = await supabase
        .from('auto_shop_orders')
        .insert({
          user_id: user.id,
          profile_id: profileId,
          generated_items: data.items,
          total_cost: data.total_cost,
          average_score: data.average_score,
          store_name: data.store_name,
          notes: data.nutrition_notes || null,
          status: 'draft',
          review_deadline: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        })
        .select()
        .single();

      if (insertErr) throw new Error('Failed to save order');

      setOrders(prev => [order, ...prev]);
      toast.success(`Order generated! ${data.items.length} items, $${data.total_cost.toFixed(2)}`);
    } catch (err: any) {
      toast.error(err.message || 'Failed to generate order');
    } finally {
      setGenerating(false);
    }
  };

  const handleApprove = async (orderId: string) => {
    setApproving(true);
    const { error } = await supabase
      .from('auto_shop_orders')
      .update({ status: 'approved' })
      .eq('id', orderId);

    if (error) toast.error('Failed to approve');
    else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'approved' } : o));
      toast.success('Order approved! 🎉');
    }
    setApproving(false);
  };

  const handleSkip = async (orderId: string) => {
    const { error } = await supabase
      .from('auto_shop_orders')
      .update({ status: 'skipped' })
      .eq('id', orderId);

    if (error) toast.error('Failed to skip');
    else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'skipped' } : o));
      toast.info('Order skipped');
    }
  };

  const handleRemoveItem = async (orderId: string, itemIndex: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const items = [...(order.generated_items as any[])];
    items.splice(itemIndex, 1);
    const totalCost = items.reduce((sum: number, i: any) => sum + (i.estimated_price || 0), 0);
    const avgScore = items.length ? Math.round(items.reduce((sum: number, i: any) => sum + (i.kleen_score || 0), 0) / items.length) : 0;

    const { error } = await supabase
      .from('auto_shop_orders')
      .update({ generated_items: items, total_cost: totalCost, average_score: avgScore })
      .eq('id', orderId);

    if (!error) {
      setOrders(prev => prev.map(o =>
        o.id === orderId ? { ...o, generated_items: items, total_cost: totalCost, average_score: avgScore } : o
      ));
    }
  };

  const draftOrders = orders.filter(o => o.status === 'draft');
  const pastOrders = orders.filter(o => o.status !== 'draft');

  if (!user) {
    return (
      <AppSidebar>
        <div className="p-6 max-w-4xl mx-auto text-center py-20">
          <Bot className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Kleen Auto-Shop</h1>
          <p className="text-muted-foreground mt-2">Sign in to set up autonomous grocery ordering</p>
        </div>
      </AppSidebar>
    );
  }

  return (
    <AppSidebar>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Bot className="h-8 w-8 text-primary" />
              Kleen Auto-Shop
            </h1>
            <p className="text-muted-foreground mt-2">
              AI generates your weekly grocery order — you review and approve
            </p>
          </div>
          <Button
            className="gap-2"
            onClick={handleGenerateOrder}
            disabled={generating || !profileId}
          >
            {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {generating ? 'Generating...' : 'Generate Order'}
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Tabs defaultValue={draftOrders.length > 0 ? 'review' : 'preferences'}>
            <TabsList className="mb-6">
              <TabsTrigger value="review" className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Review Orders
                {draftOrders.length > 0 && (
                  <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                    {draftOrders.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2">
                <History className="h-4 w-4" />
                History
              </TabsTrigger>
              <TabsTrigger value="preferences" className="gap-2">
                <Settings className="h-4 w-4" />
                Preferences
              </TabsTrigger>
            </TabsList>

            <TabsContent value="review" className="space-y-6">
              {draftOrders.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-lg">No pending orders</h3>
                    <p className="text-muted-foreground mt-1">
                      Click "Generate Order" to create your next grocery list
                    </p>
                  </CardContent>
                </Card>
              ) : (
                draftOrders.map(order => (
                  <OrderReviewCard
                    key={order.id}
                    order={order}
                    onApprove={handleApprove}
                    onSkip={handleSkip}
                    onRemoveItem={handleRemoveItem}
                    approving={approving}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {pastOrders.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <History className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-lg">No order history</h3>
                    <p className="text-muted-foreground mt-1">Your past orders will appear here</p>
                  </CardContent>
                </Card>
              ) : (
                pastOrders.map(order => (
                  <OrderReviewCard
                    key={order.id}
                    order={order}
                    onApprove={handleApprove}
                    onSkip={handleSkip}
                    onRemoveItem={handleRemoveItem}
                    approving={false}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="preferences">
              <AutoShopPreferences
                profile={profile}
                onSave={handleSaveProfile}
                saving={saving}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AppSidebar>
  );
};

export default AutoShop;
