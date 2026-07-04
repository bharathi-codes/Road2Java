import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Map,
  BarChart3,
  StickyNote,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Coffee,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useStudy } from '@/context/StudyContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/study', icon: BookOpen, label: "Today's Study" },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
  { to: '/notes', icon: StickyNote, label: 'Notes' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { theme, toggleTheme } = useTheme();
  const { currentDay, streakData } = useStudy();
  const { currentUser, logout } = useAuth();

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-0 h-screen z-50',
        'bg-surface-secondary border-r border-border transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center h-16 px-4 border-b border-border',
        collapsed ? 'justify-center' : 'gap-3'
      )}>
        <div className="w-8 h-8 rounded-lg bg-content-primary flex items-center justify-center flex-shrink-0 shadow-sm">
          <Coffee className="w-4 h-4 text-surface-primary" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in overflow-hidden">
            <h1 className="font-bold text-content-primary text-base truncate">JavaPrep</h1>
            <p className="text-xs text-content-muted truncate">{currentUser?.displayName || currentUser?.email || 'Student'}</p>
          </div>
        )}
      </div>

      {/* Current Day Badge */}
      {!collapsed && (
        <div className="mx-4 mt-6 p-3 rounded-lg bg-surface-primary border border-border animate-fade-in shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-content-muted mb-1">Bootcamp Progress</p>
          <p className="text-sm font-bold text-content-primary">Day {currentDay} of 60</p>
          {streakData.current > 0 && (
            <p className="text-xs text-content-secondary mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-content-primary"></span>
              {streakData.current} day streak
            </p>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-6 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'nav-active'
                  : 'text-content-secondary hover:text-content-primary hover:bg-surface-tertiary'
              )
            }
            title={collapsed ? label : undefined}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="animate-fade-in">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 pb-4 space-y-2 border-t border-border pt-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium',
            'text-content-secondary hover:text-content-primary hover:bg-surface-tertiary transition-all duration-150',
            collapsed && 'justify-center px-2'
          )}
          title={collapsed ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode` : undefined}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 flex-shrink-0" />
          ) : (
            <Moon className="w-5 h-5 flex-shrink-0" />
          )}
          {!collapsed && (
            <span className="animate-fade-in">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          )}
        </button>

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium',
            'text-content-secondary hover:text-content-primary hover:bg-surface-tertiary transition-all duration-150',
            collapsed && 'justify-center px-2'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
