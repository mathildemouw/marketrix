export default function IdeaList({ ideas, onEdit, onDelete, highlighted }) {
  if (ideas.length === 0) {
    return <p className="empty">No ideas yet. Add your first one!</p>;
  }

  return (
    <ul className="idea-list">
      {ideas.map(idea => (
        <li key={idea.id} className={`idea-item ${highlighted === idea.id ? 'highlighted' : ''}`}>
          <div className="idea-title">{idea.title}</div>
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
      ))}
    </ul>
  );
}
