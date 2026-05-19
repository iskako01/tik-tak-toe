"use client";

import UiModal from "@components/UiKit/UiModal";
import UiButton from "@components/UiKit/UiButton";
import Icon from "@components/Icon";
import { GameSymbols, GameSymbolType } from "consts";
import { useGameStore } from "store/gameStore";
import clsx from "clsx";

const WIN_OPTIONS = [
  { sequence: 3, fieldSize: 3 },
  { sequence: 4, fieldSize: 7 },
  { sequence: 5, fieldSize: 15 },
] as const;

const ALL_SYMBOLS: GameSymbolType[] = [
  GameSymbols.CROSS,
  GameSymbols.ZERO,
  GameSymbols.TRIANGLE,
  GameSymbols.SQUARE,
];

const SYMBOL_LABELS: Record<GameSymbolType, string> = {
  cross: "Cross",
  zero: "Circle",
  triangle: "Triangle",
  square: "Square",
};

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameSettingsModal({ isOpen, onClose }: GameSettingsModalProps) {
  const playerSymbols = useGameStore((state) => state.playerSymbols);
  const playersCount = useGameStore((state) => state.playersCount);
  const setPlayerSymbol = useGameStore((state) => state.setPlayerSymbol);
  const winSequenceSize = useGameStore((state) => state.winSequenceSize);
  const setWinOption = useGameStore((state) => state.setWinOption);
  const isStarted = useGameStore((state) => state.isStarted);
  const initGameState = useGameStore((state) => state.initGameState);
  const defaultTimer = useGameStore((state) => state.defaultTimer);

  function handleWinOption(sequence: number, fieldSize: number) {
    setWinOption(sequence, fieldSize, Date.now());
  }

  function handleSelect(playerIndex: number, symbol: GameSymbolType) {
    const conflictIndex = playerSymbols.indexOf(symbol);
    if (conflictIndex !== -1 && conflictIndex !== playerIndex) {
      setPlayerSymbol(conflictIndex, playerSymbols[playerIndex]);
    }
    setPlayerSymbol(playerIndex, symbol);
    if (isStarted) {
      initGameState(playersCount, defaultTimer, Date.now());
    }
  }

  return (
    <UiModal isOpen={isOpen} onClose={onClose}>
      <UiModal.Header>Game Settings</UiModal.Header>
      <UiModal.Body>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-slate-500">Win condition</span>
            <div className="flex gap-3">
              {WIN_OPTIONS.map(({ sequence, fieldSize }) => (
                <button
                  key={sequence}
                  onClick={() => handleWinOption(sequence, fieldSize)}
                  className={clsx(
                    "flex flex-col items-center px-5 py-3 rounded-lg border-2 text-sm font-semibold transition-colors",
                    winSequenceSize === sequence
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-slate-200 text-slate-600 hover:border-teal-300"
                  )}
                >
                  <span>{sequence} in a row</span>
                  <span className="text-xs font-normal text-slate-400">{fieldSize}×{fieldSize}</span>
                </button>
              ))}
            </div>
          </div>

          {Array.from({ length: playersCount }, (_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-500">Player {i + 1}</span>
              <div className="flex gap-3">
                {ALL_SYMBOLS.map((symbol) => {
                  const isSelected = playerSymbols[i] === symbol;
                  return (
                    <button
                      key={symbol}
                      onClick={() => handleSelect(i, symbol)}
                      className={clsx(
                        "flex flex-col items-center gap-1 px-4 py-3 rounded-lg border-2 transition-colors",
                        isSelected
                          ? "border-teal-600 bg-teal-50"
                          : "border-slate-200 hover:border-teal-300"
                      )}
                    >
                      <Icon iconName={symbol} width={28} height={28} />
                      <span className="text-xs text-slate-600">{SYMBOL_LABELS[symbol]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </UiModal.Body>
      <UiModal.Footer>
        <UiButton handleClick={onClose}>Done</UiButton>
      </UiModal.Footer>
    </UiModal>
  );
}
