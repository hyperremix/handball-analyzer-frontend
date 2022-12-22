import { GameEvent } from '@model';

export type GameEventsState = {
  gameEvents: GameEvent[];
  isLoading: boolean | null;
  error: string | null;
};
