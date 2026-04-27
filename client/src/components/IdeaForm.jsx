import { useState, useEffect } from 'react';

const defaultForm = { title: '', energy: 50, expense: 50, impact: 50 };

export default function IdeaForm({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    setForm(editing ? { title: editing.title, energy: editing.energy, expense: editing.expense, impact: editing.impact } : defaultForm);
  }, [editing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'title' ? value : Number(value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    if (!editing) setForm(defaultForm);
  }

  return (
    <form onSubmit={handleSubmit} className="idea-form">
      <h2>{editing ? 'Edit Idea' : 'New Idea'}</h2>
      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required placeholder="Campaign name..." />
      </label>
      <div className="scores">
        <ScoreInput label="Energy" name="energy" value={form.energy} onChange={handleChange} />
        <ScoreInput label="Expense" name="expense" value={form.expense} onChange={handleChange} />
        <ScoreInput label="Impact" name="impact" value={form.impact} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button type="submit">{editing ? 'Save' : 'Add Idea'}</button>
        {editing && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}

function ScoreInput({ label, name, value, onChange }) {
  return (
    <label className="score-input">
      <span>{label}: <strong>{value}</strong></span>
      <input type="range" name={name} min={1} max={100} value={value} onChange={onChange} />
    </label>
  );
}
