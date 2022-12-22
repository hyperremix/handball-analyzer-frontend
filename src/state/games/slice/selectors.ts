import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.games || initialState;

export const selectGames = createSelector([selectSlice], (state) => state.games);

export const selectIsGamesLoading = createSelector([selectSlice], (state) => state.isLoading);

export const selectLoadGamesError = createSelector([selectSlice], (state) => state.error);

export const selectSelectedGame = createSelector([selectSlice], (state) =>
  state.games.flatMap((games) => games.games).find((game) => game.id === state.selectedGameId),
);
