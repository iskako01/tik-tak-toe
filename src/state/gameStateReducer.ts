import { GameSymbols, GameSymbolType } from "consts";
import { MOVE_ORDER } from "lib/constants";
import { getNextMove } from "utils/getNextMove";
import {
  GameStateInterface,
  InitGameStateInterface,
  TimerInterface,
} from "./GameStateInterface";

export const GAME_STATE_ACTIONS = {
  CELL_CLICK: "cell-click",
} as const;

type GameActionType =
  (typeof GAME_STATE_ACTIONS)[keyof typeof GAME_STATE_ACTIONS];

interface GameActionInterface {
  type: GameActionType;
  index: number;
  now: number;
}

export const gameStateReducer = (
  state: GameStateInterface,
  action: GameActionInterface
) => {
  switch (action.type) {
    case GAME_STATE_ACTIONS.CELL_CLICK: {
      return cellClick(state, action.index, action.now);
    }
    default: {
      return state;
    }
  }
};

export const initGameState = ({
  playersCount,
  defaultTimer,
  currentMoveStart,
}: InitGameStateInterface) => {
  const timers: TimerInterface = MOVE_ORDER.reduce(
    (acc, symbol: GameSymbolType, index: number) => {
      if (index < playersCount) {
        acc[symbol] = defaultTimer;
      }
      return acc;
    },
    {} as TimerInterface
  );

  return {
    cells: new Array(17 * 17).fill(null),
    currentMove: GameSymbols.CROSS,
    lastMoveIndex: null,
    timers,
    currentMoveStart,
    playersCount,
  };
};

function cellClick(state: GameStateInterface, index: number, now: number) {
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
    timers: updateTimer(state, now),
  };
}

function updateCell(state: GameStateInterface, index: number) {
  return state.cells.map((cell, cellIndex) =>
    cellIndex === index ? state.currentMove : cell
  );
}

function updateTimer(state: GameStateInterface, now: number) {
  const diff = now - state.currentMoveStart;
  const timer = state.timers[state.currentMove];

  return {
    ...state.timers,
    [state.currentMove]: timer - diff,
  };
}
