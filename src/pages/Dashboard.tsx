import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentApplications } from '@/components/dashboard/RecentApplications';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { WorkflowStatus } from '@/components/workflow/WorkflowStatus';
import { DocumentUpload } from '@/components/documents/DocumentUpload';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  IndianRupee
} from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Applications"
          value="1,234"
          change={{ value: 12, trend: 'up' }}
          icon={FileText}
          color="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Approved Loans"
          value="892"
          change={{ value: 8, trend: 'up' }}
          icon={CheckCircle2}
          color="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Pending Review"
          value="156"
          change={{ value: 3, trend: 'down' }}
          icon={Clock}
          color="from-orange-500 to-amber-500"
        />
        <StatsCard
          title="Total Disbursed"
          value="₹45.2Cr"
          change={{ value: 15, trend: 'up' }}
          icon={IndianRupee}
          color="from-primary to-accent"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Chat */}
        <div className="xl:col-span-2 h-[550px]">
          <ChatPanel />
        </div>

        {/* Right Column - Workflow & Documents */}
        <div className="space-y-6 h-[550px] overflow-hidden">
          <WorkflowStatus />
          <DocumentUpload />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentApplications />
        <QuickActions />
      </div>
    </div>
  );
}
