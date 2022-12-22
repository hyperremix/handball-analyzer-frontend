import { GameEvent } from '@model';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { gameEventsSaga } from './saga';
import { GameEventsState } from './types';

export const initialState: GameEventsState = {
  gameEvents: [],
  isLoading: null,
  error: null,
};

const slice = createSlice({
  name: 'gameEvents',
  initialState,
  reducers: {
    loadGameEvents(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadGameEventsRedundant(state) {
      state.isLoading = false;
    },
    loadGameEventsSuccess(state, { payload: gameEvents }: PayloadAction<GameEvent[]>) {
      state.isLoading = false;
      state.gameEvents = gameEvents;
    },
    loadGameEventsError(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const { actions: gameEventsActions } = slice;

export const useGameEventsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: gameEventsSaga });
  return { actions: slice.actions };
};
