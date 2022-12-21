import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.leagues || initialState;

export const selectLeagues = createSelector([selectSlice], (state) => state.leagues);

export const selectIsLeaguesLoading = createSelector([selectSlice], (state) => state.isLoading);

export const selectLoadLeaguesError = createSelector([selectSlice], (state) => state.error);

export const selectSelectedSeason = createSelector([selectSlice], (state) => state.selectedSeason);

export const selectSelectedSeasonLeagues = createSelector([selectSlice], (state) =>
  state.selectedSeason ? state.leagues[state.selectedSeason] || [] : [],
);

export const selectSelectedLeague = createSelector(
  [selectSlice, selectSelectedSeasonLeagues],
  (state, leagues) => leagues.find((league) => league.id === state.selectedLeagueId),
);
