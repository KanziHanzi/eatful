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
- Root app layout (`app/_layout.tsx`) consumes local wrappers/hooks (`AppThemeProvider`, `AppRouterStack`, `AppStatusBar`, `useNavigationTheme`) instead of direct vendor imports.
- Theme resolution is centralized in `src/hooks/useTheme.ts`, which only exposes `{ palette }`.
- Main implementation lives in `src/screens/Diary/Diary.tsx`.
- Diary screen state/actions are provided via screen-scoped context in `src/screens/Diary/hooks/useDiaryContext.tsx`.
- AsyncStorage access is abstracted via `src/hooks/useStorage.ts` with generic key-based methods (`storeData`, `loadData`, `clearData`).
- Storage keys are centralized in `src/constants/storage.ts` as `StorageKey` enum values.
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

- Code style was reworked; `conventions.md` is now the canonical style guide.
- Keep Prettier-aligned formatting (single quotes, trailing commas, 2-space indent, no bracket spacing).
- Use arrow functions everywhere and prefer guard clauses over nested branches.
- Components/files in PascalCase; hooks and utils in camelCase; no underscores in file/function names.
- Avoid rest-prop spreading in components; pass props explicitly.
- Screens must favor composition over prop drilling.
- For within-screen shared state/actions across components, use a screen-scoped context provider + hook.
- Place screen-scoped context provider/hooks in a local `hooks/` folder within the screen directory.
- Keep local state in the component/screen whenever possible; only shared state/actions belong in context.
- Theme-related values should be read directly in components/screens, not pushed through screen context by default.
- Pick theme colors via `palette` from `useTheme`; avoid direct `Colors.dark.*` / `Colors.light.*` references in feature code.
- Use absolute `src/*` imports and keep import groups ordered: external, absolute internal, relative.
- Styles stay in separate `ComponentName.styles.ts` files; route files in `app/*` remain thin.
- Keep reusable helpers in `src/utils` and assets in `src/assets`.
- Do not use third-party libraries directly in screens/components; always wrap them in custom hooks (or adapter utils when UI hooks are not applicable).
- Global component pattern in `src/components`: one folder per component, component file + local `index.ts` barrel, and root `src/components/index.ts` re-export.
- Current component style is small wrappers that consume `useTheme` and read colors from `palette` directly in the component.

## Workflow Notes

- Session startup rule: before doing any task, read files in `docs/sessions/` to restore context from prior sessions.
- Keep `app/index.tsx` as routing entry and keep feature logic in `src/*`.
- Run `npm run lint` after changes.
- Run `npx tsc --noEmit` when changes touch types, storage, or broader data flow.
- Preserve existing decisions unless user asks to change them.
