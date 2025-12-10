import { useState, useRef, KeyboardEvent } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload?: (files: FileList) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSend, 
  onFileUpload, 
  disabled = false,
  placeholder = "Type your message..." 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onFileUpload) {
      onFileUpload(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="flex items-end gap-2">
        {/* File Upload */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFileClick}
          disabled={disabled}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className={cn(
              "w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 pr-12 text-sm",
              "placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "max-h-[150px] min-h-[48px]"
            )}
          />
        </div>

        {/* Voice Input */}
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Mic className="h-5 w-5" />
        </Button>

        {/* Send Button */}
        <Button
          variant="gradient"
          size="icon"
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
