const BASE = '/api';

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  };
}

export async function login(password) {
  const res = await fetch(`${BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error('Incorrect password');
  const { token } = await res.json();
  localStorage.setItem('token', token);
}

export function logout() {
  localStorage.removeItem('token');
}

export function isLoggedIn() {
  return !!getToken();
}

export async function fetchIdeas() {
  const res = await fetch(`${BASE}/ideas`, { headers: authHeaders() });
  if (res.status === 401) throw new Error('unauthenticated');
  if (!res.ok) throw new Error('Failed to fetch ideas');
  return res.json();
}

export async function createIdea(idea) {
  const res = await fetch(`${BASE}/ideas`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(idea),
  });
  if (!res.ok) throw new Error('Failed to create idea');
  return res.json();
}

export async function updateIdea(id, idea) {
  const res = await fetch(`${BASE}/ideas/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(idea),
  });
  if (!res.ok) throw new Error('Failed to update idea');
  return res.json();
}

export async function deleteIdea(id) {
  const res = await fetch(`${BASE}/ideas/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to delete idea');
}
