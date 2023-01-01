import { Team } from '@model';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { calculatePoints } from 'utils/calculatePoints';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { teamsSaga } from './saga';
import { TeamsState } from './types';

export const initialState: TeamsState = {
  teams: [],
  isLoading: null,
  error: null,
};

const slice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    loadTeams(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadTeamsRedundant(state) {
      state.isLoading = false;
    },
    loadTeamsSuccess(state, { payload: teams }: PayloadAction<Team[]>) {
      state.isLoading = false;
      state.teams = teams;
      state.teams.sort((a, b) => {
        const aPoints = calculatePoints(a.stats);
        const bPoints = calculatePoints(b.stats);
        return bPoints.for - aPoints.for || bPoints.against - aPoints.against;
      });
    },
    loadTeamsError(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const { actions: teamsActions } = slice;

export const useTeamsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: teamsSaga });
  return { actions: slice.actions };
};
