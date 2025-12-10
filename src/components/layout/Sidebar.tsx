import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Settings, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Wallet,
  History,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: MessageSquare, label: 'Chat', href: '/chat', badge: 2 },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: Wallet, label: 'Loans', href: '/loans' },
  { icon: History, label: 'History', href: '/history' },
];

const bottomNavItems: NavItem[] = [
  { icon: Bell, label: 'Notifications', href: '/notifications', badge: 3 },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: HelpCircle, label: 'Help', href: '/help' },
];

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export function Sidebar({ currentPath = '/', onNavigate }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleNavClick = (path: string) => {
    onNavigate?.(path);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-sidebar-foreground">
              LendFlow
            </span>
          </div>
        )}
        {collapsed && (
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center mx-auto">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed && "absolute -right-3 top-5 h-6 w-6 rounded-full border border-sidebar-border bg-sidebar"
          )}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col h-[calc(100%-4rem)] py-4">
        <div className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="px-3 pt-4 border-t border-sidebar-border space-y-1">
          {bottomNavItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", collapsed && "mx-auto")} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
