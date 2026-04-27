import { useState, useEffect } from 'react';
import IdeaForm from './components/IdeaForm';
import IdeaList from './components/IdeaList';
import IdeaVisualization from './components/IdeaVisualization';
import LoginForm from './components/LoginForm';
import { fetchIdeas, createIdea, updateIdea, deleteIdea, logout, isLoggedIn } from './api';
import './App.css';

export default function App() {
  const [authed, setAuthed] = useState(isLoggedIn());
  const [ideas, setIdeas] = useState([]);
  const [editing, setEditing] = useState(null);
  const [highlighted, setHighlighted] = useState(null);
  const [view, setView] = useState('split');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authed) return;
    fetchIdeas()
      .then(setIdeas)
      .catch(e => {
        if (e.message === 'unauthenticated') { logout(); setAuthed(false); }
        else setError('Could not connect to server. Is it running on port 3001?');
      });
  }, [authed]);

  if (!authed) {
    return <LoginForm onLogin={() => setAuthed(true)} />;
  }

  async function handleSubmit(form) {
    try {
      if (editing) {
        const updated = await updateIdea(editing.id, form);
        setIdeas(ids => ids.map(i => i.id === updated.id ? updated : i));
        setEditing(null);
      } else {
        const created = await createIdea(form);
        setIdeas(ids => [created, ...ids]);
      }
    } catch {
      setError('Failed to save idea.');
    }
  }

  async function handleDelete(id) {
    try {
      await deleteIdea(id);
      setIdeas(ids => ids.filter(i => i.id !== id));
    } catch {
      setError('Failed to delete idea.');
    }
  }

  function handleLogout() {
    logout();
    setAuthed(false);
    setIdeas([]);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>Marketrix</h1>
          <p className="subtitle">Visualize marketing ideas in 3D space</p>
        </div>
        <div className="header-right">
          <div className="view-tabs">
            <button className={view === 'split' ? 'active' : ''} onClick={() => setView('split')}>Split</button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>List</button>
            <button className={view === '3d' ? 'active' : ''} onClick={() => setView('3d')}>3D View</button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Sign out</button>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className={`main view-${view}`}>
        {view !== '3d' && (
          <aside className="sidebar">
            <IdeaForm onSubmit={handleSubmit} editing={editing} onCancel={() => setEditing(null)} />
            <IdeaList
              ideas={ideas}
              onEdit={setEditing}
              onDelete={handleDelete}
              highlighted={highlighted}
            />
          </aside>
        )}
        {view !== 'list' && (
          <IdeaVisualization ideas={ideas} onHover={setHighlighted} />
        )}
      </main>
    </div>
  );
}
