import { useState } from 'react';
import { login } from '../api';

export default function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(password);
      onLogin();
    } catch {
      setError('Incorrect password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Marketrix</h1>
        <p>Enter your password to continue</p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
        />
        {error && <span className="login-error">{error}</span>}
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
