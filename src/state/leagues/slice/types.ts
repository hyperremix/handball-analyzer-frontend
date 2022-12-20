import { League } from '@model';

export type LeaguesState = {
  leagues: League[];
  isLoading: boolean;
  error: string | null;
};
