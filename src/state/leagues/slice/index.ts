import { League } from '@model';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { leaguesSaga } from './saga';
import { LeaguesState } from './types';

export const initialState: LeaguesState = {
  leagues: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    loadLeagues(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadLeaguesSuccess(state, action: PayloadAction<League[]>) {
      state.isLoading = false;
      state.leagues = action.payload;
    },
    loadLeaguesError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { actions: leaguesActions } = slice;

export const useLeaguesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: leaguesSaga });
  return { actions: slice.actions };
};
