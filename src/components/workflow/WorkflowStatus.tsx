import { useLendingStore } from '@/store/lendingStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AgentType, WorkflowStatus as Status } from '@/types/lending';
import { 
  Shield, 
  Calculator, 
  FileCheck, 
  Sparkles,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  GitBranch
} from 'lucide-react';
import { cn } from '@/lib/utils';

const agentConfig: Record<AgentType, { icon: React.ElementType; label: string; color: string }> = {
  verification: { icon: Shield, label: 'Document Verification', color: 'from-blue-500 to-cyan-500' },
  underwriting: { icon: Calculator, label: 'Risk Assessment', color: 'from-purple-500 to-pink-500' },
  sanction: { icon: FileCheck, label: 'Sanction Generation', color: 'from-green-500 to-emerald-500' },
  negotiation: { icon: Shield, label: 'Terms Negotiation', color: 'from-orange-500 to-amber-500' },
  sales: { icon: Sparkles, label: 'Final Review', color: 'from-primary to-accent' },
};

const statusConfig: Record<Status, { icon: React.ElementType; label: string; className: string }> = {
  pending: { icon: Clock, label: 'Pending', className: 'text-muted-foreground' },
  in_progress: { icon: Loader2, label: 'In Progress', className: 'text-primary animate-spin' },
  completed: { icon: CheckCircle2, label: 'Completed', className: 'text-success' },
  failed: { icon: AlertCircle, label: 'Failed', className: 'text-destructive' },
  awaiting_input: { icon: Clock, label: 'Awaiting Input', className: 'text-warning' },
};

export function WorkflowStatus() {
  const { workflowSteps, currentStep } = useLendingStore();

  return (
    <Card variant="glass" className="flex-shrink-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center">
            <GitBranch className="h-4 w-4 text-primary" />
          </div>
          Workflow Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-0.5">
          {workflowSteps.map((step, index) => {
            const config = agentConfig[step.agent];
            const status = statusConfig[step.status];
            const isActive = index === currentStep && step.status === 'in_progress';
            const isCompleted = step.status === 'completed';
            const isPending = step.status === 'pending';

            return (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < workflowSteps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute left-[18px] top-10 w-0.5 h-5 transition-colors duration-300",
                      isCompleted ? "bg-success" : "bg-border"
                    )}
                  />
                )}

                <div
                  className={cn(
                    "flex items-center gap-2.5 p-2 rounded-lg transition-all duration-300",
                    isActive && "bg-primary/10"
                  )}
                >
                  {/* Agent Icon */}
                  <div
                    className={cn(
                      "h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                      isActive || isCompleted
                        ? `bg-gradient-to-br ${config.color}`
                        : "bg-secondary"
                    )}
                  >
                    <config.icon 
                      className={cn(
                        "h-4 w-4 transition-colors duration-300",
                        isActive || isCompleted ? "text-primary-foreground" : "text-muted-foreground"
                      )} 
                    />
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className={cn(
                      "font-medium text-sm truncate",
                      isPending && "text-muted-foreground"
                    )}>
                      {config.label}
                    </h4>
                    <div className="flex items-center gap-1">
                      <status.icon className={cn("h-3 w-3", status.className)} />
                      <span className={cn("text-xs", status.className)}>
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium",
                      isCompleted 
                        ? "bg-success text-success-foreground" 
                        : isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="h-3 w-3" /> : index + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
