import { useState, useCallback } from 'react';
import { useLendingStore } from '@/store/lendingStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Document } from '@/types/lending';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  X,
  CreditCard,
  User,
  Building2,
  Receipt
} from 'lucide-react';
import { cn } from '@/lib/utils';

const documentTypeConfig = {
  pan: { icon: CreditCard, label: 'PAN Card', color: 'from-blue-500 to-indigo-500' },
  aadhaar: { icon: User, label: 'Aadhaar Card', color: 'from-orange-500 to-red-500' },
  bank_statement: { icon: Building2, label: 'Bank Statement', color: 'from-green-500 to-emerald-500' },
  salary_slip: { icon: Receipt, label: 'Salary Slip', color: 'from-purple-500 to-pink-500' },
  other: { icon: FileText, label: 'Other Document', color: 'from-gray-500 to-slate-500' },
};

const statusConfig = {
  uploading: { icon: Loader2, label: 'Uploading...', className: 'text-primary animate-spin' },
  processing: { icon: Loader2, label: 'Processing...', className: 'text-warning animate-spin' },
  verified: { icon: CheckCircle2, label: 'Verified', className: 'text-success' },
  failed: { icon: AlertCircle, label: 'Failed', className: 'text-destructive' },
};

export function DocumentUpload() {
  const { documents, addDocument, updateDocument } = useLendingStore();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      // Determine document type based on filename
      let type: Document['type'] = 'other';
      const name = file.name.toLowerCase();
      if (name.includes('pan')) type = 'pan';
      else if (name.includes('aadhaar') || name.includes('aadhar')) type = 'aadhaar';
      else if (name.includes('bank') || name.includes('statement')) type = 'bank_statement';
      else if (name.includes('salary') || name.includes('slip')) type = 'salary_slip';

      const doc = addDocument({
        name: file.name,
        type,
        status: 'uploading',
      });

      // Simulate upload and processing
      setTimeout(() => {
        updateDocument(doc.id, { status: 'processing' });
        
        setTimeout(() => {
          const success = Math.random() > 0.1; // 90% success rate
          updateDocument(doc.id, { 
            status: success ? 'verified' : 'failed',
            verificationResult: success ? {
              isValid: true,
              confidence: 0.95,
              issues: [],
            } : {
              isValid: false,
              confidence: 0.3,
              issues: ['Document quality too low', 'Unable to extract text'],
            }
          });
        }, 2000);
      }, 1000);
    });
  };

  return (
    <Card variant="glass" className="flex-1 min-h-0 flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center">
            <Upload className="h-4 w-4 text-primary" />
          </div>
          Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 overflow-auto space-y-3 pb-4">
        {/* Upload Area */}
        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
            isDragging 
              ? "border-primary bg-primary/10" 
              : "border-border hover:border-primary/50 hover:bg-secondary/50"
          )}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileInput}
            className="hidden"
          />
          <Upload className={cn(
            "h-6 w-6 mb-1.5 transition-colors",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
          <p className="text-xs font-medium text-center">
            Drop files or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            PAN, Aadhaar, Bank Statements
          </p>
        </label>

        {/* Document List */}
        {documents.length > 0 && (
          <div className="space-y-2">
            {documents.slice(0, 3).map(doc => {
              const typeConfig = documentTypeConfig[doc.type];
              const status = statusConfig[doc.status];
              
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 animate-fade-in"
                >
                  <div className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-gradient-to-br",
                    typeConfig.color
                  )}>
                    <typeConfig.icon className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{doc.name}</p>
                    <div className="flex items-center gap-1">
                      <status.icon className={cn("h-3 w-3", status.className)} />
                      <span className={cn("text-xs", status.className)}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                  {doc.status !== 'uploading' && doc.status !== 'processing' && (
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              );
            })}
            {documents.length > 3 && (
              <p className="text-xs text-muted-foreground text-center">
                +{documents.length - 3} more documents
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
