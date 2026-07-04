import { useStudy } from '@/context/StudyContext';
import { roadmapOverview, phases } from '@/data/roadmap';
import {
  Target,
  Flame,
  Trophy,
  Calendar,
  BarChart3,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProgressPage() {
  const { currentDay, completedDays, streakData, getProgress } = useStudy();
  const progress = getProgress();

  // Calculate phase progress
  const phaseProgress = phases.map(phase => {
    const [start, end] = phase.days.split('-').map(Number);
    const total = end - start + 1;
    const completed = Array.from({ length: total }, (_, i) => start + i)
      .filter(d => completedDays[d]).length;
    return { ...phase, total, completed, percentage: Math.round((completed / total) * 100) };
  });

  // Last 30 days heatmap data
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(Date.now() - (29 - i) * 86400000);
    const dateStr = date.toISOString().split('T')[0];
    return {
      date: dateStr,
      studied: !!streakData.history[dateStr],
      day: date.getDate(),
    };
  });

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-dashboard mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-content-primary mb-2">Progress</h1>
        <p className="text-sm text-content-secondary">Track your Java mastery journey.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <div className="bg-surface-secondary rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/50 flex items-center justify-center">
              <Target className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-content-primary">{progress.completedCount}</p>
          <p className="text-xs text-content-muted">Days Completed</p>
        </div>

        <div className="bg-surface-secondary rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-content-primary">{streakData.current}</p>
          <p className="text-xs text-content-muted">Current Streak</p>
        </div>

        <div className="bg-surface-secondary rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-content-primary">{progress.percentage}%</p>
          <p className="text-xs text-content-muted">Overall Progress</p>
        </div>

        <div className="bg-surface-secondary rounded-xl border border-border p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-content-primary">{streakData.longest}</p>
          <p className="text-xs text-content-muted">Longest Streak</p>
        </div>
      </div>

      {/* Overall Progress Ring */}
      <div className="bg-surface-secondary rounded-xl border border-border p-6 mb-8">
        <h3 className="font-semibold text-content-primary mb-6 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-content-muted" />
          Overall Completion
        </h3>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8"
                className="text-surface-tertiary" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8"
                className="text-brand-500"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress.percentage / 100)}`}
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-content-primary">{progress.percentage}%</span>
              <span className="text-xs text-content-muted">{progress.completedCount}/{progress.totalDays}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Study Calendar / Heatmap */}
      <div className="bg-surface-secondary rounded-xl border border-border p-5 mb-8">
        <h3 className="font-semibold text-content-primary mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-content-muted" />
          Last 30 Days
        </h3>
        <div className="grid grid-cols-10 gap-1.5">
          {last30Days.map((day, i) => (
            <div
              key={i}
              className={cn(
                'aspect-square rounded-md flex items-center justify-center text-[10px] font-medium transition-colors',
                day.studied
                  ? 'bg-brand-500 dark:bg-brand-400 text-white'
                  : 'bg-surface-tertiary text-content-muted'
              )}
              title={`${day.date}: ${day.studied ? 'Studied' : 'No study'}`}
            >
              {day.day}
            </div>
          ))}
        </div>
      </div>

      {/* Phase Progress */}
      <div className="bg-surface-secondary rounded-xl border border-border p-5">
        <h3 className="font-semibold text-content-primary mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-content-muted" />
          Phase Progress
        </h3>
        <div className="space-y-4">
          {phaseProgress.map((phase) => (
            <div key={phase.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-content-primary">{phase.name}</span>
                <span className="text-xs text-content-muted">{phase.completed}/{phase.total}</span>
              </div>
              <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                <div
                  className="progress-fill"
                  style={{ width: `${phase.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
