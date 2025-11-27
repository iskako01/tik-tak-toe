import { GameSymbolType } from "consts";

export function computeWinner(
  cells: (GameSymbolType | null)[],
  lastMoveIndex: number | null,
  sequenceSize = 3, // Winning sequence length
  fieldSize = 17 // Board size
) {
  const directions = [
    { dx: 1, dy: 0 }, // Horizontal (→)
    { dx: 0, dy: 1 }, // Vertical (↓)
    { dx: 1, dy: 1 }, // Diagonal (\)
    { dx: 1, dy: -1 }, // Diagonal (/)
  ];

  if (!lastMoveIndex) {
    return [];
  }

  const player = cells[lastMoveIndex];
  const positions = [lastMoveIndex];

  if (!player) {
    return []; // No need to check if the cell is empty
  }

  for (const { dx, dy } of directions) {
    let count = 1;

    for (const dir of [-1, 1]) {
      let step = 1;
      while (count < sequenceSize) {
        const newRow = Math.floor(lastMoveIndex / fieldSize) + dir * step * dy;
        const newCol = (lastMoveIndex % fieldSize) + dir * step * dx;

        // Out of board boundaries
        if (
          newRow < 0 ||
          newRow >= fieldSize ||
          newCol < 0 ||
          newCol >= fieldSize
        ) {
          break;
        }

        const newIndex = newRow * fieldSize + newCol;

        if (cells[newIndex] === player) {
          count++;
          positions.push(newIndex);
        } else {
          break; // Sequence broken
        }

        step++;
      }
    }

    if (count >= sequenceSize) return positions; // Found a winner
  }

  return [];
}
