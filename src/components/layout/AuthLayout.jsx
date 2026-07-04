import { Outlet } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-primary p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-content-primary rounded flex items-center justify-center shadow-card">
            <BookOpen className="w-6 h-6 text-surface-primary" />
          </div>
        </div>
        <div className="bg-surface-primary border border-border rounded-lg shadow-card p-6 sm:p-8">
          <Outlet />
        </div>
        <p className="text-center text-xs text-content-muted mt-8">
          JavaPrep &copy; {new Date().getFullYear()} - Your Personal Study Platform
        </p>
      </div>
    </div>
  );
}
