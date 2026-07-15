import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './lib/auth.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Journal from './pages/Journal.jsx';
import Explore from './pages/Explore.jsx';
import Favorites from './pages/Favorites.jsx';
import Friends from './pages/Friends.jsx';
import Profile from './pages/Profile.jsx';
import BottomNav from './components/BottomNav.jsx';

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'var(--text-muted)' }}>
        Loading…
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return (
    <div className="app-shell">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/journal" replace />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
