import { GameEventsState } from 'state/gameEvents/slice/types';
import { GamesState } from 'state/games/slice/types';
import { LeaguesState } from 'state/leagues/slice/types';
import { TeamsState } from 'state/teams/slice/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  leagues?: LeaguesState;
  games?: GamesState;
  teams?: TeamsState;
  gameEvents?: GameEventsState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
