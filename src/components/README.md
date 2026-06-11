# Component Architecture — Atomic Design

This project organizes its UI with **atomic design**: small, indivisible pieces
(**atoms**) compose into **molecules**, which compose into **organisms**, which
are arranged by **templates** and filled with real data in **screens** (pages).
Below that sits a **primitives** layer — the theme substrate everything is built on.

This document is the single source of truth for *where a component goes* and
*how it's named*. When in doubt, follow the decision tree.

> Status: the global design system (`src/components/`) has been migrated to this
> structure. Remaining items are screen-local refactors — see
> [Migration backlog](#migration-backlog).

---

## The layers

```
src/components/                # GLOBAL design system — cross-screen reuse ONLY.
│                              # No top-level barrel: import from the specific level.
├── primitives/                # Theme substrate (Restyle wrappers of raw RN elements). NOT atoms.
│   └── index.ts               #   → import { ThemedView } from 'src/components/primitives'
├── atoms/                     # Indivisible semantic units (Icon, Text, Button, ...)
│   └── index.ts               #   → import { Icon, Text } from 'src/components/atoms'
├── molecules/                 # Small purposeful groups of atoms (Pill, SectionTitle, ...)
│   └── index.ts               #   → import { Pill } from 'src/components/molecules'
├── organisms/                 # Complex, self-contained, reusable sections
│   └── index.ts               #   → import { ... } from 'src/components/organisms'
└── templates/                 # Screen scaffolds (safe-area + scroll containers)
    └── index.ts               #   → import { ScreenWrapper } from 'src/components/templates'

src/screens/<Screen>/          # "Pages": own real data, navigation, and state.
├── index.tsx                  # the screen itself — composes shared + local parts
├── <Screen>.styles.ts         # (optional) co-located styles
├── components/                # screen-LOCAL atoms/molecules/organisms (flat or feature-nested)
│   └── DietaryScore/          # e.g. a screen-local ORGANISM
│       ├── index.tsx
│       └── components/        # the organism's own parts (Title, Score, Tier, ...)
└── hooks/                     # screen-local stores/hooks (e.g. entryStore)
```

### Why `primitives/` is separate from `atoms/`

The `Themed*` components (`ThemedView`, `ThemedText`, `ThemedScrollView`,
`ThemedSafeAreaView`) are thin [Shopify Restyle](https://github.com/Shopify/restyle)
wrappers over raw React Native elements. They are the **substrate** atoms are
built from — analogous to raw HTML tags — not design-system atoms themselves.
Keeping them in their own layer prevents mixing pure theme primitives with
semantic atoms like `Button`. The theming itself lives in
[`src/constants/theme.ts`](../constants/theme.ts) and is consumed via
[`src/hooks/useTheme.ts`](../hooks/useTheme.ts).

### The global library uses atomic-level folders. Screens do not.

Only `src/components/` is split into `primitives / atoms / molecules / organisms /
templates`. Inside a screen, keep the existing feature-folder nesting under
`components/` — you don't recreate the atomic folders per screen.

---

## Decision tree — where does my component go?

Ask, in order:

1. Is it a Restyle wrapper of a raw RN element? → **`primitives/`**
2. Is it a single indivisible UI unit (nothing smaller inside)? → **atom**
3. Is it a small group of atoms doing one job? → **molecule**
4. Is it a complex, self-contained section made of molecules/atoms? → **organism**
5. Is it a page scaffold (safe-area, scroll container)? → **`templates/`**
6. Does it own real data / navigation / state? → it's a **screen** (page)

Then decide **global vs. screen-local** with the two rules below.

### Rule: promote on reuse

A component lives next to its screen (`src/screens/X/components/`) **until a
second screen needs it**. Only then promote it to the matching global level.
Default to local — avoid premature abstraction.

### Rule: the coupling gate

A component that imports a screen's store/hooks (e.g. `useEntryStore`) **cannot**
be promoted as-is. It must first be made **presentational**: data in via props,
events out via callbacks. This is why `DietaryScore` and its `Tier`/`Score` parts
stay in `NewEntry` — they read the entry store directly.

### Rule: screens are leaves

The shared library and a screen's local parts flow **into** screens, never the
reverse. A component in `src/components/` must never import from `src/screens/`.
Cross-screen shared *types* (today some live in `Diary.types.ts`) are a smell —
they belong in a neutral home (e.g. a future `src/types/`).

---

## Naming & imports

- **One folder per component**, with the implementation in `index.tsx`.
- Co-locate `Component.styles.ts` and `Component.types.ts` beside it.
- Each **level** folder owns a barrel `index.ts` doing `export * from './X'`.
  There is **no** aggregating `src/components/index.ts`.
- Import from the **specific level** (not a global barrel), using the `src/...`
  alias (avoid `@/src/...`):

```ts
import { ThemedView, ThemedText } from 'src/components/primitives';
import { Icon, Text } from 'src/components/atoms';
import { Pill } from 'src/components/molecules';
import { ScreenWrapper } from 'src/components/templates';
```

This keeps every import path self-documenting about a component's atomic level
and avoids a single monolithic barrel.

---

## Worked classification of existing components

Each row is the decision tree applied once — use it as a litmus test.

| Component | Level | Home | Note |
|---|---|---|---|
| `ThemedView` / `ThemedText` / `ThemedScrollView` / `ThemedSafeAreaView` | primitives | `src/components/primitives/` | Restyle substrate |
| `Icon`, `Text` | atom | `src/components/atoms/` | — |
| `PressableIcon` | atom | local (`NewEntry/.../Tier/`) | generic — promote if a 2nd screen uses it |
| `Pill` | molecule | `src/components/molecules/` | composes primitives |
| `ScreenWrapper` | template | `src/components/templates/` | safe-area + scroll scaffold |
| `DietaryScore` | organism | **local** (`NewEntry/components/`) | store-coupled → stays local |
| `Tier`, `Score`, `Title` (DietaryScore parts) | molecule / atom | local | need a presentational refactor before any promotion |
| `Header` (Diary / NewEntry / EntryDetail) | organism | local | screen-specific composition |

---

## Migration backlog

These follow the guidelines incrementally — no big-bang rewrite:

- [x] Rename folder `globals/` → `primitives/`.
- [x] Move `globals/Icon`, `globals/Text` → `atoms/`.
- [x] Move `buttons/Pill` → `molecules/`; retire the `buttons/` grouping.
- [x] Rename `layout/` → `templates/`.
- [x] Remove the aggregating top-level `src/components/index.ts` barrel.
- [x] Repoint all component imports at the specific level on the `src/...` alias.
- [ ] Normalize `Diary`'s `Component.tsx` files to the `index.tsx` convention.
- [ ] Make `Tier` / `Score` / `Reason` presentational (decouple from `entryStore`).
- [ ] Extract cross-screen shared types out of `Diary.types.ts` into a neutral home.
- [ ] Standardize the remaining non-component `@/src/...` imports on the `src/...` alias.
