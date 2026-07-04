import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { roadmapData } from '@/data/roadmap';

const StudyContext = createContext();

const INITIAL_STATE = {
  currentDay: 1,
  startDate: new Date().toISOString().split('T')[0],
  completedDays: {},
  checklists: {},
  notes: [],
  bookmarks: [],
  streakData: {
    current: 0,
    longest: 0,
    lastStudyDate: null,
    history: {},
  },
};

export function StudyProvider({ children }) {
  const { currentUser } = useAuth();
  const [state, setState] = useState(INITIAL_STATE);
  const [loadingStudyData, setLoadingStudyData] = useState(true);

  // Fetch or initialize data from Firestore when user logs in
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!currentUser) {
        if (isMounted) {
          setState(INITIAL_STATE);
          setLoadingStudyData(false);
        }
        return;
      }

      setLoadingStudyData(true);
      try {
        const docRef = doc(db, 'users', currentUser.uid, 'studyData', 'progress');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (isMounted) setState(data);
        } else {
          // Initialize new user
          await setDoc(docRef, INITIAL_STATE);
          if (isMounted) setState(INITIAL_STATE);
        }
      } catch (error) {
        console.error('Error loading study data from Firestore:', error);
      } finally {
        if (isMounted) setLoadingStudyData(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  // Helper to sync state to Firestore
  const syncToFirestore = async (newState) => {
    if (!currentUser) return;
    try {
      // Create/update the main user document to prevent "ghost" documents in console
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        email: currentUser.email,
        displayName: currentUser.displayName,
        lastActive: new Date().toISOString(),
      }, { merge: true });

      // Save the actual study data
      const docRef = doc(db, 'users', currentUser.uid, 'studyData', 'progress');
      await setDoc(docRef, newState, { merge: true });
    } catch (error) {
      console.error('Error syncing to Firestore:', error);
    }
  };

  // Calculate streak on mount/load
  useEffect(() => {
    if (loadingStudyData || !currentUser) return;

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const { lastStudyDate, current } = state.streakData;
    if (lastStudyDate && lastStudyDate !== today && lastStudyDate !== yesterday && current > 0) {
      // Streak broken
      const newState = {
        ...state,
        streakData: {
          ...state.streakData,
          current: 0,
        },
      };
      setState(newState);
      syncToFirestore(newState);
    }
  }, [loadingStudyData, currentUser, state.streakData.lastStudyDate]);

  const markDayComplete = useCallback((dayNumber) => {
    const today = new Date().toISOString().split('T')[0];

    setState(prev => {
      const newStreakCurrent = prev.streakData.lastStudyDate === today
        ? prev.streakData.current
        : prev.streakData.current + 1;

      const newState = {
        ...prev,
        completedDays: {
          ...prev.completedDays,
          [dayNumber]: {
            completedAt: new Date().toISOString(),
            date: today,
          },
        },
        currentDay: Math.max(prev.currentDay, dayNumber + 1),
        streakData: {
          ...prev.streakData,
          current: newStreakCurrent,
          longest: Math.max(prev.streakData.longest, newStreakCurrent),
          lastStudyDate: today,
          history: {
            ...prev.streakData.history,
            [today]: dayNumber,
          },
        },
      };
      
      syncToFirestore(newState);
      return newState;
    });
  }, [currentUser]);

  const toggleChecklistItem = useCallback((dayNumber, itemId) => {
    setState(prev => {
      const dayChecklist = prev.checklists[dayNumber] || {};
      const newState = {
        ...prev,
        checklists: {
          ...prev.checklists,
          [dayNumber]: {
            ...dayChecklist,
            [itemId]: !dayChecklist[itemId],
          },
        },
      };
      syncToFirestore(newState);
      return newState;
    });
  }, [currentUser]);

  const addNote = useCallback((note) => {
    setState(prev => {
      const newState = {
        ...prev,
        notes: [
          { id: Date.now(), createdAt: new Date().toISOString(), ...note },
          ...prev.notes,
        ],
      };
      syncToFirestore(newState);
      return newState;
    });
  }, [currentUser]);

  const deleteNote = useCallback((noteId) => {
    setState(prev => {
      const newState = {
        ...prev,
        notes: prev.notes.filter(n => n.id !== noteId),
      };
      syncToFirestore(newState);
      return newState;
    });
  }, [currentUser]);

  const toggleBookmark = useCallback((dayNumber, sectionId, title) => {
    setState(prev => {
      let newBookmarks;
      const exists = prev.bookmarks.find(
        b => b.dayNumber === dayNumber && b.sectionId === sectionId
      );
      if (exists) {
        newBookmarks = prev.bookmarks.filter(b => b.id !== exists.id);
      } else {
        newBookmarks = [
          ...prev.bookmarks,
          { id: Date.now(), dayNumber, sectionId, title, createdAt: new Date().toISOString() },
        ];
      }
      
      const newState = { ...prev, bookmarks: newBookmarks };
      syncToFirestore(newState);
      return newState;
    });
  }, [currentUser]);

  const resetProgress = useCallback(() => {
    if (window.confirm('Are you sure? This will reset ALL your progress in the cloud. This cannot be undone.')) {
      const newState = { ...INITIAL_STATE, startDate: new Date().toISOString().split('T')[0] };
      setState(newState);
      syncToFirestore(newState);
    }
  }, [currentUser]);

  const getDayData = useCallback((dayNumber) => {
    return roadmapData[dayNumber] || null;
  }, []);

  const getProgress = useCallback(() => {
    const totalDays = Object.keys(roadmapData).length;
    const completedCount = Object.keys(state.completedDays).length;
    return {
      totalDays,
      completedCount,
      percentage: totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0,
    };
  }, [state.completedDays]);

  const getChecklistProgress = useCallback((dayNumber) => {
    const dayData = roadmapData[dayNumber];
    if (!dayData || !dayData.checklist) return { total: 0, completed: 0, percentage: 0 };
    const total = dayData.checklist.length;
    const dayChecklist = state.checklists[dayNumber] || {};
    const completed = Object.values(dayChecklist).filter(Boolean).length;
    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [state.checklists]);

  const value = {
    ...state,
    loadingStudyData,
    markDayComplete,
    toggleChecklistItem,
    addNote,
    deleteNote,
    toggleBookmark,
    resetProgress,
    getDayData,
    getProgress,
    getChecklistProgress,
  };

  return (
    <StudyContext.Provider value={value}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}
