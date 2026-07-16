import { useState } from 'react';
import { useAuth } from '../lib/auth.jsx';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    if (mode === 'signin') {
      const result = await signIn(email, password);
      if (result.error) setError(result.error.message || 'Sign in failed.');
    } else {
      const result = await signUp(email, password);
      if (result.error) setError(result.error.message || 'Sign up failed.');
      else setSuccess('Account created! You can now sign in.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">Kaori</div>
        <p className="auth-tagline">The taste that lingers.</p>

        {error && <div className="auth-error">{error}</div>}
        {success && (
          <div style={{ background: 'rgba(123,196,127,0.1)', border: '1px solid rgba(123,196,127,0.3)', borderRadius: 'var(--radius)', padding: '10px 14px', fontSize: 13, color: 'var(--green)', marginBottom: 16 }}>
            {success}
          </div>
        )}

        <form onSubmit={submit} autoComplete="off">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="off" name="kaori-email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="off" name="kaori-password" />
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: 8 }} disabled={loading}>
            {loading ? 'Loading…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            style={{ background: 'none', border: 'none', color: 'var(--accent)', padding: 0, cursor: 'pointer', fontSize: 13 }}
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess(''); }}
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
