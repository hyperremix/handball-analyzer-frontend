import { League, Team } from '@model';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getLeagueTeams } from 'services/backendClient';
import { selectSelectedLeague } from 'state/leagues/slice/selectors';
import { handleSagaError } from 'utils';
import { teamsActions as actions } from '.';
import { selectTeams } from './selectors';

function* loadTeams() {
  const selectedLeague: League | undefined = yield select(selectSelectedLeague);
  const existingTeams: Team[] = yield select(selectTeams);

  if (!selectedLeague || existingTeams.length > 0) {
    yield put(actions.loadTeamsRedundant());
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
