import { League } from '@model';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { leaguesSaga } from './saga';
import { LeaguesState } from './types';

export const initialState: LeaguesState = {
  leagues: {},
  isLoading: null,
  error: null,
  selectedSeason: null,
  selectedLeagueId: null,
};

const slice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    loadAllLeagueData(
      state,
      {
        payload: { leagueId, seasonId },
      }: PayloadAction<{ seasonId: string | undefined; leagueId: string | undefined }>,
    ) {
      if (seasonId) {
        state.selectedSeason = seasonId.replace('-', '/');
      }

      if (leagueId) {
        state.selectedLeagueId = leagueId;
      }
    },
    loadLeagues(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadLeaguesRedundant(state) {
      state.isLoading = false;
    },
    loadLeaguesSuccess(state, { payload: leagues }: PayloadAction<League[]>) {
      state.isLoading = false;
      state.leagues = leagues.reduce((acc, league) => {
        if (acc[league.season]) {
          acc[league.season] = [...acc[league.season], league];
          return acc;
        }

        acc[league.season] = [league];
        return acc;
      }, {} as Record<string, League[]>);
    },
    loadLeaguesError(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
    selectSeason(state, action: PayloadAction<string | undefined>) {
      state.selectedSeason = action.payload ? action.payload.replace('-', '/') : null;
    },
    selectLeague(state, action: PayloadAction<string>) {
      state.selectedLeagueId = action.payload;
    },
  },
});

export const { actions: leaguesActions } = slice;

export const useLeaguesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: leaguesSaga });
  return { actions: slice.actions };
};
