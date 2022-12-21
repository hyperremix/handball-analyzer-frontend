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
    loadLeagues(state) {
      state.isLoading = true;
      state.error = null;
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
    selectSeason(state, action: PayloadAction<string>) {
      state.selectedSeason = action.payload;
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