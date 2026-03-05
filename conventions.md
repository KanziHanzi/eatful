# Eatful Code Style

This document is the source of truth for how code should be written in this repo.

## Core Principles

- Optimize for readability over cleverness.
- Prefer composition over inheritance.
- Keep screens/components focused on one responsibility.
- Follow existing patterns before adding new abstractions.
- Build mobile-first and preserve iOS/Android behavior parity.

## Formatting Baseline

- Prettier is authoritative; do not hand-format against it.
- Current format defaults include: single quotes, trailing commas, 2-space indent, print width 120.
- Keep imports and object destructuring aligned with current Prettier config (`bracketSpacing: false`).
- Use semicolon-free style unless a file already requires semicolons for consistency.

## TypeScript Rules

- Use strict typing and avoid `any`.
- Prefer `type` aliases for app/domain shapes.
- Model domain entities explicitly (`DiaryEntry`, `DiaryDay`, `EatingReason`).
- Keep utility functions pure where practical.
- Centralize reusable helpers in `src/utils`.

## React and React Native

- Use function components and hooks only.
- Use arrow functions for all functions (components, handlers, utilities).
- Keep state local by default; lift to context only when truly shared.
- Theme/palette values should be consumed directly in each component/screen; do not place them in screen context unless sharing is required.
- Screens must use composition instead of prop drilling.
- If multiple components within a screen need shared state or actions, create a screen-scoped context.
- Share both state and behavior through context providers/hooks rather than passing deep prop chains.
- Do not spread rest props in components; pass props explicitly.
- Prefer early returns and guard clauses over deep nesting.

## Third-Party Libraries

- Never call third-party libraries directly inside screens or UI components.
- Wrap third-party integrations behind custom hooks (or utility adapters when no hook is appropriate).
- Screens/components should consume app-level APIs (`useX` hooks), not vendor APIs.
- Keep permission handling, side effects, and vendor-specific response mapping inside the wrapper hook.
- Prefer one wrapper per concern (for example camera, storage, analytics) to keep boundaries clear.

## Naming and File Structure

- Components: PascalCase names and PascalCase file/folder names.
- Hooks and utils: camelCase names and file names.
- Never use underscores in file names or function names.
- Keep styles in separate files: `ComponentName.styles.ts`.
- Top-level route files stay thin in `app/`; feature logic lives in `src/*`.
- Screen-scoped context providers/hooks must live in a local `hooks/` folder inside that screen directory (for example `src/screens/Diary/hooks`).

## Imports

- Use absolute imports from `src/*` (configured alias), not long relative chains.
- Group imports in this order: external packages, absolute internal imports, relative imports.
- Keep one blank line between import groups.
- Prefer importing from local barrel files where they exist.

## Styling and UI

- Use `StyleSheet.create` for component styles.
- Respect safe areas on top-level screens.
- Consume theme values through `useTheme` and pick colors from `palette` only.
- Do not use `Colors.dark.*` / `Colors.light.*` directly in screens/components.
- Keep spacing, radii, and typography consistent with existing scale.
- Keep visual treatment intentional and avoid one-off style hacks.

## Data and Persistence

- Persist user-critical diary data in AsyncStorage.
- Keep AsyncStorage behind an abstract hook with generic key-based methods; pass storage keys at usage sites.
- Store timestamps in Unix milliseconds.
- Group entries by `YYYY-MM-DD` day keys.
- Keep storage keys centralized constants.
- Validate persisted data shape defensively when loading.

## Diary UX Rules

- Grid add tile stays at the end and only appears for Today.
- Entry timestamps are displayed in 24-hour format.
- Capture flow should be immediate with clear camera permission handling.
- Use concise and explicit empty/error/loading states.

## Quality Bar Before Handoff

- Lint must pass (`npm run lint`).
- Type safety must hold (`npx tsc --noEmit`) when touching types or data flow.
- Remove dead code and commented-out blocks.
- Keep comments minimal and only for non-obvious behavior.

## Git Hygiene

- Keep commits focused and small.
- Write commit messages that explain why the change exists.
- Never commit secrets or machine-specific sensitive data.
