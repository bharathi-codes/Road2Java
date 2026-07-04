import { useTheme } from '@/context/ThemeContext';
import { useStudy } from '@/context/StudyContext';
import { useAuth } from '@/context/AuthContext';
import { Moon, Sun, RotateCcw, Coffee, ExternalLink, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { currentDay, startDate, resetProgress, getProgress } = useStudy();
  const { currentUser, logout } = useAuth();
  const progress = getProgress();

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-reading mx-auto">
      <h1 className="text-2xl font-bold text-content-primary mb-6">Settings</h1>

      {/* Profile Card */}
      <div className="bg-surface-secondary border border-border rounded-xl p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-lg bg-content-primary flex items-center justify-center overflow-hidden shadow-sm">
            {currentUser?.photoURL ? (
              <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <Coffee className="w-6 h-6 text-surface-primary" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-content-primary text-lg">
              {currentUser?.displayName || 'JavaPrep Student'}
            </h3>
            <p className="text-sm text-content-secondary">
              {currentUser?.email || '60-Day Java Mastery Bootcamp'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded border border-border text-center">
            <p className="text-lg font-semibold text-content-primary">Day {currentDay}</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-content-muted">Current</p>
          </div>
          <div className="p-3 rounded border border-border text-center">
            <p className="text-lg font-semibold text-content-primary">{progress.completedCount}</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-content-muted">Completed</p>
          </div>
          <div className="p-3 rounded border border-border text-center">
            <p className="text-lg font-semibold text-content-primary">{progress.percentage}%</p>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-content-muted">Progress</p>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-surface-secondary border border-border rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-content-primary mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon className="w-5 h-5 text-content-muted" /> : <Sun className="w-5 h-5 text-content-muted" />}
            <div>
              <p className="text-sm font-medium text-content-primary">Theme</p>
              <p className="text-xs text-content-muted">Currently {theme === 'dark' ? 'dark' : 'light'} mode</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors duration-200 focus-visible:ring-2',
              theme === 'dark' ? 'bg-content-primary' : 'bg-surface-tertiary border border-border'
            )}
          >
            <div className={cn(
              'absolute top-0.5 w-5 h-5 rounded-full bg-surface-primary shadow-sm transition-all duration-200',
              theme === 'dark' ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'
            )} />
          </button>
        </div>
      </div>

      {/* About */}
      <div className="bg-surface-secondary border border-border rounded-xl p-5 mb-6">
        <h3 className="font-semibold text-content-primary mb-4">About</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-content-secondary">Version</span>
            <span className="text-sm font-medium text-content-primary">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-content-secondary">Started</span>
            <span className="text-sm font-medium text-content-primary">
              {startDate ? new Date(startDate).toLocaleDateString() : 'Not started'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-content-secondary">Total Days</span>
            <span className="text-sm font-medium text-content-primary">60</span>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-surface-primary border border-border rounded-xl p-5 shadow-card">
        <h3 className="font-semibold text-content-primary mb-2">Account Actions</h3>
        
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-content-secondary">Sign out of your account on this device.</p>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded border border-border text-sm font-medium hover:bg-surface-tertiary transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          <div className="h-px bg-border my-2" />

          <div>
            <p className="text-sm text-content-secondary mb-3">
              Reset all progress, streaks, checklists, and notes. This cannot be undone.
            </p>
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium bg-surface-primary border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
