import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getLeagueTeams } from 'services/backendClient';
import { selectSelectedLeague } from 'state/leagues/slice/selectors';
import { handleSagaError } from 'utils';
import { teamsActions as actions } from '.';

function* loadTeams() {
  const selectedLeague = yield select(selectSelectedLeague);

  if (!selectedLeague) {
    return;
  }

  try {
    const teams = yield call(getLeagueTeams, selectedLeague.id);
    yield put(actions.loadTeamsSuccess(teams));
  } catch (err) {
    yield handleSagaError(err, actions.loadTeamsError);
  }
}

export function* teamsSaga() {
  yield takeLatest(actions.loadTeams.type, loadTeams);
}
