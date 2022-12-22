import { Game, League } from '@model';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getLeagueGames } from 'services/backendClient';
import { selectSelectedLeague } from 'state/leagues/slice/selectors';
import { handleSagaError } from 'utils';
import { gamesActions as actions } from '.';
import { selectGames } from './selectors';

function* loadGames() {
  const selectedLeague: League | undefined = yield select(selectSelectedLeague);
  const existingGames: Game[] = yield select(selectGames);

  if (!selectedLeague || existingGames.length > 0) {
    yield put(actions.loadGamesRedundant());
    return;
  }

  try {
    const games = yield call(getLeagueGames, selectedLeague.id);
    yield put(actions.loadGamesSuccess(games));
  } catch (err) {
    yield handleSagaError(err, actions.loadGamesError);
  }
}

export function* gamesSaga() {
  yield takeLatest(actions.loadGames.type, loadGames);
}
