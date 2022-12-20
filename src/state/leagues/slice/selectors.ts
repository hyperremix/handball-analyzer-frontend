import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.leagues || initialState;

export const selectLeagues = createSelector([selectSlice], (state) => state.leagues);

export const selectIsLeaguesLoading = createSelector([selectSlice], (state) => state.isLoading);

export const selectGetLeaguesError = createSelector([selectSlice], (state) => state.error);
