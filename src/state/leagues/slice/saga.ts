import { call, put, takeLatest } from 'redux-saga/effects';
import { getLeagues } from 'services/backendClient';
import { leaguesActions as actions } from '.';

function* loadLeagues() {
  try {
    const leagues = yield call(getLeagues);
    yield put(actions.loadLeaguesSuccess(leagues));
  } catch (err) {
    if (err instanceof Error) {
      yield put(actions.loadLeaguesError(err.toString()));
    } else {
      yield put(actions.loadLeaguesError('An unknown error occured.'));
    }
  }
}

export function* leaguesSaga() {
  yield takeLatest(actions.loadLeagues.type, loadLeagues);
}
