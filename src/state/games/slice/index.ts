import { Game } from '@model';
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { gamesSaga } from './saga';
import { GamesState } from './types';

export const initialState: GamesState = {
  games: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    loadGames(state) {
      state.isLoading = true;
      state.error = null;
    },
    loadGamesSuccess(state, { payload: games }: PayloadAction<Game[]>) {
      state.isLoading = false;
      state.games = Object.entries(
        games.reduce((acc, game) => {
          const date = new Date(game.date).getTime();
          if (acc[date]) {
            acc[date] = [...acc[date], game];
            return acc;
          }

          acc[date] = [game];
          return acc;
        }, {} as Record<number, Game[]>),
      ).map(([date, games]) => ({
        date: new Date(Number(date)),
        games,
      }));
    },
    loadGamesError(state, { payload: error }: PayloadAction<string>) {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const { actions: gamesActions } = slice;

export const useGamesSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: gamesSaga });
  return { actions: slice.actions };
};