import { League } from '@model';

export type LeaguesState = {
  leagues: Record<string, League[]>;
  isLoading: boolean | null;
  error: string | null;
  selectedSeason: string | null;
  selectedLeagueId: string | null;
};
