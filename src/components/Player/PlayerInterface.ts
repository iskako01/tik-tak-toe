import { StaticImageData } from "next/image";
import { GameSymbolType } from "consts";

export interface Player {
  id: number;
  avatar: string | StaticImageData;
  name: string;
  rating: number;
  symbol: GameSymbolType;
}
