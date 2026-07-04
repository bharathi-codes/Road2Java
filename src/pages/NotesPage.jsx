import { useState } from 'react';
import { useStudy } from '@/context/StudyContext';
import { StickyNote, Plus, Trash2, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotesPage() {
  const { notes, addNote, deleteNote } = useStudy();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDay, setNewDay] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAdd = () => {
    if (newTitle.trim() && newContent.trim()) {
      addNote({
        title: newTitle.trim(),
        content: newContent.trim(),
        dayNumber: newDay ? parseInt(newDay) : null,
      });
      setNewTitle('');
      setNewContent('');
      setNewDay('');
      setIsAdding(false);
    }
  };

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-dashboard mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-content-primary mb-1">Notes</h1>
          <p className="text-sm text-content-secondary">Your personal study notes and insights.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Note</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-secondary border border-border text-sm text-content-primary placeholder:text-content-muted focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-content-primary"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Add Note Form */}
      {isAdding && (
        <div className="bg-surface-secondary border border-brand-200 dark:border-brand-800 rounded-xl p-5 mb-6 animate-slide-down">
          <h3 className="font-semibold text-content-primary mb-4">New Note</h3>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Note title..."
            className="w-full px-4 py-2.5 rounded-lg bg-surface-tertiary border border-border text-sm text-content-primary placeholder:text-content-muted mb-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
            autoFocus
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your note..."
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-tertiary border border-border text-sm text-content-primary placeholder:text-content-muted mb-3 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
          />
          <input
            type="number"
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            placeholder="Day number (optional)"
            min={1}
            max={60}
            className="w-full px-4 py-2.5 rounded-lg bg-surface-tertiary border border-border text-sm text-content-primary placeholder:text-content-muted mb-4 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => { setIsAdding(false); setNewTitle(''); setNewContent(''); setNewDay(''); }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-content-secondary hover:bg-surface-tertiary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!newTitle.trim() || !newContent.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Notes List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-tertiary flex items-center justify-center">
            <StickyNote className="w-8 h-8 text-content-muted" />
          </div>
          <h3 className="text-lg font-semibold text-content-primary mb-2">
            {searchQuery ? 'No matching notes' : 'No notes yet'}
          </h3>
          <p className="text-sm text-content-secondary">
            {searchQuery ? 'Try a different search term.' : 'Create your first note to capture insights while studying.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((note) => (
            <div
              key={note.id}
              className="bg-surface-secondary border border-border rounded-xl p-4 hover-lift group"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="font-semibold text-content-primary text-sm">{note.title}</h4>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1 rounded-md text-content-muted hover:text-error hover:bg-red-50 dark:hover:bg-red-950/30 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-sm text-content-secondary line-clamp-3 mb-3">{note.content}</p>
              <div className="flex items-center gap-2">
                {note.dayNumber && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-50 dark:bg-brand-950/50 text-[10px] font-semibold text-brand-600 dark:text-brand-400">
                    Day {note.dayNumber}
                  </span>
                )}
                <span className="text-[10px] text-content-muted">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
