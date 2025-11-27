import { GameSymbols, GameSymbolType } from "consts";
import { MOVE_ORDER } from "lib/constants";
import { getNextMove } from "utils/getNextMove";
import { create } from "zustand";

export type State = {
  cells: (GameSymbolType | null)[];
  currentMove: GameSymbolType;
  currentMoveStart: number;
  lastMoveIndex: number | null;
  timers: Record<GameSymbolType, number> | null;
  playersCount: number;
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
  timers: {},
  playersCount: 2,
  currentMoveStart: 0,

  initGameState: (playersCount, defaultTimer, currentMoveStart) =>
    set((state) =>
      initGameState(state, playersCount, defaultTimer, currentMoveStart)
    ),
  cellClick: (index, now) => set((state) => cellClick(state, index, now)),
  handleTick: (now) => set((state) => handleTick(state, now)),
}));

export const initGameState = (
  state,
  playersCount: number,
  defaultTimer: number,
  currentMoveStart: number
): State => ({
  ...state,
  cells: new Array(19 * 19).fill(null),
  currentMove: GameSymbols.CROSS,
  currentMoveStart,
  playersCount,
  timers: MOVE_ORDER.reduce((timers, symbol, index) => {
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

  return {
    ...state,
    cells: updateCell(state, index),
    currentMove: getNextMove(
      state.currentMove,
      state.playersCount,
      state.timers
    ),
    currentMoveStart: now,
    lastMoveIndex: index,
    timers: updateTimers(state, now),
  };
}

function handleTick(state: State, now: number) {
  console.log(isTimeOver(state, now), { state });

  if (!isTimeOver(state, now)) {
    return state;
  }

  return {
    ...state,
    timers: updateTimers(state, now),
    currentMoveStart: now,
    currentMove: getNextMove(
      state.currentMove,
      state.playersCount,
      state.timers
    ),
  };
}

function updateCell(state: State, index: number) {
  return state.cells.map((cell, cellIndex) =>
    cellIndex === index ? state.currentMove : cell
  );
}

function updateTimers(state: State, now: number) {
  if (!state.timers) {
    return state.timers;
  }
  console.log({
    currentMoveStart: state.currentMoveStart,
    currentMove: state.timers[state.currentMove],
  });

  const diff = now - state.currentMoveStart;
  const timer = state.timers[state.currentMove];

  return {
    ...state.timers,
    [state.currentMove]: timer - diff,
  };
}

function isTimeOver(state: State, now: number) {
  const updatedTimers = updateTimers(state, now);
  const timer = updatedTimers[state.currentMove];

  return timer <= 0;
}
