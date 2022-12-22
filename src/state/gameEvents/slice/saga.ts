import { GameEvent, League } from '@model';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getLeagueGameEvents } from 'services/backendClient';
import { selectSelectedLeague } from 'state/leagues/slice/selectors';
import { handleSagaError } from 'utils';
import { gameEventsActions as actions } from '.';
import { selectPlayersGameEvents } from './selectors';

function* loadGameEvents() {
  const selectedLeague: League | undefined = yield select(selectSelectedLeague);
  const existingGameEvents: Record<string, GameEvent[]> = yield select(selectPlayersGameEvents);

  if (!selectedLeague || Object.keys(existingGameEvents).length > 0) {
    yield put(actions.loadGameEventsRedundant());
    return;
  }

  try {
    const gameEvents = yield call(getLeagueGameEvents, selectedLeague.id);
    yield put(actions.loadGameEventsSuccess(gameEvents));
  } catch (err) {
    yield handleSagaError(err, actions.loadGameEventsError);
  }
}

export function* gameEventsSaga() {
  yield takeLatest(actions.loadGameEvents.type, loadGameEvents);
}
