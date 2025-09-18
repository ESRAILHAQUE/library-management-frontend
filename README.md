# Library Management Web (Frontend)

React (CRA + TypeScript) frontend for the Library Management system.

## Stack

- React + TypeScript
- Redux Toolkit Query
- TailwindCSS
- SweetAlert2, react-hot-toast

## Local Setup

1. Install

```
npm install
```

2. Env (optional)

```
# Either point directly to API or use Netlify proxy
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

3. Run

```
npm start
```

Build: `npm run build`

## Structure

```
src/
  pages/            # route pages (books list, create/edit, borrow, summary)
  components/       # UI components (tables, forms, navbar, footer)
  store/            # RTK Query API slice
  index.tsx, App.tsx
```

## API Config

- Base URL resolves from:
  - VITE_API_URL (Vite) or REACT_APP_API_URL (CRA), fallback http://localhost:5000/api
- Endpoints implemented:
  - Books: list, get, create, update, delete (with pagination helper)
  - Borrows: create, list (paginated), summary

## Deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `build`
- netlify.toml includes:
  - Proxy `/api/*` to your Vercel backend
  - SPA fallback to `/index.html`
- Set `REACT_APP_API_URL` if not using the proxy.

## Scripts

- start: CRA dev server
- build: production bundle
- test: CRA tests (if enabled)
