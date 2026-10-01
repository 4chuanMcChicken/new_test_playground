# new_test_playground

A starter full-stack TypeScript template with an Express backend and a React frontend powered by Vite.

## Structure

- `backend`: Node.js + Express API
- `frontend`: React + Vite client

## Getting Started

Install dependencies:

```bash
npm install
```

Run the backend and frontend together:

```bash
npm run dev
```

Or run them separately:

```bash
npm run dev --workspace backend
npm run dev --workspace frontend
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Backend health check: `http://localhost:3000/health`

## Build

```bash
npm run build
```

## Pull request checks

Every pull request runs two independent GitHub Actions workflows:

- **Unit and integration tests** runs `npm test` for the frontend component tests
  and backend API tests, then builds both workspaces with `npm run build`.
- **End-to-end tests** installs Chromium and runs `npm run test:e2e`. Playwright
  starts temporary backend and frontend servers on ports 3000 and 5174. The HTML
  report and any failure traces are uploaded as the `playwright-results` artifact.

Both workflows can also be started manually from the GitHub Actions tab. New
commits to a pull request cancel older runs of the same workflow.
