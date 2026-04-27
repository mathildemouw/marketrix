const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'ideas.json');

function load() {
  if (!fs.existsSync(FILE)) return { ideas: [], nextId: 1 };
  return JSON.parse(fs.readFileSync(FILE, 'utf8'));
}

function save(state) {
  fs.writeFileSync(FILE, JSON.stringify(state, null, 2));
}

const db = {
  all() {
    return load().ideas.slice().reverse();
  },
  insert(idea) {
    const state = load();
    const record = { ...idea, id: state.nextId++, created_at: new Date().toISOString() };
    state.ideas.push(record);
    save(state);
    return record;
  },
  update(id, idea) {
    const state = load();
    const idx = state.ideas.findIndex(i => i.id === id);
    if (idx === -1) return null;
    state.ideas[idx] = { ...state.ideas[idx], ...idea };
    save(state);
    return state.ideas[idx];
  },
  delete(id) {
    const state = load();
    const idx = state.ideas.findIndex(i => i.id === id);
    if (idx === -1) return false;
    state.ideas.splice(idx, 1);
    save(state);
    return true;
  },
  get(id) {
    return load().ideas.find(i => i.id === id) ?? null;
  },
};

module.exports = db;
