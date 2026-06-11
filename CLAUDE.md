# CLAUDE.md

Guidance for working in this repository.

## Component architecture (atomic design)

UI is organized with atomic design. Full rules and the decision tree live in
[src/components/README.md](src/components/README.md) — read it before adding or
moving a component. Summary:

- **`src/components/`** is the global, cross-screen design system, split by
  atomic level:
  - `primitives/` — Restyle theme wrappers of raw RN elements (`ThemedView`,
    `ThemedText`, …). The substrate atoms are built on, **not** atoms themselves.
  - `atoms/` — indivisible semantic units (`Icon`, `Text`, `Button`).
  - `molecules/` — small purposeful groups of atoms.
  - `organisms/` — complex, self-contained reusable sections.
  - `templates/` — screen scaffolds (`ScreenWrapper`).
- **`src/screens/<Screen>/`** are pages (own data/state). Screen-specific
  components stay co-located under the screen's `components/` folder.
- **Promote on reuse:** a component stays screen-local until a *second* screen
  needs it; only then move it to the matching global level.
- **Coupling gate:** anything importing a screen store/hook (e.g. `useEntryStore`)
  must be made presentational (props in, callbacks out) before it can be promoted.
  Components in `src/components/` must never import from `src/screens/`.
- **Naming:** one folder per component with `index.tsx`; co-locate
  `*.styles.ts` / `*.types.ts`. Each level folder has its own barrel `index.ts`.
- **Imports:** use the `src/...` alias and import from the specific level —
  e.g. `import { Icon } from 'src/components/atoms'`. There is **no** aggregating
  `src/components/index.ts` barrel.
