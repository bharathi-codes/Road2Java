import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudy } from '@/context/StudyContext';
import { roadmapOverview } from '@/data/roadmap';
import {
  Target,
  BookOpen,
  List,
  Code2,
  Brain,
  HelpCircle,
  RotateCcw,
  Clock,
  Youtube,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Check,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Section Navigation for the new format
const sections = [
  { id: 'goal', label: 'Goal', icon: Target },
  { id: 'subtopics', label: 'Subtopics', icon: List },
  { id: 'practice', label: 'Practice', icon: Code2 },
  { id: 'logic', label: 'Logic', icon: Brain },
  { id: 'interview', label: 'Interview', icon: HelpCircle },
  { id: 'revision', label: 'Revision', icon: RotateCcw },
  { id: 'video', label: 'Video', icon: Youtube },
];

export default function StudyPage() {
  const { dayNumber } = useParams();
  const navigate = useNavigate();
  const { currentDay, getDayData, completedDays, toggleChecklistItem, checklists, markDayComplete } = useStudy();

  const day = parseInt(dayNumber) || currentDay;
  const dayData = getDayData(day);
  const dayOverview = roadmapOverview.find(d => d.day === day);
  const dayChecklist = checklists[day] || {};
  const isCompleted = !!completedDays[day];

  // Reading progress
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('goal');

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setReadingProgress(Math.min(progress, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when day changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [day]);

  if (!dayData) {
    return (
      <div className="px-4 lg:px-8 py-12 max-w-reading mx-auto text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-tertiary flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-content-muted" />
        </div>
        <h2 className="text-xl font-bold text-content-primary mb-2">Day {day} Content Coming Soon</h2>
        <p className="text-content-secondary mb-6">This day's content hasn't been added yet. Keep studying the available days!</p>
        <button
          onClick={() => navigate(`/study/${currentDay}`)}
          className="px-5 py-2.5 rounded-xl bg-brand-500 text-white font-medium hover:bg-brand-600 transition-colors"
        >
          Go to Current Day
        </button>
      </div>
    );
  }

  const checkedCount = Object.values(dayChecklist).filter(Boolean).length;
  const totalChecklist = dayData.checklist?.length || 0;
  const allChecked = totalChecklist > 0 && checkedCount >= totalChecklist;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
  };

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-surface-tertiary">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-reading mx-auto">
        {/* Day Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => day > 1 && navigate(`/study/${day - 1}`)}
                disabled={day <= 1}
                className="p-1.5 rounded-lg hover:bg-surface-tertiary disabled:opacity-30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-content-muted" />
              </button>
              <span className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/50 text-xs font-semibold text-brand-600 dark:text-brand-400">
                Day {day} of 60
              </span>
              <button
                onClick={() => navigate(`/study/${day + 1}`)}
                className="p-1.5 rounded-lg hover:bg-surface-tertiary transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-content-muted" />
              </button>
            </div>
            
            {dayData.estimatedTime && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-secondary border border-border text-xs font-medium text-content-secondary">
                <Clock className="w-3.5 h-3.5 text-content-muted" />
                ~4-5 hrs total
              </span>
            )}
          </div>

          <h1 className="text-2xl lg:text-3xl font-bold text-content-primary mb-2">
            {dayData.title}
          </h1>
          <p className="text-sm font-medium text-brand-600 dark:text-brand-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Main Topic: {dayData.mainTopic}
          </p>
        </div>

        {/* Section Quick Nav (Desktop) */}
        <div className="hidden lg:flex items-center gap-1 mb-8 p-1 bg-surface-secondary rounded-xl border border-border overflow-x-auto">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors',
                activeSection === id
                  ? 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400'
                  : 'text-content-muted hover:text-content-primary hover:bg-surface-tertiary'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* ═══════ 🎯 GOAL ═══════ */}
        <section id="goal" className="mb-10">
          <div className="p-5 rounded-xl bg-surface-primary border border-border shadow-card">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-content-primary" />
              <h2 className="font-semibold text-content-primary">Goal</h2>
            </div>
            <p className="text-sm text-content-secondary leading-relaxed">
              {dayData.goal}
            </p>
          </div>
        </section>

        {/* ═══════ 📖 SUBTOPICS ═══════ */}
        <section id="subtopics" className="mb-10">
          <h2 className="text-lg font-semibold text-content-primary mb-4 flex items-center gap-2">
            <List className="w-4 h-4 text-content-muted" />
            Subtopics to Cover
          </h2>
          <div className="grid gap-2">
            {dayData.subtopics.map((topic, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-primary border border-border">
                <div className="w-1 h-1 rounded-full bg-content-primary mt-2 flex-shrink-0" />
                <span className="text-sm text-content-secondary">{topic}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ 💻 PRACTICE PROGRAMS ═══════ */}
        <section id="practice" className="mb-10">
          <h2 className="text-lg font-semibold text-content-primary mb-4 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-content-muted" />
            Practice Programs
          </h2>
          <div className="space-y-3">
            {dayData.practicePrograms.map((program, i) => (
              <div key={i} className="flex gap-3 p-4 rounded-lg bg-surface-primary border border-border">
                <span className="font-mono text-xs text-content-muted mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm text-content-secondary">{program}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ 🧠 LOGIC PRACTICE ═══════ */}
        {dayData.logicPractice && dayData.logicPractice.length > 0 && (
          <section id="logic" className="mb-10">
            <h2 className="text-lg font-semibold text-content-primary mb-4 flex items-center gap-2">
              <Brain className="w-4 h-4 text-content-muted" />
              Logic Practice
            </h2>
            <div className="space-y-3">
              {dayData.logicPractice.map((logic, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-lg bg-surface-primary border border-border">
                  <div className="w-1 h-full bg-border flex-shrink-0" />
                  <p className="text-sm text-content-secondary">{logic}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ═══════ ❓ INTERVIEW PREPARATION ═══════ */}
        <section id="interview" className="mb-10">
          <h2 className="text-lg font-semibold text-content-primary mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-content-muted" />
            Interview Preparation
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {dayData.interviewQuestions.map((q, i) => (
              <div key={i} className="p-4 rounded-lg bg-surface-primary border border-border">
                <p className="text-sm text-content-secondary flex gap-2">
                  <span className="text-content-muted font-medium">Q.</span>
                  {q}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ 🔁 REVISION ═══════ */}
        <section id="revision" className="mb-10">
          <h2 className="text-lg font-semibold text-content-primary mb-4 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-content-muted" />
            Revision
          </h2>
          <div className="p-4 rounded-lg bg-surface-primary border border-border border-l-2 border-l-content-muted">
            <p className="text-sm text-content-secondary">
              {dayData.revision}
            </p>
          </div>
        </section>

        {/* ═══════ ⏱ ESTIMATED STUDY TIME ═══════ */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-content-primary mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-content-muted" />
            Time Breakdown
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(dayData.estimatedTime).map(([key, val]) => (
              <div key={key} className="p-4 text-center rounded-xl bg-surface-secondary border border-border">
                <span className="block text-xs text-content-muted uppercase tracking-wider font-semibold mb-1">
                  {key}
                </span>
                <span className="text-sm font-bold text-content-primary">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ YOUTUBE RESOURCE ═══════ */}
        <section id="video" className="mb-10">
          <h2 className="text-lg font-semibold text-content-primary mb-4 flex items-center gap-2">
            <Youtube className="w-4 h-4 text-content-muted" />
            Recommended Video
          </h2>
          <div className="p-5 rounded-xl bg-surface-primary border border-border hover:border-content-muted transition-colors group cursor-pointer shadow-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded bg-surface-tertiary border border-border flex items-center justify-center flex-shrink-0 transition-colors">
                <Youtube className="w-5 h-5 text-content-primary" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-content-muted uppercase tracking-wider mb-1 block">
                  {dayData.youtubeResource.channel}
                </span>
                <h3 className="font-semibold text-content-primary text-sm mb-2 group-hover:text-content-secondary transition-colors">
                  {dayData.youtubeResource.title}
                </h3>
                <p className="text-xs text-content-secondary">
                  <span className="font-medium text-content-primary">Note:</span> {dayData.youtubeResource.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ COMPLETION CHECKLIST ═══════ */}
        <section id="checklist" className="mb-10 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-content-primary flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              Completion Checklist
            </h2>
            <span className="text-sm font-semibold text-content-muted">{checkedCount}/{totalChecklist}</span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden mb-4">
            <div
              className="progress-fill"
              style={{ width: `${totalChecklist > 0 ? (checkedCount / totalChecklist) * 100 : 0}%` }}
            />
          </div>

          <div className="space-y-2">
            {dayData.checklist.map((item) => {
              const isChecked = !!dayChecklist[item.id];
              return (
                <button
                  key={item.id}
                  onClick={() => toggleChecklistItem(day, item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200',
                    isChecked
                      ? 'bg-success-soft border border-success/20 shadow-sm'
                      : 'bg-surface-secondary border border-border hover:border-brand-300 dark:hover:border-brand-700'
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    isChecked
                      ? 'bg-success border-success'
                      : 'border-content-muted'
                  )}>
                    {isChecked && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={cn(
                    'text-sm font-medium transition-all',
                    isChecked ? 'text-content-secondary line-through' : 'text-content-primary'
                  )}>
                    {item.text}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* ═══════ STICKY BOTTOM: MARK COMPLETE ═══════ */}
      <div className="sticky-bottom">
        <div className="max-w-reading mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="text-sm">
            <span className="text-content-muted">Progress: </span>
            <span className="font-semibold text-content-primary">{checkedCount}/{totalChecklist} items</span>
          </div>
          <button
            onClick={() => {
              markDayComplete(day);
              navigate('/');
            }}
            disabled={isCompleted}
            className={cn(
              'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all',
              isCompleted
                ? 'bg-surface-tertiary text-content-muted cursor-default border border-border'
                : allChecked
                  ? 'bg-content-primary text-surface-primary hover:bg-content-secondary border border-transparent'
                  : 'bg-surface-primary text-content-primary border border-border hover:bg-surface-tertiary'
            )}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                <Trophy className="w-4 h-4" />
                Mark Day Complete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
