const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ideas', (req, res) => {
  res.json(db.all());
});

app.post('/api/ideas', (req, res) => {
  const { title, energy, expense, impact } = req.body;
  if (!title || energy == null || expense == null || impact == null) {
    return res.status(400).json({ error: 'All fields required' });
  }
  res.status(201).json(db.insert({ title, energy, expense, impact }));
});

app.put('/api/ideas/:id', (req, res) => {
  const { title, energy, expense, impact } = req.body;
  const id = Number(req.params.id);
  const updated = db.update(id, { title, energy, expense, impact });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
});

app.delete('/api/ideas/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!db.delete(id)) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
