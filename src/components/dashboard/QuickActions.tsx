import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Upload, 
  Calculator, 
  FileSearch, 
  Users, 
  Settings,
  Zap
} from 'lucide-react';

interface QuickAction {
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
}

const quickActions: QuickAction[] = [
  { 
    icon: Plus, 
    label: 'New Application', 
    description: 'Start a new loan application',
    color: 'from-primary to-accent'
  },
  { 
    icon: Upload, 
    label: 'Upload Documents', 
    description: 'Add verification documents',
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    icon: Calculator, 
    label: 'EMI Calculator', 
    description: 'Calculate loan payments',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    icon: FileSearch, 
    label: 'Track Status', 
    description: 'Check application progress',
    color: 'from-orange-500 to-amber-500'
  },
];

export function QuickActions() {
  return (
    <Card variant="glass">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex-col items-start p-4 gap-2 hover:bg-secondary/70"
            >
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                <action.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
