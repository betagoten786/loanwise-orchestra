import { useEffect, useRef } from 'react';
import { useLendingStore } from '@/store/lendingStore';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { Card } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export function ChatPanel() {
  const { messages, isTyping, currentAgent, addMessage, setTyping, setCurrentAgent } = useLendingStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage({ role: 'user', content });

    // Simulate agent response
    setTyping(true);
    setCurrentAgent('sales');

    // Simulate response delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setTyping(false);
    
    // Simulate different agent responses based on content
    let response = '';
    let agent = currentAgent;

    if (content.toLowerCase().includes('document') || content.toLowerCase().includes('upload')) {
      agent = 'verification';
      response = "I'd be happy to help you with document verification! Please upload your documents using the upload button, and I'll process them right away. We accept PAN cards, Aadhaar, bank statements, and salary slips.";
    } else if (content.toLowerCase().includes('loan') || content.toLowerCase().includes('amount')) {
      agent = 'underwriting';
      response = "Based on your profile, I'm analyzing your loan eligibility. Our underwriting team will review your income documents, credit history, and other factors to determine the best loan amount and interest rate for you.";
    } else if (content.toLowerCase().includes('status') || content.toLowerCase().includes('progress')) {
      agent = 'sales';
      response = "Your application is progressing well! You can track the real-time status in the workflow panel on the right. Currently, we're processing your verification stage. Is there anything specific you'd like to know?";
    } else {
      agent = 'sales';
      response = "Welcome to LendFlow! I'm here to assist you with your loan application. You can start by telling me about the loan amount you're looking for, or upload your documents (PAN, Aadhaar, bank statements) to begin the verification process.";
    }

    addMessage({ 
      role: 'assistant', 
      content: response,
      agentType: agent ?? 'sales'
    });
    setCurrentAgent(null);
  };

  const handleFileUpload = (files: FileList) => {
    const fileNames = Array.from(files).map(f => f.name).join(', ');
    addMessage({ 
      role: 'system', 
      content: `Documents uploaded: ${fileNames}` 
    });
    
    // Simulate verification agent processing
    setTyping(true);
    setCurrentAgent('verification');
    
    setTimeout(() => {
      setTyping(false);
      addMessage({
        role: 'assistant',
        content: `I've received your documents and started the verification process. I'll extract the relevant information and validate the documents. This usually takes 1-2 minutes. You'll see the progress in the workflow panel.`,
        agentType: 'verification'
      });
      setCurrentAgent(null);
    }, 2000);
  };

  return (
    <Card variant="glass" className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-display font-semibold">Loan Assistant</h2>
          <p className="text-xs text-muted-foreground">AI-powered lending support</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 animate-float">
              <MessageSquare className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Start Your Loan Journey</h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              Chat with our AI agents to apply for a loan. Upload documents, get instant verification, and receive quick approvals.
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator agentType={currentAgent ?? undefined} />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput 
        onSend={handleSendMessage}
        onFileUpload={handleFileUpload}
        disabled={isTyping}
      />
    </Card>
  );
}
