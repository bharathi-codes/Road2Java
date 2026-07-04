import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { StudyProvider } from '@/context/StudyContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from '@/components/layout/AuthLayout';

// Lazy-load pages for performance
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const StudyPage = lazy(() => import('@/pages/StudyPage'));
const RoadmapPage = lazy(() => import('@/pages/RoadmapPage'));
const ProgressPage = lazy(() => import('@/pages/ProgressPage'));
const NotesPage = lazy(() => import('@/pages/NotesPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const SignupPage = lazy(() => import('@/pages/SignupPage'));

// Loading skeleton
function PageLoader() {
  return (
    <div className="px-4 lg:px-8 py-8 max-w-dashboard mx-auto animate-pulse">
      <div className="h-8 w-48 bg-surface-tertiary rounded-lg mb-4" />
      <div className="h-4 w-72 bg-surface-tertiary rounded-lg mb-8" />
      <div className="h-40 bg-surface-tertiary rounded-2xl mb-6" />
      <div className="grid grid-cols-3 gap-3">
        <div className="h-24 bg-surface-tertiary rounded-xl" />
        <div className="h-24 bg-surface-tertiary rounded-xl" />
        <div className="h-24 bg-surface-tertiary rounded-xl" />
      </div>
    </div>
  );
}

// Protected Route Wrapper
function ProtectedRoute() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

// Public Route Wrapper (redirects logged in users to dashboard)
function PublicRoute() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StudyProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                
                {/* Public Auth Routes */}
                <Route element={<PublicRoute />}>
                  <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                  </Route>
                </Route>

                {/* Protected App Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<AppLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="study" element={<Navigate to="/study/1" replace />} />
                    <Route path="study/:dayNumber" element={<StudyPage />} />
                    <Route path="roadmap" element={<RoadmapPage />} />
                    <Route path="progress" element={<ProgressPage />} />
                    <Route path="notes" element={<NotesPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </StudyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
