import { Skeleton, Stack, Typography } from '@mui/material';
import { ErrorDisplay } from 'app/components/common/ErrorDisplay';
import { NotFoundError } from 'app/components/common/NotFoundError';
import { GameResults } from 'app/components/GameResults';
import { Layout } from 'app/components/Layout';
import { LeagueTable } from 'app/components/LeagueTable';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useGamesSlice } from 'state/games/slice';
import {
  selectGames,
  selectIsGamesLoading,
  selectLoadGamesError,
} from 'state/games/slice/selectors';
import { selectSelectedLeague, selectSelectedSeason } from 'state/leagues/slice/selectors';
import { useTeamsSlice } from 'state/teams/slice';
import {
  selectIsTeamsLoading,
  selectLoadTeamsError,
  selectTeams,
} from 'state/teams/slice/selectors';

export const LeaguePage = () => {
  const { actions: gamesActions } = useGamesSlice();
  const { actions: teamsActions } = useTeamsSlice();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedLeague = useSelector(selectSelectedLeague);
  const games = useSelector(selectGames);
  const isGamesLoading = useSelector(selectIsGamesLoading);
  const loadGamesError = useSelector(selectLoadGamesError);
  const teams = useSelector(selectTeams);
  const isTeamsLoading = useSelector(selectIsTeamsLoading);
  const loadTeamsError = useSelector(selectLoadTeamsError);

  const isLoading = useMemo(
    () => isGamesLoading || isTeamsLoading,
    [isGamesLoading, isTeamsLoading],
  );
  const errors = useMemo(() => {
    const errors: string[] = [];
    if (loadGamesError) {
      errors.push(loadGamesError);
    }
    if (loadTeamsError) {
      errors.push(loadTeamsError);
    }
    return errors;
  }, [loadGamesError, loadTeamsError]);

  useEffect(() => {
    if (games.length === 0) {
      dispatch(gamesActions.loadGames());
    }
    if (teams.length === 0) {
      dispatch(teamsActions.loadTeams());
    }
  }, [dispatch, gamesActions, games, teamsActions, teams]);

  return (
    <Layout
      breadcrumbs={[
        { label: t(translations.dashboard), href: '/' },
        { label: selectedSeason ?? 'N/A', href: `/seasons/${selectedSeason?.replace('/', '-')}` },
        { label: selectedLeague?.slug ?? 'N/A' },
      ]}
    >
      {errors.length > 0 && (
        <Stack gap={1}>
          {errors.map((error) => (
            <ErrorDisplay key={error} error={error} />
          ))}
        </Stack>
      )}
      <Stack gap={3}>
        <Stack alignItems="center">
          <Typography variant="h3">{`${selectedSeason} ${selectedLeague?.name}`}</Typography>
        </Stack>
        {isLoading ? (
          <LoadingView />
        ) : (
          <Stack gap={8}>
            <LeagueTable teams={teams} />
            <GameResults games={games} />
          </Stack>
        )}
        {games.length === 0 && teams.length === 0 && isLoading === false && <NotFoundError />}
      </Stack>
    </Layout>
  );
};

const LoadingView = () => (
  <>
    <Skeleton variant="rectangular" animation="wave" height={64} />
    <Skeleton variant="rectangular" animation="wave" height={64} />
  </>
);
