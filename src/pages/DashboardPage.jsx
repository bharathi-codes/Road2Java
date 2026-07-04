import { useNavigate } from 'react-router-dom';
import { useStudy } from '@/context/StudyContext';
import { getQuoteOfTheDay } from '@/data/quotes';
import { roadmapOverview } from '@/data/roadmap';
import {
  BookOpen,
  Flame,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    currentDay,
    completedDays,
    streakData,
    getProgress,
    getChecklistProgress,
    getDayData,
  } = useStudy();

  const quote = getQuoteOfTheDay();
  const progress = getProgress();
  const todayData = getDayData(currentDay);
  const todayOverview = roadmapOverview.find(d => d.day === currentDay);
  const checklistProgress = getChecklistProgress(currentDay);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Last 7 days study activity
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.now() - (6 - i) * 86400000);
    const dateStr = date.toISOString().split('T')[0];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return {
      label: dayNames[date.getDay()],
      studied: !!streakData.history[dateStr],
      date: dateStr,
    };
  });

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-dashboard mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-content-primary mb-1">
          {greeting()}
        </h1>
        <div className="flex items-start gap-2 mt-3">
          <p className="text-sm text-content-secondary border-l-2 border-content-muted pl-3">
            "{quote.text}" — <span className="font-medium text-content-primary">{quote.author}</span>
          </p>
        </div>
      </div>

      {/* Today's Lesson — Hero Card */}
      <button
        onClick={() => navigate(`/study/${currentDay}`)}
        className="w-full mb-8 group text-left"
      >
        <div className="relative overflow-hidden rounded-xl bg-surface-secondary p-6 lg:p-8 hover-lift shadow-card border border-border">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-surface-primary text-xs font-semibold tracking-wide uppercase border border-border">
                Day {currentDay} of 60
              </span>
              {todayOverview && (
                <span className="px-2.5 py-1 rounded-md bg-surface-primary text-xs font-semibold tracking-wide uppercase border border-border">
                  {todayOverview.phase}
                </span>
              )}
            </div>

            <h2 className="text-xl lg:text-2xl font-semibold mb-2 text-content-primary">
              {todayOverview?.title || `Day ${currentDay}`}
            </h2>

            {todayData && (
              <p className="text-sm text-content-secondary mb-6 max-w-lg">
                {todayData.goal}
              </p>
            )}

            <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all">
              <BookOpen className="w-4 h-4" />
              <span>{completedDays[currentDay] ? 'Review Lesson' : 'Continue Studying'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Progress bar at bottom */}
          {checklistProgress.total > 0 && (
            <div className="relative z-10 mt-6">
              <div className="flex justify-between text-xs text-content-secondary mb-2 font-medium tracking-wide uppercase">
                <span>Progress</span>
                <span>{checklistProgress.percentage}%</span>
              </div>
              <div className="h-1 bg-surface-tertiary rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-content-primary rounded-full transition-all duration-700"
                  style={{ width: `${checklistProgress.percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </button>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-8">
        {/* Current Day */}
        <div className="bg-surface-primary rounded-xl border border-border p-4 text-center hover-lift shadow-card">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-content-muted mb-2">Current</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Target className="w-4 h-4 text-content-primary" />
            <p className="text-2xl font-semibold text-content-primary">{currentDay}</p>
          </div>
        </div>

        {/* Streak */}
        <div className="bg-surface-primary rounded-xl border border-border p-4 text-center hover-lift shadow-card">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-content-muted mb-2">Streak</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-content-primary" />
            <p className="text-2xl font-semibold text-content-primary">
              {streakData.current}
            </p>
          </div>
        </div>

        {/* Completion */}
        <div className="bg-surface-primary rounded-xl border border-border p-4 text-center hover-lift shadow-card">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-content-muted mb-2">Complete</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-content-primary" />
            <p className="text-2xl font-semibold text-content-primary">{progress.percentage}%</p>
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-surface-primary rounded-xl border border-border p-5 mb-8 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-content-primary">
            Weekly Activity
          </h3>
          <span className="text-xs font-medium text-content-secondary bg-surface-tertiary px-2 py-1 rounded">
            {last7Days.filter(d => d.studied).length}/7 days
          </span>
        </div>
        <div className="flex items-end gap-2 justify-between">
          {last7Days.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-3 flex-1">
              <div
                className={cn(
                  'w-full max-w-[32px] rounded-sm transition-all duration-300 border',
                  day.studied
                    ? 'bg-content-primary border-content-primary h-12'
                    : 'bg-surface-tertiary border-border h-4'
                )}
              />
              <span className={cn(
                'text-[10px] font-medium',
                day.studied ? 'text-content-primary' : 'text-content-muted'
              )}>
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Checklist Preview */}
      {todayData && todayData.checklist && (
        <div className="bg-surface-primary rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-content-primary">
              Checklist Preview
            </h3>
            <span className="text-xs font-medium text-content-secondary bg-surface-tertiary px-2 py-1 rounded">
              {checklistProgress.completed}/{checklistProgress.total}
            </span>
          </div>
          <div className="space-y-1">
            {todayData.checklist.slice(0, 5).map((item) => {
              const isChecked = false; // Will wire up with context
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-2 rounded text-sm text-content-secondary"
                >
                  <div className="mt-0.5">
                    <div className="w-4 h-4 rounded-sm border border-border flex items-center justify-center">
                    </div>
                  </div>
                  <span className="truncate">{item.text}</span>
                </div>
              );
            })}
            {todayData.checklist.length > 5 && (
              <button
                onClick={() => navigate(`/study/${currentDay}`)}
                className="text-xs font-medium text-content-primary hover:text-content-secondary mt-3 pl-2 transition-colors"
              >
                View {todayData.checklist.length - 5} more items →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
