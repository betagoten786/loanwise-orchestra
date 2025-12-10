import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon: LucideIcon;
  color?: string;
}

export function StatsCard({ title, value, change, icon: Icon, color = 'from-primary to-accent' }: StatsCardProps) {
  return (
    <Card variant="glass" className="p-5 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-display font-bold">{value}</p>
          {change && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              change.trend === 'up' ? "text-success" : "text-destructive"
            )}>
              <span>{change.trend === 'up' ? '↑' : '↓'}</span>
              <span>{Math.abs(change.value)}% from last month</span>
            </div>
          )}
        </div>
        <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center", color)}>
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
      </div>
    </Card>
  );
}
