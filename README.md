# Botim OP Docs

Documentation platform for Botim Open Platform. Built with Nuxt 4, featuring SSR, authentication, docs CRUD, ticket management, search, and an admin panel.

## Tech Stack

- [Nuxt 4](https://nuxt.com) — Full-stack Vue framework (SSR + CSR hybrid)
- [Nuxt UI v4](https://ui.nuxt.com) — UI components
- [MDC](https://mdc.nuxt.com) — Markdown Components for rich docs content
- [Tailwind CSS 4](https://tailwindcss.com) — Styling
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) — Markdown editor in admin panel

## Prerequisites

- Node.js 22 LTS
- pnpm (`corepack enable`)

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

Opens at `http://localhost:3000`.

### Seed Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | Admin |
| editor@example.com | editor123 | Editor |
| viewer@example.com | viewer123 | Viewer |

## Build & Preview

```bash
pnpm build
pnpm preview
```

## Project Structure

```
app/
  components/         UI components
  composables/        useAuth, useApi, useDocsService, etc.
  layouts/            default, docs, admin
  middleware/          auth, admin route guards
  pages/              all routes
  plugins/            auth.client.ts (hydrates auth on boot)
server/
  api/                Nitro mock API routes (mirrors future Java backend)
  data/               In-memory mock data (users, docs, tickets)
  utils/              Auth helpers (requireAuth, requireRole)
public/               Static assets, robots.txt
```

## Routes

| Route | Access | Rendering |
|-------|--------|-----------|
| `/` | Public | Prerendered |
| `/docs/:slug` | Public | SSR |
| `/search` | Public | SSR |
| `/login`, `/register` | Public | SSR |
| `/account/**` | Authenticated | CSR |
| `/tickets/**` | Authenticated | CSR |
| `/admin/docs/**` | Editor+ | CSR |
| `/admin/users/**`, `/admin/tickets/**`, `/admin` | Admin | CSR |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NUXT_PUBLIC_API_BASE_URL` | `/api` | Backend API URL. Points to mock routes in dev, Java backend in production |
| `NUXT_PUBLIC_SITE_URL` | `https://docs.botim-op.com` | Public site URL (used for sitemap) |
| `PORT` | `3000` | Server port. Set `8080` for Azure |

In dev, create a `.env` file. In production, set env vars on the host.

## Deployment

This is a **Node.js server**, not a static site. SSR requires a running Node.js process.

```bash
pnpm build                          # produces .output/
node .output/server/index.mjs       # starts server
```

### Azure App Service

- Runtime: Node.js 22 LTS (Linux)
- Startup command: `node .output/server/index.mjs`
- Deploy: `.output/` directory only
- Health check: `GET /api/health`

### AWS Amplify

Connect your repo in Amplify Console. It auto-detects Nuxt and handles SSR automatically. No extra config needed.

See deployment steps in detail in the project documentation.

## Backend Migration

The mock API in `server/api/` mirrors the future Java backend. When ready:

1. Set `NUXT_PUBLIC_API_BASE_URL` to the Java backend URL
2. Delete `server/` directory
3. No frontend code changes needed
