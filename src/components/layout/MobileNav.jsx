import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Map, BarChart3, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home' },
  { to: '/study', icon: BookOpen, label: 'Study' },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/progress', icon: BarChart3, label: 'Progress' },
  { to: '/notes', icon: StickyNote, label: 'Notes' },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-secondary/95 backdrop-blur-md border-t border-border mobile-nav">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-150 min-w-[56px]',
                isActive
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-content-muted hover:text-content-secondary'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  'p-1.5 rounded-lg transition-all duration-150',
                  isActive && 'bg-brand-50 dark:bg-brand-950'
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
