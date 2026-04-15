# Aldaba Web

A multi-platform tourism/cultural information app for Aldaba in Trinidad, Cuba. It serves information about local services, excursions, events, and historical heritage (UNESCO World Heritage sites).

## Architecture

The project has two parts running concurrently in development:

1. **Vite Frontend** (React 19) — runs on port 5000
2. **Express Backend** (Node.js/TypeScript) — runs on port 3001 in dev, proxied from Vite

### Project Structure

- `/client` — React web frontend (Vite, React Router 7, TanStack Query)
- `/app` — Expo (React Native) mobile frontend
- `/server` — Express backend (TypeScript)
  - `index.ts` — Server entry point, CORS, routing
  - `routes.ts` — API routes (prefix `/api`)
  - `storage.ts` — Data access (in-memory MemStorage, Drizzle-ready)
  - `templates/` — HTML templates for landing page and admin panel
- `/shared` — Shared types and Drizzle schema
- `/components` — Shared React components
- `/constants` — Shared data and colors
- `/lib` — Shared utilities (query client)
- `/assets` — Static images and fonts
- `/scripts` — Build scripts

## Tech Stack

- **Frontend**: React 19, React Router 7, TanStack Query, Lucide React, Vite
- **Mobile**: Expo, Expo Router, React Native
- **Backend**: Express 5, Node.js, TypeScript, tsx
- **Database**: Drizzle ORM + PostgreSQL (pg driver)
- **Validation**: Zod, drizzle-zod
- **Build**: Vite (frontend), esbuild (server), concurrently (dev)
- **Package Manager**: npm

## Development

```bash
npm run dev        # Start both frontend (port 5000) and backend (port 3001)
npm run client:dev # Start only the Vite frontend
npm run server:dev # Start only the Express backend (port 3001)
```

## Production Build

```bash
npm run build      # Build Vite frontend to client-dist/ + esbuild server to server_dist/
node server_dist/index.js  # Run the production server (port 5000)
```

In production, the Express server:
1. Serves the landing page at `/`
2. Serves the React SPA from `client-dist/`
3. Serves Expo mobile manifests for iOS/Android
4. Handles all `/api` routes

## Deployment

- **Target**: Autoscale
- **Build**: `npm run build`
- **Run**: `node server_dist/index.js`

## Key Config

- `vite.config.ts` — Frontend config, proxies `/api` to `localhost:3001`, `allowedHosts: true`
- `drizzle.config.ts` — Database ORM config
- `tsconfig.json` — Path aliases: `@/*` → root, `@shared/*` → `./shared/*`
