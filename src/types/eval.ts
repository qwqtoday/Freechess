import { Move } from "chess.js";
import { EngineName, MoveClassification } from "./enums";

export interface PositionEval {
  bestMove?: string;
  moveClassification?: MoveClassification;
  opening?: string;
  lines: LineEval[];
}

export interface LineEval {
  pv: string[];
  cp?: number;
  mate?: number;
  depth: number;
  multiPv: number;
}

export interface Accuracy {
  white: number;
  black: number;
}

export interface EngineSettings {
  engine: EngineName;
  depth: number;
  multiPv: number;
  date: string;
}

export interface GameEval {
  positions: PositionEval[];
  accuracy: Accuracy;
  settings: EngineSettings;
  averageCentipawnLoss?: number; // Add this line to store the average centipawn loss
}

export function calculateAverageCentipawnLoss(gameEval: GameEval): number {
  let totalCentipawnLoss = 0;
  let moveCount = 0;

  gameEval.positions.forEach((position, index) => {
    if (position.lines.length > 0) {
      const bestMoveCp = position.lines[0].cp || 0; // Best move's centipawn value
      const playedMoveCp = position.lines.find(line => line.pv.includes(position.bestMove || ''))?.cp || 0; // Played move's centipawn value

      const centipawnLoss = Math.abs(bestMoveCp - playedMoveCp);
      totalCentipawnLoss += centipawnLoss;
      moveCount++;
    }
  });

  return moveCount > 0 ? totalCentipawnLoss / moveCount : 0;
}

export function calculateEstimatedRating(averageCentipawnLoss: number): number {
  // This is a simple estimation formula. You can adjust it based on your needs.
  return Math.max(0, 2500 - averageCentipawnLoss * 10);
}

export interface EvaluatePositionWithUpdateParams {
  fen: string;
  depth?: number;
  multiPv?: number;
  setPartialEval?: (positionEval: PositionEval) => void;
}

export interface CurrentPosition {
  lastMove?: Move;
  eval?: PositionEval;
  lastEval?: PositionEval;
  currentMoveIdx?: number;
}

export interface EvaluateGameParams {
  fens: string[];
  uciMoves: string[];
  depth?: number;
  multiPv?: number;
  setEvaluationProgress?: (value: number) => void;
}

export interface SavedEval {
  bestMove?: string;
  lines: LineEval[];
  engine: EngineName;
}

export type SavedEvals = Record<string, SavedEval | undefined>;
