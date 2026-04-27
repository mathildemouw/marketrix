require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { db, init } = require('./db');
const { login, requireAuth } = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', login);

app.use('/api', requireAuth);

app.get('/api/ideas', async (req, res) => {
  try {
    res.json(await db.all());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/api/ideas', async (req, res) => {
  const { title, energy, expense, impact } = req.body;
  if (!title || energy == null || expense == null || impact == null) {
    return res.status(400).json({ error: 'All fields required' });
  }
  try {
    res.status(201).json(await db.insert({ title, energy, expense, impact }));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/api/ideas/:id', async (req, res) => {
  const { title, energy, expense, impact } = req.body;
  const id = Number(req.params.id);
  try {
    const updated = await db.update(id, { title, energy, expense, impact });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/api/ideas/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    if (!await db.delete(id)) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '../client/dist');
  app.use(express.static(dist));
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));
}

const PORT = process.env.PORT || 3001;

init()
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch(err => { console.error('DB init failed:', err.message); process.exit(1); });
