import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Chrome, Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleEmailLogin(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await loginWithEmail(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to sign in with Google.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-content-primary">Welcome Back</h1>
        <p className="text-sm text-content-secondary mt-1">Ready to continue your Java journey?</p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
        </div>
      )}

      {/* Primary Action: Google Login */}
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-md bg-surface-primary border border-border hover:bg-surface-tertiary transition-colors disabled:opacity-50 shadow-sm"
      >
        <Chrome className="w-5 h-5" />
        <span className="font-medium text-sm text-content-primary">Continue with Google</span>
      </button>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs font-semibold text-content-muted uppercase tracking-wider">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Secondary Action: Email Login */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-content-secondary mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="email"
              required
              className="w-full pl-9 pr-4 py-2 bg-surface-primary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-content-primary transition-all text-sm text-content-primary shadow-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        
        <div>
          <label className="block text-[13px] font-medium text-content-secondary mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="password"
              required
              className="w-full pl-9 pr-4 py-2 bg-surface-primary border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-content-primary transition-all text-sm text-content-primary shadow-sm"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-md bg-content-primary hover:bg-content-secondary text-surface-primary text-sm font-medium transition-colors disabled:opacity-50 mt-4 shadow-sm"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-content-secondary">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-content-primary hover:underline transition-all">
          Sign up
        </Link>
      </p>
    </>
  );
}
