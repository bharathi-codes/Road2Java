import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Moon, Sun, Coffee } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useStudy } from '@/context/StudyContext';

const pageTitles = {
  '/': 'Dashboard',
  '/study': "Today's Study",
  '/roadmap': 'Roadmap',
  '/progress': 'Progress',
  '/notes': 'Notes',
  '/settings': 'Settings',
};

export default function TopBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { streakData } = useStudy();

  // Get page title from current path
  const pathBase = '/' + (location.pathname.split('/')[1] || '');
  const title = pageTitles[pathBase] || 'JavaPrep';

  useEffect(() => {
    document.title = `${title} — Java Mastery Bootcamp`;
  }, [title]);

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-surface-primary border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-content-primary flex items-center justify-center shadow-sm">
            <Coffee className="w-4 h-4 text-surface-primary" />
          </div>
          <h1 className="font-semibold text-content-primary text-base">{title}</h1>
        </div>

        {/* Right: Streak + Theme */}
        <div className="flex items-center gap-2">
          {streakData.current > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-tertiary border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-content-primary"></span>
              <span className="text-xs font-semibold text-content-primary">
                {streakData.current}
              </span>
            </div>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-tertiary transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
