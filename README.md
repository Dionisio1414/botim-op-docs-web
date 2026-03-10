# Botim OP Docs

Documentation platform for Botim Open Platform built with Nuxt 4.

## Tech Stack

- [Nuxt 4](https://nuxt.com) — Full-stack Vue framework (SSR)
- [Nuxt Content v3](https://content.nuxt.com) — File-based content with MDC markdown
- [Nuxt UI v4](https://ui.nuxt.com) — UI components + Tailwind CSS 4
- [MDC](https://mdc.nuxt.com) — Markdown Components with syntax highlighting
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) — In-browser markdown editor

## Features

- **Documentation reader** with sidebar navigation, table of contents, and prev/next links
- **Full-text search** via Cmd+K modal and dedicated search page with highlighting
- **Admin panel** for creating, editing, and deleting docs with live MDC preview
- **Dark/light mode** toggle
- **Responsive** — mobile sidebar drawer, adaptive layouts

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

## Build & Preview

```bash
pnpm build
pnpm preview
```

## Project Structure

```
content/docs/           Markdown documentation files (MDC)
app/
  pages/
    index.vue           Landing page
    docs/[...slug].vue  Documentation reader
    search.vue          Full-text search
    admin/              Protected admin area (login, CRUD, editor)
  components/           AppHeader, DocsSidebar, DocsToc, SearchModal, etc.
  layouts/              default, docs, admin
  composables/          useAdminAuth
  middleware/           admin route guard
server/api/
  auth/                 Login, logout, session check
  admin/docs/           CRUD endpoints for markdown files
```

## Admin Access

Navigate to `/admin/login` and enter the admin password.

Default password: `admin123` (override via `NUXT_ADMIN_PASSWORD` env var).

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NUXT_ADMIN_PASSWORD` | `admin123` | Admin panel password |
