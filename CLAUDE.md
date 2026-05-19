# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start development server (http://localhost:3000)
pnpm build      # Production build
pnpm lint       # Run ESLint
```

There are no tests configured in this project.

## Architecture

This is a **Next.js 15 App Router** tic-tac-toe game with React 19, TypeScript, Tailwind CSS, Sass, and Zustand for state management.

### Path Aliases

`tsconfig.json` sets `baseUrl: "src"`, enabling bare imports like `import { computeWinner } from "utils/computeWinner"`. Two additional aliases exist: `@components/*` → `src/components/*` and `@/*` → `src/*`.

### State Management

Game state lives in a **Zustand store** at `src/store/gameStore.ts`. The store holds:
- `cells`: flat array of `(GameSymbolType | null)[]` representing the 19×19 board
- `currentMove`: which symbol's turn it is (`cross | zero | triangle | square`)
- `timers`: per-symbol countdown timers in milliseconds
- `currentMoveStart`: timestamp when the current move began

Key actions: `initGameState`, `cellClick(index, now)`, `handleTick(now)` — all take `Date.now()` as `now` so time logic is pure.

> Note: `src/state/gameStateReducer.ts` is an older unused reducer implementation (17×17 board). The active store uses a 19×19 board. Don't confuse them.

### Game Logic Utilities

- `src/utils/computeWinner.ts` — checks for a winning sequence of length 3 starting from `lastMoveIndex` in 4 directions on a 17×17 field. Returns the winning cell indices or `[]`.
- `src/utils/getNextMove.ts` — advances `currentMove` through `MOVE_ORDER`, skipping players whose timer hit 0 (time-out = automatic loss of turn forever).
- `src/utils/computePlayerTimer.ts` — timer display helper.
- `src/consts/index.ts` — `GameSymbols` enum (`cross`, `zero`, `triangle`, `square`) and `GameSymbolType`.
- `src/lib/constants.ts` — `MOVE_ORDER` array defining turn sequence (supports 2–4 players).

### Component Tree

```
app/layout.tsx          ← Header + <main> wrapper (max-w-640px)
app/page.tsx            ← renders <Game>
components/Game/index.tsx   ← root game component; owns player list, winner detection
  ├─ Game/Title.tsx
  ├─ Game/Info.tsx          ← delegates to Player/List
  │    └─ Player/List → Player/Item → Player/Info, Timer
  ├─ Game/Field.tsx         ← renders Cells
  │    └─ Game/Cells → Game/Cell
  └─ Modals/Winner.tsx      ← currently commented out in Game/index
components/UiKit/       ← generic UI primitives (UiButton, UiModal, UiInputField, …)
components/Header/      ← top nav with Profile
```

### Hooks

- `src/hooks/useInterval.ts` — drives the per-second `handleTick` call in `Game/index.tsx`.
- `src/hooks/useNow.ts` — returns a live `Date.now()` value.

### Styling

Tailwind CSS (v3) + Sass. Global styles in `src/app/globals.css`. CSS variables `--background` and `--foreground` are extended in `tailwind.config.ts`.

### Multi-player Support

The game supports 2–4 players. `playersCount` is hardcoded to `2` in `Game/index.tsx`. `MOVE_ORDER` cycles through `[cross, zero, triangle, square]`; `initGameState` slices it to `playersCount`. Player objects and timer records are keyed by `GameSymbolType`.
