import { GameEvent, GameEventType } from '@model';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.gameEvents || initialState;

export const selectTeamsGameEvents = createSelector([selectSlice], (state) =>
  state.gameEvents.reduce((acc, gameEvent) => {
    if (acc[gameEvent.teamId]) {
      acc[gameEvent.teamId] = [...acc[gameEvent.teamId], gameEvent];
      return acc;
    }

    acc[gameEvent.teamId] = [gameEvent];
    return acc;
  }, {} as Record<string, GameEvent[]>),
);

export const selectPlayersGameEvents = createSelector([selectSlice], (state) =>
  state.gameEvents.reduce((acc, gameEvent) => {
    if (gameEvent.type === GameEventType.Timeout) {
      return acc;
    }

    if (acc[gameEvent.playerId]) {
      acc[gameEvent.playerId] = [...acc[gameEvent.playerId], gameEvent];
      return acc;
    }

    acc[gameEvent.playerId] = [gameEvent];
    return acc;
  }, {} as Record<string, GameEvent[]>),
);

export const selectGamesGameEvents = createSelector([selectSlice], (state) =>
  state.gameEvents.reduce((acc, gameEvent) => {
    if (acc[gameEvent.gameId]) {
      acc[gameEvent.gameId] = [...acc[gameEvent.gameId], gameEvent];
      return acc;
    }

    acc[gameEvent.gameId] = [gameEvent];
    return acc;
  }, {} as Record<string, GameEvent[]>),
);

export const selectIsGameEventsLoading = createSelector([selectSlice], (state) => state.isLoading);

export const selectLoadGameEventsError = createSelector([selectSlice], (state) => state.error);
