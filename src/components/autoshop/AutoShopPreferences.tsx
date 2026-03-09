import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Settings, Plus, X } from 'lucide-react';

interface AutoShopProfile {
  preferred_stores: string[];
  budget: number;
  schedule: string;
  min_score: number;
  must_haves: string[];
  never_buy: string[];
  household_size: number;
  dietary_preferences: string[];
  active: boolean;
  delivery_day: string;
}

interface Props {
  profile: AutoShopProfile;
  onSave: (profile: AutoShopProfile) => void;
  saving: boolean;
}

const STORES = ['Whole Foods', 'Trader Joe\'s', 'Kroger', 'Publix', 'Vons', 'Instacart', 'Amazon Fresh', 'Costco'];
const DIETS = ['Organic', 'Gluten-Free', 'Dairy-Free', 'Vegan', 'Keto', 'Paleo', 'Low-Sodium', 'High-Protein'];
const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const AutoShopPreferences: React.FC<Props> = ({ profile, onSave, saving }) => {
  const [form, setForm] = useState<AutoShopProfile>(profile);
  const [newMustHave, setNewMustHave] = useState('');
  const [newNeverBuy, setNewNeverBuy] = useState('');

  const toggleStore = (store: string) => {
    setForm(f => ({
      ...f,
      preferred_stores: f.preferred_stores.includes(store)
        ? f.preferred_stores.filter(s => s !== store)
        : [...f.preferred_stores, store],
    }));
  };

  const toggleDiet = (diet: string) => {
    setForm(f => ({
      ...f,
      dietary_preferences: f.dietary_preferences.includes(diet)
        ? f.dietary_preferences.filter(d => d !== diet)
        : [...f.dietary_preferences, diet],
    }));
  };

  const addMustHave = () => {
    if (newMustHave.trim()) {
      setForm(f => ({ ...f, must_haves: [...f.must_haves, newMustHave.trim()] }));
      setNewMustHave('');
    }
  };

  const addNeverBuy = () => {
    if (newNeverBuy.trim()) {
      setForm(f => ({ ...f, never_buy: [...f.never_buy, newNeverBuy.trim()] }));
      setNewNeverBuy('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Auto-Shop Preferences
        </CardTitle>
        <CardDescription>Set up your shopping autopilot — Kleen generates weekly orders for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Active toggle */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base font-medium">Auto-Shop Active</Label>
            <p className="text-sm text-muted-foreground">Enable automatic weekly order generation</p>
          </div>
          <Switch checked={form.active} onCheckedChange={v => setForm(f => ({ ...f, active: v }))} />
        </div>

        {/* Budget & Household */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Weekly Budget ($)</Label>
            <Input
              type="number"
              min={25}
              max={500}
              value={form.budget}
              onChange={e => setForm(f => ({ ...f, budget: Number(e.target.value) }))}
            />
          </div>
          <div>
            <Label>Household Size</Label>
            <Input
              type="number"
              min={1}
              max={12}
              value={form.household_size}
              onChange={e => setForm(f => ({ ...f, household_size: Number(e.target.value) }))}
            />
          </div>
        </div>

        {/* Min Score */}
        <div>
          <Label>Minimum Kleen Score: {form.min_score}</Label>
          <Slider
            value={[form.min_score]}
            onValueChange={([v]) => setForm(f => ({ ...f, min_score: v }))}
            min={30}
            max={95}
            step={5}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">Only include products scoring {form.min_score}+ in your order</p>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Schedule</Label>
            <Select value={form.schedule} onValueChange={v => setForm(f => ({ ...f, schedule: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="biweekly">Every 2 Weeks</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Delivery Day</Label>
            <Select value={form.delivery_day} onValueChange={v => setForm(f => ({ ...f, delivery_day: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {DAYS.map(d => (
                  <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Preferred Stores */}
        <div>
          <Label>Preferred Stores</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {STORES.map(store => (
              <Badge
                key={store}
                variant={form.preferred_stores.includes(store) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleStore(store)}
              >
                {store}
              </Badge>
            ))}
          </div>
        </div>

        {/* Dietary Preferences */}
        <div>
          <Label>Dietary Preferences</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {DIETS.map(diet => (
              <Badge
                key={diet}
                variant={form.dietary_preferences.includes(diet) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleDiet(diet)}
              >
                {diet}
              </Badge>
            ))}
          </div>
        </div>

        {/* Must Haves */}
        <div>
          <Label>Must-Have Items</Label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="e.g. Almond milk"
              value={newMustHave}
              onChange={e => setNewMustHave(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addMustHave()}
            />
            <Button size="icon" variant="outline" onClick={addMustHave}><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {form.must_haves.map((item, i) => (
              <Badge key={i} variant="secondary" className="gap-1">
                {item}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setForm(f => ({ ...f, must_haves: f.must_haves.filter((_, idx) => idx !== i) }))} />
              </Badge>
            ))}
          </div>
        </div>

        {/* Never Buy */}
        <div>
          <Label>Never Buy (Blacklist)</Label>
          <div className="flex gap-2 mt-2">
            <Input
              placeholder="e.g. Soda"
              value={newNeverBuy}
              onChange={e => setNewNeverBuy(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addNeverBuy()}
            />
            <Button size="icon" variant="outline" onClick={addNeverBuy}><Plus className="h-4 w-4" /></Button>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {form.never_buy.map((item, i) => (
              <Badge key={i} variant="destructive" className="gap-1">
                {item}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setForm(f => ({ ...f, never_buy: f.never_buy.filter((_, idx) => idx !== i) }))} />
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={() => onSave(form)} disabled={saving}>
          {saving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AutoShopPreferences;
