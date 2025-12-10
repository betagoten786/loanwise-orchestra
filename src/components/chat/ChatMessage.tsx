import { cn } from '@/lib/utils';
import { Message, AgentType } from '@/types/lending';
import { Bot, User, Shield, Calculator, FileCheck, Handshake, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
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

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';
  const AgentIcon = message.agentType ? agentIcons[message.agentType] : Bot;

  if (isSystem) {
    return (
      <div className="flex justify-center my-4 animate-fade-in">
        <div className="glass rounded-full px-4 py-2 text-sm text-muted-foreground">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
          isUser
            ? "bg-primary/20"
            : message.agentType
            ? `bg-gradient-to-br ${agentColors[message.agentType]}`
            : "gradient-primary"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-primary" />
        ) : (
          <AgentIcon className="h-5 w-5 text-primary-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col max-w-[75%] gap-1",
          isUser ? "items-end" : "items-start"
        )}
      >
        {/* Agent Name */}
        {!isUser && message.agentType && (
          <span className="text-xs font-medium text-muted-foreground px-1">
            {agentNames[message.agentType]}
          </span>
        )}

        {/* Message Bubble */}
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "glass rounded-bl-md"
          )}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground px-1">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  );
}
