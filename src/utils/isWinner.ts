import { Game } from '@model';

export const isWinner = (game?: Game, teamId?: string) =>
  game && teamId === game.winnerTeamId && game.fulltimeScore.home !== game.fulltimeScore.away;
