import { AgentType } from '@/types/lending';
import { Bot, Shield, Calculator, FileCheck, Handshake, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  agentType?: AgentType;
}

const agentIcons: Record<AgentType, React.ElementType> = {
  verification: Shield,
  underwriting: Calculator,
  sanction: FileCheck,
  negotiation: Handshake,
  sales: Sparkles,
};

const agentNames: Record<AgentType, string> = {
  verification: 'Verification Agent',
  underwriting: 'Underwriting Agent',
  sanction: 'Sanction Agent',
  negotiation: 'Negotiation Agent',
  sales: 'Sales Agent',
};

const agentColors: Record<AgentType, string> = {
  verification: 'from-blue-500 to-cyan-500',
  underwriting: 'from-purple-500 to-pink-500',
  sanction: 'from-green-500 to-emerald-500',
  negotiation: 'from-orange-500 to-amber-500',
  sales: 'from-primary to-accent',
};

export function TypingIndicator({ agentType }: TypingIndicatorProps) {
  const AgentIcon = agentType ? agentIcons[agentType] : Bot;

  return (
    <div className="flex gap-3 animate-fade-in">
      {/* Avatar */}
      <div
        className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
          agentType
            ? `bg-gradient-to-br ${agentColors[agentType]}`
            : "gradient-primary"
        )}
      >
        <AgentIcon className="h-5 w-5 text-primary-foreground" />
      </div>

      {/* Typing Bubble */}
      <div className="flex flex-col gap-1">
        {agentType && (
          <span className="text-xs font-medium text-muted-foreground px-1">
            {agentNames[agentType]}
          </span>
        )}
        <div className="glass rounded-2xl rounded-bl-md px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
