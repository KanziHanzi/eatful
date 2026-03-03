# Agent Memory

This file stores durable project learnings so future sessions can resume quickly.

## Product Direction

- Eatful is a food diary app where users track meals and drinks by taking photos.
- Core UX is a single main screen focused on "Today" with a grid of captured photos.
- Each photo shows a timestamp in 24h format.
- The add action is a plus tile rendered inside the same grid and always shown at the end.

## Technical Baseline

- Stack: React Native + Expo + Expo Router.
- Routing is single-screen via `app/index.tsx` (thin route file).
- Main implementation lives in `src/screens/Diary/Diary.tsx`.
- Local persistence uses AsyncStorage and groups entries by day:
  - `DiaryDay = { dateKey, timestamp, entries }`
  - `dateKey` format: `YYYY-MM-DD`

## Design/UI Decisions

- Header text is centered and only shows `Today`.
- Add tile is transparent with a subtle dark/light border and plus icon.
- No extra subtext inside the add tile.
- No shadow/elevation on tiles for now.
- Safe area and status bar background should visually match screen background.

## Team Conventions (must follow)

- Composition over inheritance.
- Use context for shared cross-component data; avoid prop drilling.
- Functions should use arrow syntax.
- Components use PascalCase naming (including component file names).
- No underscores in file names or function names.
- No rest-prop spreading in components; pass props explicitly.
- Styles go in separate files: `ComponentName.styles.ts`.
- Components live under `src/components/<ComponentName>/`.
- Export components via `src/components/index.ts`.
- Hooks and utils use camelCase naming (symbols and files).
- Reusable helpers belong in `src/utils`.
- Static assets belong in `src/assets`.

## Workflow Notes

- Session startup rule: before doing any task, read files in `docs/sessions/` to restore context from prior sessions.
- Keep `app/index.tsx` as routing entry and keep feature logic in `src/*`.
- Run lint after changes.
- Preserve existing decisions unless user asks to change them.
