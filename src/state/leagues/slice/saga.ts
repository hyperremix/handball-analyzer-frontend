import { League } from '@model';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getLeagues } from 'services/backendClient';
import { gameEventsActions } from 'state/gameEvents/slice';
import { gamesActions } from 'state/games/slice';
import { teamsActions } from 'state/teams/slice';
import { handleSagaError } from 'utils';
import { leaguesActions as actions } from '.';
import { selectLeagues } from './selectors';

function* loadLeagues() {
  const existingLeagues: League[] = yield select(selectLeagues);

  if (Object.keys(existingLeagues).length > 0) {
    yield put(actions.loadLeaguesRedundant());
    return;
  }

  try {
    const leagues = yield call(getLeagues);
    yield put(actions.loadLeaguesSuccess(leagues));
  } catch (err) {
    yield handleSagaError(err, actions.loadLeaguesError);
  }
}

function* loadAllLeagueData() {
  yield call(loadLeagues);
  yield put(gamesActions.loadGames());
  yield put(teamsActions.loadTeams());
  yield put(gameEventsActions.loadGameEvents());
}

export function* leaguesSaga() {
  yield takeLatest(actions.loadLeagues.type, loadLeagues);
  yield takeLatest(actions.loadAllLeagueData.type, loadAllLeagueData);
}
