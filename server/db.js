const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function init() {
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
}

const db = {
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

module.exports = { db, init };
