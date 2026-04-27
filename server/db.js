// Uses PostgreSQL when DATABASE_URL is set (production), JSON file otherwise (local dev).

let db, init;

if (process.env.DATABASE_URL) {
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  init = async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ideas (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        energy INTEGER NOT NULL,
        expense INTEGER NOT NULL,
        impact INTEGER NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);
  };

  db = {
    async all() {
      const { rows } = await pool.query('SELECT * FROM ideas ORDER BY created_at DESC');
      return rows;
    },
    async insert({ title, energy, expense, impact }) {
      const { rows } = await pool.query(
        'INSERT INTO ideas (title, energy, expense, impact) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, energy, expense, impact]
      );
      return rows[0];
    },
    async update(id, { title, energy, expense, impact }) {
      const { rows } = await pool.query(
        'UPDATE ideas SET title=$1, energy=$2, expense=$3, impact=$4 WHERE id=$5 RETURNING *',
        [title, energy, expense, impact, id]
      );
      return rows[0] ?? null;
    },
    async delete(id) {
      const { rowCount } = await pool.query('DELETE FROM ideas WHERE id=$1', [id]);
      return rowCount > 0;
    },
  };
} else {
  const fs = require('fs');
  const path = require('path');
  const FILE = path.join(__dirname, 'ideas.json');

  const load = () => fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : { ideas: [], nextId: 1 };
  const save = s => fs.writeFileSync(FILE, JSON.stringify(s, null, 2));

  init = async () => {};

  db = {
    async all() { return load().ideas.slice().reverse(); },
    async insert(idea) {
      const s = load();
      const record = { ...idea, id: s.nextId++, created_at: new Date().toISOString() };
      s.ideas.push(record);
      save(s);
      return record;
    },
    async update(id, idea) {
      const s = load();
      const idx = s.ideas.findIndex(i => i.id === id);
      if (idx === -1) return null;
      s.ideas[idx] = { ...s.ideas[idx], ...idea };
      save(s);
      return s.ideas[idx];
    },
    async delete(id) {
      const s = load();
      const idx = s.ideas.findIndex(i => i.id === id);
      if (idx === -1) return false;
      s.ideas.splice(idx, 1);
      save(s);
      return true;
    },
  };

  console.log('No DATABASE_URL — using local JSON file storage');
}

module.exports = { db, init };
