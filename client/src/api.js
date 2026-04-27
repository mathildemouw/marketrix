const BASE = '/api';

export async function fetchIdeas() {
  const res = await fetch(`${BASE}/ideas`);
  if (!res.ok) throw new Error('Failed to fetch ideas');
  return res.json();
}

export async function createIdea(idea) {
  const res = await fetch(`${BASE}/ideas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  });
  if (!res.ok) throw new Error('Failed to create idea');
  return res.json();
}

export async function updateIdea(id, idea) {
  const res = await fetch(`${BASE}/ideas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(idea),
  });
  if (!res.ok) throw new Error('Failed to update idea');
  return res.json();
}

export async function deleteIdea(id) {
  const res = await fetch(`${BASE}/ideas/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete idea');
}
