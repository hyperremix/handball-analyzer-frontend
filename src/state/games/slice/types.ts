import { TGroupedGames } from './TGroupedGames';

export type GamesState = {
  games: TGroupedGames[];
  isLoading: boolean;
  error: string | null;
  selectedGameId: string | null;
};
