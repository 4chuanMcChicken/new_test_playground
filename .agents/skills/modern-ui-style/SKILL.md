---
name: modern-ui-style
description: Modernize and polish this repo's React frontend UI, including layout, styling, responsiveness, and interaction states.
---

Use this skill when the user asks to make the frontend more modern, beautiful, polished, professional, cleaner, or visually refined.

## Project Context

This repo has a Vite React frontend in `frontend/` and an Express backend in `backend/`. The default UI entry points are:

- `frontend/src/main.tsx`
- `frontend/src/styles.css`

Keep the existing backend API contract unless the user explicitly asks to change backend behavior.

## UI Direction

Aim for a modern product-app feel: clean composition, strong hierarchy, responsive spacing, tasteful color contrast, and clear interaction states. Prefer purposeful interface elements over decorative filler.

When improving the UI:

- Preserve or improve usability on both mobile and desktop.
- Keep text readable and avoid overlapping content at narrow widths.
- Use stable dimensions for buttons, panels, grids, and status areas so loading states do not cause layout jumps.
- Use a balanced palette with at least one warm and one cool accent when it fits the screen.
- Keep border radii restrained, generally `8px` or less unless the existing design language changes.
- Make buttons, hover states, disabled states, and API feedback feel intentional.
- Avoid adding landing-page marketing sections unless the user asks for them.

## Workflow

Before editing, inspect the relevant React and CSS files to understand the current structure.

After editing, run:

```bash
npm run build --workspace frontend
```

In the final response, mention the changed files and whether the build passed.
