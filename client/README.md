# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



/Users/mouwrao/workspace/marketrix && npm install pg dotenv 2>&1 | tail -3

npm install jsonwebtoken 2>&1 | tail -3


  Step 2 — Deploy on Railway
  1. Go to railway.app → New Project → Deploy from GitHub repo → select marketrix
  2. Railway auto-detects Node.js and will run npm run build then npm start

  Step 3 — Add PostgreSQL
  1. In your Railway project → + New → Database → PostgreSQL
  2. Railway automatically sets DATABASE_URL in your service's environment — no manual config needed

  Step 4 — For local dev, copy .env.example to .env and fill in your local Postgres connection string (or use Railway's "Connect" tab to get the URL and tunnel locally).


  curl -s -X POST http://localhost:3001/api/login \
     -H "Content-Type: application/json" \
     -d '{"password":"test"}'


     pkill -f "server/index.js" 2>/dev/null; sleep 1
   node /Users/mouwrao/workspace/marketrix/server/index.js &
   sleep 2
   curl -s -X POST http://localhost:3001/api/login \
     -H "Content-Type: application/json" \
     -d '{"password":"test"}'



node -e "
   require('dotenv').config();
   const { Pool } = require('./node_modules/pg');
   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
   pool.query('SELECT 1').then(() => console.log('connected')).catch(e => console.error('error:', e.message));
   " 2>&1
node server/index.js &
   sleep 2
   curl -s -X POST http://localhost:3001/api/login \
     -H "Content-Type: application/json" \
     -d '{"password":"wrongpassword"}'

pkill -f "server/index.js" 2>/dev/null; sleep 1
   node server/index.js &
   sleep 2
   echo "---server started---"
   curl -sv -X POST http://localhost:3001/api/login \
     -H "Content-Type: application/json" \
     -d '{"password":"test"}' 2>&1 | grep -E "< HTTP|{|}"


curl -s -X POST http://localhost:3001/api/login \
     -H "Content-Type: application/json" \
     -d '{"password":"test"}' && echo
   node -e "require('dotenv').config(); console.log('AUTH_PASSWORD set:', !!process.env.AUTH_PASSWORD)"



curl -s -X POST http://localhost:5174/api/login \
     -H "Content-Type: application/json" \
     -d '{"password":"test"}' && echo
   # also check if vite is running
   lsof -i :5173 -i :5174 2>/dev/null | grep LISTEN\


node -e "
   require('dotenv').config();
   const p = process.env.AUTH_PASSWORD;
   console.log('length:', p?.length);
   console.log('starts with quote:', p?.startsWith('\"') || p?.startsWith(\"'\"));
   console.log('has trailing space:', p?.endsWith(' '));
   console.log('has newline:', p?.includes('\n') || p?.includes('\r'));


node -e "
   require('dotenv').config();
   const p = process.env.AUTH_PASSWORD;
   const http = require('http');
   const body = JSON.stringify({ password: p });
   const req = http.request({ hostname: 'localhost', port: 3001, path: '/api/login', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, res
   => {
     let d = '';
     res.on('data', c => d += c);
     res.on('end', () => console.log(res.statusCode, d));
   });
   req.write(body); req.end();
   "