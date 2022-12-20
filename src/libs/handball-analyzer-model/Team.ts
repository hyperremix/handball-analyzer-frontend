import { Player } from './Player';

export type Team = {
  id: string;
  leagueId: string;
  name: string;
  coaches: string[];
  players: Player[];
};
