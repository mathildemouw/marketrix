import { useState } from 'react';
import { getColor } from '../colors';

export default function IdeaList({ ideas, onEdit, onDelete, highlighted }) {
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(d => d === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sorted = sortField
    ? [...ideas].sort((a, b) => sortDir === 'desc' ? b[sortField] - a[sortField] : a[sortField] - b[sortField])
    : ideas;

  if (ideas.length === 0) {
    return <p className="empty">No ideas yet. Add your first one!</p>;
  }

  const sortLabel = (field, label, icon) => {
    const active = sortField === field;
    return (
      <button
        className={`sort-btn ${active ? 'active' : ''}`}
        onClick={() => handleSort(field)}
      >
        {icon} {label} {active ? (sortDir === 'desc' ? '↓' : '↑') : ''}
      </button>
    );
  };

  return (
    <div>
      <div className="sort-controls">
        <span className="sort-label">Sort by:</span>
        {sortLabel('expense', 'Expense', '💰')}
        {sortLabel('impact', 'Impact', '🎯')}
        {sortLabel('energy', 'Energy', '⚡')}
      </div>
      <ul className="idea-list">
      {sorted.map((idea, i) => {
        const color = getColor(i);
        return (
          <li
            key={idea.id}
            className={`idea-item ${highlighted === idea.id ? 'highlighted' : ''}`}
            style={{
              borderColor: color + '55',
              background: `linear-gradient(135deg, ${color}18 0%, #181818 60%)`,
            }}
          >
            <div className="idea-title" style={{ color }}>{idea.title}</div>
            <div className="idea-scores">
              <span title="Energizing (Y axis)">⚡ {idea.energy}</span>
              <span title="Expense (X axis)">💰 {idea.expense}</span>
              <span title="Impact (Z axis)">🎯 {idea.impact}</span>
            </div>
            <div className="idea-actions">
              <button onClick={() => onEdit(idea)}>Edit</button>
              <button onClick={() => onDelete(idea.id)} className="danger">Delete</button>
            </div>
          </li>
        );
      })}
      </ul>
    </div>
  );
}
