export type AgentType = 
  | 'verification'
  | 'underwriting'
  | 'sanction'
  | 'negotiation'
  | 'sales';

export type WorkflowStatus = 
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'failed'
  | 'awaiting_input';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  agentType?: AgentType;
  metadata?: Record<string, unknown>;
}

export interface Document {
  id: string;
  name: string;
  type: 'pan' | 'aadhaar' | 'bank_statement' | 'salary_slip' | 'other';
  status: 'uploading' | 'processing' | 'verified' | 'failed';
  uploadedAt: Date;
  extractedData?: Record<string, unknown>;
  verificationResult?: {
    isValid: boolean;
    confidence: number;
    issues?: string[];
  };
}

export interface WorkflowStep {
  id: string;
  agent: AgentType;
  status: WorkflowStatus;
  startedAt?: Date;
  completedAt?: Date;
  result?: Record<string, unknown>;
  error?: string;
}

export interface LoanApplication {
  id: string;
  userId: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'disbursed';
  requestedAmount: number;
  approvedAmount?: number;
  interestRate?: number;
  tenure?: number;
  documents: Document[];
  workflowSteps: WorkflowStep[];
  riskScore?: number;
  creditScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatSession {
  id: string;
  applicationId: string;
  messages: Message[];
  currentAgent?: AgentType;
  isTyping: boolean;
}

export interface VerificationResult {
  documentId: string;
  isValid: boolean;
  extractedFields: {
    name?: string;
    documentNumber?: string;
    dateOfBirth?: string;
    address?: string;
    income?: number;
    accountNumber?: string;
    [key: string]: unknown;
  };
  confidence: number;
  issues: string[];
}

export interface UnderwritingResult {
  applicationId: string;
  riskScore: number;
  creditScore: number;
  eligibleAmount: number;
  recommendedInterestRate: number;
  recommendedTenure: number;
  factors: {
    positive: string[];
    negative: string[];
  };
  decision: 'approve' | 'reject' | 'manual_review';
}

export interface SanctionLetter {
  applicationId: string;
  sanctionNumber: string;
  borrowerName: string;
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  sanctionDate: Date;
  validUntil: Date;
  termsAndConditions: string[];
}
