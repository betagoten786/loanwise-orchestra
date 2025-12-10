import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from './Dashboard';

const Index = () => {
  const [currentPath, setCurrentPath] = useState('/');

  const getPageTitle = () => {
    switch (currentPath) {
      case '/': return 'Dashboard';
      case '/chat': return 'Chat';
      case '/documents': return 'Documents';
      case '/loans': return 'Loans';
      case '/history': return 'History';
      case '/notifications': return 'Notifications';
      case '/settings': return 'Settings';
      case '/help': return 'Help Center';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-primary/5 pointer-events-none" />
      <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary/10 to-transparent pointer-events-none blur-3xl" />
      
      {/* Sidebar */}
      <Sidebar currentPath={currentPath} onNavigate={setCurrentPath} />

      {/* Main Content */}
      <main className="ml-64 transition-all duration-300 min-h-screen">
        <Header title={getPageTitle()} />
        <div className="p-6">
          <Dashboard />
        </div>
      </main>
    </div>
  );
};

export default Index;
