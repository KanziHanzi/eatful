# Eatful Coding Conventions

## Core Principles

- Prefer simple, readable code over clever abstractions.
- Keep features small and composable.
- Always prefer composition over inheritance.
- Match existing project patterns before introducing new ones.
- Build mobile-first and test on iOS + Android behavior.

## TypeScript

- Use strict typing; avoid `any`.
- Model domain data with explicit types (for example `DiaryEntry`, `DiaryDay`).
- Keep utility functions pure where possible.
- Prefer `type` for object shapes used in app state.
- Extract reusable/general-purpose helpers into separate files under `src/utils`.

## React and React Native

- Use function components and hooks.
- Use React Context for shared cross-component state; avoid prop drilling.
- Keep one responsibility per screen/component.
- Avoid unnecessary re-renders and deep prop chains.

## Naming and Functions

- Components must be named in PascalCase.
- Component file names must also be PascalCase.
- Do not use underscores in file names.
- Do not use underscores in function names.
- Use arrow functions for all functions (including utilities, handlers, and components).
- Do not spread rest props in components; declare and pass props explicitly.
- Utility and hook names must use camelCase.
- Utility and hook file names must use camelCase.

## Routing and Screens

- Use Expo Router file-based routes.
- Keep route names clear and stable.
- Default to one screen per file in `app/`.

## Styling

- Use `StyleSheet.create` for styles.
- Keep styles in a separate file next to the component: `ComponentName.styles.ts`.
- Respect safe areas on top-level screens.
- Follow the app theme tokens from `constants/theme.ts`.
- Keep layouts consistent: spacing scale, radii, and typography should feel unified.

## Components and Imports

- Group each component in its own folder under `src/components`.
- Import components using absolute paths from `src/components`.
- Use `src/components/index.ts` to centralize and re-export component APIs.
- Keep static assets under `src/assets`.

## Data and Storage

- Persist user-critical local data (diary photos/metadata) in local storage.
- Store timestamps in Unix milliseconds.
- Group diary entries by day (`YYYY-MM-DD`) with a day-level timestamp.
- Keep storage keys centralized constants.

## UX Rules for Diary Grid

- Always show the add tile at the end of the grid.
- Show timestamps in 24h format.
- Keep capture actions immediate, with clear permission handling.
- Use concise empty/loading/error states.

## Code Quality

- Lint must pass before finishing work.
- Format with Prettier.
- Avoid dead code and commented-out blocks.
- Keep comments minimal and only for non-obvious logic.

## Git and Commits

- Make focused, small commits.
- Use commit messages that explain why the change exists.
- Do not commit secrets or environment-specific sensitive data.
