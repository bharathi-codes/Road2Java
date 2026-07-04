import { useState, createContext, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import TopBar from './TopBar';
import { useStudy } from '@/context/StudyContext';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SidebarContext = createContext({ collapsed: false });
export const useSidebar = () => useContext(SidebarContext);

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { loadingStudyData } = useStudy();

  if (loadingStudyData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-primary">
        <div className="w-16 h-16 border border-border rounded-xl flex items-center justify-center animate-pulse mb-4 shadow-card">
          <BookOpen className="w-6 h-6 text-content-primary" />
        </div>
        <p className="text-sm text-content-secondary font-medium animate-pulse">Syncing your workspace...</p>
      </div>
    );
  }

  return (
    <SidebarContext.Provider value={{ collapsed: sidebarCollapsed }}>
      <div className="min-h-screen bg-surface-primary">
        {/* Desktop Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div
          className={cn(
            'min-h-screen transition-all duration-300',
            sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
          )}
        >
          {/* Mobile Top Bar */}
          <TopBar />

          {/* Page Content */}
          <main className="pb-20 lg:pb-6">
            <div className="animate-fade-in">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Mobile Bottom Nav */}
        <MobileNav />
      </div>
    </SidebarContext.Provider>
  );
}
