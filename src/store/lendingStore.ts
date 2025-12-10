import { create } from 'zustand';
import { 
  Message, 
  Document, 
  WorkflowStep, 
  LoanApplication, 
  AgentType 
} from '@/types/lending';

interface LendingState {
  // Chat state
  messages: Message[];
  isTyping: boolean;
  currentAgent: AgentType | null;
  
  // Documents state
  documents: Document[];
  
  // Workflow state
  workflowSteps: WorkflowStep[];
  currentStep: number;
  
  // Application state
  application: LoanApplication | null;
  
  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setTyping: (isTyping: boolean) => void;
  setCurrentAgent: (agent: AgentType | null) => void;
  
  addDocument: (document: Omit<Document, 'id' | 'uploadedAt'>) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  
  initializeWorkflow: () => void;
  updateWorkflowStep: (agent: AgentType, updates: Partial<WorkflowStep>) => void;
  advanceWorkflow: () => void;
  
  setApplication: (application: LoanApplication | null) => void;
  updateApplication: (updates: Partial<LoanApplication>) => void;
  
  reset: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const initialWorkflowSteps: WorkflowStep[] = [
  { id: '1', agent: 'verification', status: 'pending' },
  { id: '2', agent: 'underwriting', status: 'pending' },
  { id: '3', agent: 'sanction', status: 'pending' },
  { id: '4', agent: 'sales', status: 'pending' },
];

export const useLendingStore = create<LendingState>((set, get) => ({
  messages: [],
  isTyping: false,
  currentAgent: null,
  documents: [],
  workflowSteps: [...initialWorkflowSteps],
  currentStep: 0,
  application: null,

  addMessage: (message) => {
    const newMessage: Message = {
      ...message,
      id: generateId(),
      timestamp: new Date(),
    };
    set((state) => ({ messages: [...state.messages, newMessage] }));
  },

  setTyping: (isTyping) => set({ isTyping }),
  
  setCurrentAgent: (agent) => set({ currentAgent: agent }),

  addDocument: (document) => {
    const newDocument: Document = {
      ...document,
      id: generateId(),
      uploadedAt: new Date(),
    };
    set((state) => ({ documents: [...state.documents, newDocument] }));
    return newDocument;
  },

  updateDocument: (id, updates) => {
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === id ? { ...doc, ...updates } : doc
      ),
    }));
  },

  initializeWorkflow: () => {
    set({ workflowSteps: [...initialWorkflowSteps], currentStep: 0 });
  },

  updateWorkflowStep: (agent, updates) => {
    set((state) => ({
      workflowSteps: state.workflowSteps.map((step) =>
        step.agent === agent ? { ...step, ...updates } : step
      ),
    }));
  },

  advanceWorkflow: () => {
    const { currentStep, workflowSteps } = get();
    if (currentStep < workflowSteps.length - 1) {
      set({ currentStep: currentStep + 1 });
    }
  },

  setApplication: (application) => set({ application }),

  updateApplication: (updates) => {
    set((state) => ({
      application: state.application
        ? { ...state.application, ...updates, updatedAt: new Date() }
        : null,
    }));
  },

  reset: () => {
    set({
      messages: [],
      isTyping: false,
      currentAgent: null,
      documents: [],
      workflowSteps: [...initialWorkflowSteps],
      currentStep: 0,
      application: null,
    });
  },
}));
