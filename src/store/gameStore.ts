import { GameSymbols, GameSymbolType } from "consts";
import { MOVE_ORDER } from "lib/constants";
import { getNextMove } from "utils/getNextMove";
import { create } from "zustand";

type Timers = Partial<Record<GameSymbolType, number>>;

export type State = {
  cells: (GameSymbolType | null)[];
  currentMove: GameSymbolType;
  currentMoveStart: number;
  lastMoveIndex: number | null;
  timers: Timers | null;
  finalTimers: Timers | null;
  playersCount: number;
  defaultTimer: number;
};

type Actions = {
  initGameState: (
    playersCount: number,
    defaultTimer: number,
    currentMoveStart: number
  ) => void;
  cellClick: (index: number, now: number) => void;
  handleTick: (now: number) => void;
};

export const useGameStore = create<State & Actions>((set) => ({
  cells: [],
  currentMove: GameSymbols.CROSS,
  lastMoveIndex: null,
  timers: null,
  finalTimers: null,
  playersCount: 2,
  currentMoveStart: 0,
  defaultTimer: 10000,

  initGameState: (playersCount, defaultTimer, currentMoveStart) =>
    set((state) =>
      initGameState(state, playersCount, defaultTimer, currentMoveStart)
    ),
  cellClick: (index, now) => set((state) => cellClick(state, index, now)),
  handleTick: (now) => set((state) => handleTick(state, now)),
}));

export const initGameState = (
  state: State,
  playersCount: number,
  defaultTimer: number,
  currentMoveStart: number
): State => ({
  ...state,
  cells: new Array(19 * 19).fill(null),
  currentMove: GameSymbols.CROSS,
  currentMoveStart,
  playersCount,
  defaultTimer,
  finalTimers: null,
  timers: MOVE_ORDER.reduce<Timers>((timers, symbol, index) => {
    if (index < playersCount) {
      timers[symbol] = defaultTimer;
    }
    return timers;
  }, {}),
});

function cellClick(state: State, index: number, now: number): State {
  if (state.cells[index]) {
    return state;
  }

  const nextMove = getNextMove(state.currentMove, state.playersCount, state.timers);
  const elapsed = now - state.currentMoveStart;
  const remaining = Math.max((state.timers?.[state.currentMove] ?? state.defaultTimer) - elapsed, 0);

  return {
    ...state,
    cells: updateCell(state, index),
    currentMove: nextMove,
    currentMoveStart: now,
    lastMoveIndex: index,
    finalTimers: { ...state.finalTimers, [state.currentMove]: remaining },
    timers: resetNextTimer(state, nextMove),
  };
}

function handleTick(state: State, now: number) {
  if (!isTimeOver(state, now)) {
    return state;
  }

  const nextMove = getNextMove(state.currentMove, state.playersCount, state.timers);

  return {
    ...state,
    finalTimers: { ...state.finalTimers, [state.currentMove]: 0 },
    timers: resetNextTimer(state, nextMove),
    currentMoveStart: now,
    currentMove: nextMove,
  };
}

function updateCell(state: State, index: number) {
  return state.cells.map((cell, cellIndex) =>
    cellIndex === index ? state.currentMove : cell
  );
}

function resetNextTimer(state: State, nextMove: GameSymbolType): Timers | null {
  if (!state.timers) {
    return state.timers;
  }

  return {
    ...state.timers,
    [nextMove]: state.defaultTimer,
  };
}

function isTimeOver(state: State, now: number) {
  if (!state.timers) return false;
  const elapsed = now - state.currentMoveStart;
  const timer = state.timers[state.currentMove] ?? 0;

  return timer - elapsed <= 0;
}
