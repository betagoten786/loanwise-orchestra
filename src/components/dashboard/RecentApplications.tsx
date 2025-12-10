import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Application {
  id: string;
  borrowerName: string;
  amount: number;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  createdAt: Date;
}

const mockApplications: Application[] = [
  { id: 'LA001', borrowerName: 'Rahul Sharma', amount: 500000, status: 'under_review', createdAt: new Date(2024, 0, 15) },
  { id: 'LA002', borrowerName: 'Priya Patel', amount: 750000, status: 'approved', createdAt: new Date(2024, 0, 14) },
  { id: 'LA003', borrowerName: 'Amit Kumar', amount: 300000, status: 'pending', createdAt: new Date(2024, 0, 13) },
  { id: 'LA004', borrowerName: 'Sneha Reddy', amount: 1000000, status: 'rejected', createdAt: new Date(2024, 0, 12) },
];

const statusConfig = {
  pending: { icon: Clock, label: 'Pending', variant: 'secondary' as const },
  under_review: { icon: AlertCircle, label: 'Under Review', variant: 'default' as const },
  approved: { icon: CheckCircle2, label: 'Approved', variant: 'default' as const },
  rejected: { icon: XCircle, label: 'Rejected', variant: 'destructive' as const },
};

export function RecentApplications() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          Recent Applications
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockApplications.map(app => {
            const status = statusConfig[app.status];
            return (
              <div
                key={app.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {app.borrowerName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{app.borrowerName}</p>
                    <p className="text-xs text-muted-foreground">{app.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm">{formatCurrency(app.amount)}</p>
                  <Badge 
                    variant={status.variant}
                    className={cn(
                      "text-xs",
                      app.status === 'approved' && "bg-success/20 text-success border-success/30",
                    )}
                  >
                    {status.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
