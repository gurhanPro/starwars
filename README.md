# Star Wars Character Search

A React app for searching Star Wars characters using the SWAPI API.

**Live Demo**: https://procurified-frontendtest-ziyaad.netlify.app/

## Features

- Search characters with autocomplete
- Error tracking with PostHog
- Debounced search (500ms)
- Caching with TanStack Query (retries, exponential backoff, jitter)

## Installation

```bash
npm install
```

Create `.env` file (optional - PostHog not required for dev):
```env
VITE_POSTHOG_KEY=your_key_here
VITE_POSTHOG_HOST=https://us.i.posthog.com
```

## Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview build
```

## Testing

```bash
npm test             # Unit tests
npm run test:e2e     # E2E tests (auto-builds first)
```

## Tech Stack

- React + TypeScript + Vite
- TanStack Query
- PostHog
- CSS Modules
- Vitest + Playwright