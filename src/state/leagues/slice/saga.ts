import { call, put, takeLatest } from 'redux-saga/effects';
import { getLeagues } from 'services/backendClient';
import { handleSagaError } from 'utils';
import { leaguesActions as actions } from '.';

function* loadLeagues() {
  try {
    const leagues = yield call(getLeagues);
    yield put(actions.loadLeaguesSuccess(leagues));
  } catch (err) {
    yield handleSagaError(err, actions.loadLeaguesError);
  }
}

export function* leaguesSaga() {
  yield takeLatest(actions.loadLeagues.type, loadLeagues);
}
