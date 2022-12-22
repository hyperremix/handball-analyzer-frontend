import { Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material';
import { ErrorDisplay } from 'app/components/common/ErrorDisplay';
import { NotFoundError } from 'app/components/common/NotFoundError';
import { GameResults } from 'app/components/GameResults';
import { Layout } from 'app/components/Layout';
import { LeagueTable } from 'app/components/LeagueTable';
import { TabPanel } from 'app/components/TabPanel';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectIsGameEventsLoading,
  selectLoadGameEventsError,
  selectPlayersGameEvents,
} from 'state/gameEvents/slice/selectors';
import {
  selectGames,
  selectIsGamesLoading,
  selectLoadGamesError,
} from 'state/games/slice/selectors';
import { leaguesActions } from 'state/leagues/slice';
import { selectSelectedLeague, selectSelectedSeason } from 'state/leagues/slice/selectors';
import {
  selectIsTeamsLoading,
  selectLoadTeamsError,
  selectTeams,
} from 'state/teams/slice/selectors';
import { a11yProps } from 'utils/a11yProps';

export const LeaguePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { seasonId, leagueId } = useParams();

  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedLeague = useSelector(selectSelectedLeague);
  const games = useSelector(selectGames);
  const isGamesLoading = useSelector(selectIsGamesLoading);
  const loadGamesError = useSelector(selectLoadGamesError);
  const teams = useSelector(selectTeams);
  const isTeamsLoading = useSelector(selectIsTeamsLoading);
  const loadTeamsError = useSelector(selectLoadTeamsError);
  const playersGameEvents = useSelector(selectPlayersGameEvents);
  const isGameEventsLoading = useSelector(selectIsGameEventsLoading);
  const gameEventsError = useSelector(selectLoadGameEventsError);

  const [selectedTab, setSelectedTab] = useState(0);

  const isLoading = useMemo(
    () => isGamesLoading || isTeamsLoading || isGameEventsLoading,
    [isGamesLoading, isTeamsLoading, isGameEventsLoading],
  );
  const errors = useMemo(() => {
    const errors: string[] = [];
    if (loadGamesError) {
      errors.push(loadGamesError);
    }
    if (loadTeamsError) {
      errors.push(loadTeamsError);
    }

    if (gameEventsError) {
      errors.push(gameEventsError);
    }
    return errors;
  }, [loadGamesError, loadTeamsError, gameEventsError]);

  useEffect(() => {
    dispatch(leaguesActions.loadAllLeagueData({ seasonId, leagueId }));
  }, [dispatch, seasonId, leagueId]);

  return (
    <Layout
      breadcrumbs={[
        { label: t(translations.dashboard), href: '/' },
        { label: selectedSeason ?? 'N/A', href: `/seasons/${selectedSeason?.replace('/', '-')}` },
        { label: selectedLeague?.slug ?? 'N/A' },
      ]}
      title={<Typography variant="h5">{`${selectedSeason} ${selectedLeague?.name}`}</Typography>}
      tabs={
        <Tabs value={selectedTab} onChange={(_, value) => setSelectedTab(value)} centered>
          <Tab label={t(translations.leagueTableHeader)} {...a11yProps(0)} />
          <Tab label={t(translations.resultsHeader)} {...a11yProps(1)} />
          <Tab label={t(translations.statisticsHeader)} {...a11yProps(2)} />
        </Tabs>
      }
    >
      {errors.length > 0 && (
        <Stack gap={1}>
          {errors.map((error) => (
            <ErrorDisplay key={error} error={error} />
          ))}
        </Stack>
      )}
      {isLoading ? (
        <LoadingView />
      ) : (
        <>
          <TabPanel value={selectedTab} index={0}>
            <LeagueTable teams={teams} />
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <GameResults games={games} />
          </TabPanel>
          <TabPanel value={selectedTab} index={2}></TabPanel>
        </>
      )}
      {games.length === 0 && teams.length === 0 && isLoading === false && <NotFoundError />}
    </Layout>
  );
};

const LoadingView = () => (
  <>
    <Skeleton variant="rectangular" animation="wave" height={64} />
    <Skeleton variant="rectangular" animation="wave" height={64} />
  </>
);
