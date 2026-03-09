import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Edit, ShoppingCart, Loader2, Trash2 } from 'lucide-react';

interface OrderItem {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  estimated_price: number;
  kleen_score: number;
  reason: string;
  is_must_have?: boolean;
}

interface Order {
  id: string;
  generated_items: OrderItem[];
  total_cost: number;
  average_score: number;
  status: string;
  store_name: string | null;
  notes: string | null;
  created_at: string;
}

interface Props {
  order: Order;
  onApprove: (id: string) => void;
  onSkip: (id: string) => void;
  onRemoveItem: (orderId: string, itemIndex: number) => void;
  approving: boolean;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-primary';
  if (score >= 60) return 'text-secondary-foreground';
  if (score >= 40) return 'text-muted-foreground';
  return 'text-destructive';
};

const categoryEmoji: Record<string, string> = {
  produce: '🥬',
  protein: '🥩',
  dairy: '🥛',
  grains: '🌾',
  snacks: '🍪',
  beverages: '🥤',
  pantry: '🫙',
  frozen: '🧊',
  supplements: '💊',
};

const OrderReviewCard: React.FC<Props> = ({ order, onApprove, onSkip, onRemoveItem, approving }) => {
  const items = order.generated_items as OrderItem[];
  const grouped = items.reduce<Record<string, OrderItem[]>>((acc, item) => {
    const cat = item.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Weekly Order
              {order.store_name && <Badge variant="outline">{order.store_name}</Badge>}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {items.length} items · ${Number(order.total_cost).toFixed(2)} · Avg score: {order.average_score}
            </p>
          </div>
          <Badge variant={order.status === 'draft' ? 'secondary' : order.status === 'approved' ? 'default' : 'outline'}>
            {order.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {order.notes && (
          <p className="text-sm text-muted-foreground mb-4 italic">{order.notes}</p>
        )}

        <div className="space-y-4">
          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category}>
              <h4 className="text-sm font-medium mb-2">
                {categoryEmoji[category] || '📦'} {category.charAt(0).toUpperCase() + category.slice(1)}
              </h4>
              <div className="space-y-1">
                {categoryItems.map((item, i) => {
                  const globalIndex = items.indexOf(item);
                  return (
                    <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">{item.name}</span>
                          {item.is_must_have && <Badge variant="outline" className="text-[10px] px-1 py-0">Must-have</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.quantity} {item.unit} · {item.reason}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`text-sm font-bold ${getScoreColor(item.kleen_score)}`}>{item.kleen_score}</span>
                        <span className="text-sm text-muted-foreground">${item.estimated_price.toFixed(2)}</span>
                        {order.status === 'draft' && (
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100"
                            onClick={() => onRemoveItem(order.id, globalIndex)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {order.status === 'draft' && (
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 gap-2" onClick={() => onApprove(order.id)} disabled={approving}>
              {approving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
              Approve Order
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => onSkip(order.id)}>
              <XCircle className="h-4 w-4" />
              Skip
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderReviewCard;
