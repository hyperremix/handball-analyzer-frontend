import { Team } from '@model';

export type TeamsState = {
  teams: Team[];
  isLoading: boolean | null;
  error: string | null;
};
