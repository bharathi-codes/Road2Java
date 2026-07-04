import { useNavigate } from 'react-router-dom';
import { useStudy } from '@/context/StudyContext';
import { roadmapOverview, phases } from '@/data/roadmap';
import { CheckCircle2, Lock, Play, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RoadmapPage() {
  const navigate = useNavigate();
  const { currentDay, completedDays } = useStudy();

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-dashboard mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-content-primary mb-2">60-Day Roadmap</h1>
        <p className="text-sm text-content-secondary">
          Your complete Java mastery journey. Each week builds on the previous one.
        </p>
      </div>

      {/* Phase Overview */}
      <div className="flex flex-wrap gap-2 mb-8">
        {phases.map((phase) => (
          <span
            key={phase.name}
            className="px-3 py-1.5 rounded-lg bg-surface-secondary border border-border text-xs font-medium text-content-secondary"
          >
            {phase.name} <span className="text-content-muted">({phase.days})</span>
          </span>
        ))}
      </div>

      {/* Day Grid by Weeks */}
      {Array.from({ length: 9 }, (_, weekIdx) => {
        const week = weekIdx + 1;
        const weekDays = roadmapOverview.filter(d => d.week === week);
        if (weekDays.length === 0) return null;
        const phase = weekDays[0].phase;

        return (
          <div key={week} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-base font-bold text-content-primary">Week {week}</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/50 text-xs font-medium text-brand-600 dark:text-brand-400">
                {phase}
              </span>
            </div>

            <div className="grid gap-2">
              {weekDays.map((day) => {
                const isCompleted = !!completedDays[day.day];
                const isCurrent = day.day === currentDay;
                const isLocked = day.day > currentDay && !isCompleted;

                return (
                  <button
                    key={day.day}
                    onClick={() => {
                      if (!isLocked || isCompleted) {
                        navigate(`/study/${day.day}`);
                      }
                    }}
                    disabled={isLocked}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200',
                      isCompleted && 'bg-success-soft border-success/30 hover:shadow-card',
                      isCurrent && !isCompleted && 'bg-brand-50 dark:bg-brand-950/30 border-brand-300 dark:border-brand-700 hover:shadow-card shadow-glow',
                      isLocked && 'bg-surface-tertiary/50 border-border opacity-60 cursor-not-allowed',
                      !isCompleted && !isCurrent && !isLocked && 'bg-surface-secondary border-border hover:shadow-card hover:border-brand-200 dark:hover:border-brand-800'
                    )}
                  >
                    {/* Status Icon */}
                    <div className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      isCompleted && 'bg-success/10',
                      isCurrent && !isCompleted && 'bg-brand-100 dark:bg-brand-900/30',
                      isLocked && 'bg-surface-tertiary',
                      !isCompleted && !isCurrent && !isLocked && 'bg-surface-tertiary'
                    )}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : isCurrent ? (
                        <Play className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                      ) : isLocked ? (
                        <Lock className="w-4 h-4 text-content-muted" />
                      ) : (
                        <BookOpen className="w-5 h-5 text-content-muted" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={cn(
                          'text-xs font-bold',
                          isCompleted ? 'text-success' :
                          isCurrent ? 'text-brand-600 dark:text-brand-400' :
                          'text-content-muted'
                        )}>
                          Day {day.day}
                        </span>
                        {isCurrent && !isCompleted && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-brand-500 text-white animate-pulse-soft">
                            CURRENT
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        'text-sm font-medium truncate',
                        isLocked ? 'text-content-muted' : 'text-content-primary'
                      )}>
                        {day.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
