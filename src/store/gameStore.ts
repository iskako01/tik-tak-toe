import { GameSymbols, GameSymbolType } from "consts";
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
  playerSymbols: GameSymbolType[];
  winSequenceSize: number;
  fieldSize: number;
  isStarted: boolean;
  isDraw: boolean;
};

type Actions = {
  initGameState: (
    playersCount: number,
    defaultTimer: number,
    currentMoveStart: number
  ) => void;
  cellClick: (index: number, now: number) => void;
  handleTick: (now: number) => void;
  setPlayerSymbol: (playerIndex: number, symbol: GameSymbolType) => void;
  setWinSequenceSize: (size: number) => void;
  setFieldSize: (size: number) => void;
  setWinOption: (sequence: number, fieldSize: number, currentMoveStart: number) => void;
  declareDraw: () => void;
  surrender: (now: number) => void;
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
  playerSymbols: [GameSymbols.CROSS, GameSymbols.ZERO],
  winSequenceSize: 3,
  fieldSize: 3,
  isStarted: false,
  isDraw: false,

  initGameState: (playersCount, defaultTimer, currentMoveStart) =>
    set((state) =>
      initGameState(state, playersCount, defaultTimer, currentMoveStart)
    ),
  cellClick: (index, now) => set((state) => cellClick(state, index, now)),
  handleTick: (now) => set((state) => handleTick(state, now)),
  setPlayerSymbol: (playerIndex, symbol) =>
    set((state) => {
      const playerSymbols = [...state.playerSymbols];
      playerSymbols[playerIndex] = symbol;
      return { playerSymbols };
    }),
  setWinSequenceSize: (size) => set({ winSequenceSize: size }),
  setFieldSize: (size) => set({ fieldSize: size }),
  setWinOption: (sequence, fieldSize, currentMoveStart) =>
    set((state) => {
      const updated = { ...state, winSequenceSize: sequence, fieldSize };
      return state.isStarted
        ? initGameState(updated, updated.playersCount, updated.defaultTimer, currentMoveStart)
        : { winSequenceSize: sequence, fieldSize };
    }),
  declareDraw: () => set({ isDraw: true }),
  surrender: (now) => set((state) => {
    if (!state.timers) return state;
    return {
      ...state,
      finalTimers: { ...state.finalTimers, [state.currentMove]: 0 },
      timers: { ...state.timers, [state.currentMove]: 0 },
      currentMoveStart: now,
    };
  }),
}));

export const initGameState = (
  state: State,
  playersCount: number,
  defaultTimer: number,
  currentMoveStart: number
): State => {
  const symbols = state.playerSymbols.slice(0, playersCount);
  return {
    ...state,
    cells: new Array(state.fieldSize * state.fieldSize).fill(null),
    currentMove: symbols[0],
    currentMoveStart,
    playersCount,
    defaultTimer,
    finalTimers: null,
    isStarted: true,
    isDraw: false,
    timers: symbols.reduce<Timers>((timers, symbol) => {
      timers[symbol] = defaultTimer;
      return timers;
    }, {}),
  };
};

function cellClick(state: State, index: number, now: number): State {
  if (state.cells[index]) {
    return state;
  }

  const nextMove = getNextMove(state.currentMove, state.playersCount, state.timers, state.playerSymbols);
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

  const timersWithZero: Timers = { ...state.timers, [state.currentMove]: 0 };
  const nextMove = getNextMove(state.currentMove, state.playersCount, timersWithZero, state.playerSymbols);

  return {
    ...state,
    finalTimers: { ...state.finalTimers, [state.currentMove]: 0 },
    timers: { ...timersWithZero, [nextMove]: state.defaultTimer },
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
