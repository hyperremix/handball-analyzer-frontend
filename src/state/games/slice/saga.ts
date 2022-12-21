import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getLeagueGames } from 'services/backendClient';
import { selectSelectedLeague } from 'state/leagues/slice/selectors';
import { handleSagaError } from 'utils';
import { gamesActions as actions } from '.';

function* loadGames() {
  const selectedLeague = yield select(selectSelectedLeague);

  if (!selectedLeague) {
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
