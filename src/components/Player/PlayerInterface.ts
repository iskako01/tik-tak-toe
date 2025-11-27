import { GameSymbolType } from "consts";

export interface Player {
  id: number;
  avatar: string;
  name: string;
  rating: number;
  symbol: GameSymbolType;
}
