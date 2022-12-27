import { GameEventType } from '@model';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { GameEventDisplay } from 'app/components/GameEvents/GameEventDisplay';
import { GameResultRow } from 'app/components/GameResults/GameResultRow';
import { HalftimeSummary } from 'app/components/HalftimeSummary';
import { Layout } from 'app/components/Layout';
import { TabPanel } from 'app/components/TabPanel';
import { TeamsRosters } from 'app/components/TeamsRosters';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectGamesGameEvents, selectIsGameEventsLoading } from 'state/gameEvents/slice/selectors';
import { TEnrichedGameEvent } from 'state/gameEvents/slice/TEnrichedGameEvent';
import { gamesActions } from 'state/games/slice';
import { selectIsGamesLoading, selectSelectedGame } from 'state/games/slice/selectors';
import { leaguesActions } from 'state/leagues/slice';
import { selectSelectedLeague, selectSelectedSeason } from 'state/leagues/slice/selectors';
import { selectIsTeamsLoading, selectTeams } from 'state/teams/slice/selectors';
import { a11yProps } from 'utils/a11yProps';

export const GamePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { seasonId, leagueId, gameId } = useParams();
  const navigate = useNavigate();

  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedLeague = useSelector(selectSelectedLeague);
  const selectedGame = useSelector(selectSelectedGame);
  const teams = useSelector(selectTeams);
  const gameEvents = useSelector(selectGamesGameEvents);
  const isGamesLoading = useSelector(selectIsGamesLoading);
  const isTeamsLoading = useSelector(selectIsTeamsLoading);
  const isGameEventsLoading = useSelector(selectIsGameEventsLoading);

  const [selectedTab, setSelectedTab] = useState(0);

  const [homeTeam, awayTeam] = useMemo(
    () => [
      teams.find((team) => team.id === selectedGame?.homeTeamId),
      teams.find((team) => team.id === selectedGame?.awayTeamId),
    ],
    [teams, selectedGame],
  );

  const enrichedGameEvents = useMemo(() => {
    if (!selectedGame?.id || Object.keys(gameEvents).length === 0) {
      return { firstHalf: [], secondHalf: [] };
    }

    return gameEvents[selectedGame?.id]
      .map((gameEvent) => {
        const team = teams.find((team) => team.id === gameEvent.teamId);

        return {
          ...gameEvent,
          team,
          player:
            gameEvent.type === GameEventType.Timeout
              ? undefined
              : team?.players.find((player) => player.id === gameEvent.playerId),
        };
      })
      .sort((a, b) => a.elapsedSeconds - b.elapsedSeconds)
      .reduce(
        (acc, gameEvent) => {
          if (gameEvent.elapsedSeconds < 1800) {
            acc.firstHalf.push(gameEvent as TEnrichedGameEvent);
          } else {
            acc.secondHalf.push(gameEvent as TEnrichedGameEvent);
          }

          return acc;
        },
        { firstHalf: [], secondHalf: [] } as {
          firstHalf: TEnrichedGameEvent[];
          secondHalf: TEnrichedGameEvent[];
        },
      );
  }, [gameEvents, selectedGame, teams]);

  const isLoading = useMemo(
    () => isGamesLoading || isTeamsLoading || isGameEventsLoading,
    [isGamesLoading, isTeamsLoading, isGameEventsLoading],
  );

  useEffect(() => {
    dispatch(leaguesActions.loadAllLeagueData({ seasonId, leagueId }));
    dispatch(gamesActions.selectGame(gameId));
  }, [dispatch, seasonId, leagueId, gameId]);

  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  return (
    <Layout
      breadcrumbs={[
        { label: t(translations.dashboard), href: '/' },
        { label: selectedSeason ?? 'N/A', href: `/seasons/${selectedSeason?.replace('/', '-')}` },
        { label: selectedLeague?.slug ?? 'N/A' },
      ]}
      title={
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="h5">{homeTeam?.name}</Typography>
          <Typography fontWeight="bold">vs</Typography>
          <Typography variant="h5">{awayTeam?.name}</Typography>
        </Stack>
      }
    >
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
      {isLoading || !selectedGame ? (
        <LoadingPlayByPlay />
      ) : (
        <>
          <GameResultRow game={selectedGame} disableClick />
          <Box sx={{ backgroundColor: (theme) => theme.palette.action.hover }}>
            <Tabs
              value={selectedTab}
              onChange={(_, value) => setSelectedTab(value)}
              centered
              variant={isSmallScreen ? 'fullWidth' : 'standard'}
            >
              <Tab label={t(translations.playByPlayTabHeader)} {...a11yProps(0)} />
              <Tab label={t(translations.rostersTabHeader)} {...a11yProps(1)} />
              <Tab label={t(translations.statisticsHeader)} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={selectedTab} index={0}>
            <Stack gap={2} mt={2}>
              <Stack alignItems="center">
                {enrichedGameEvents.firstHalf.map((gameEvent) => (
                  <GameEventDisplay
                    gameEvent={gameEvent}
                    homeTeamId={homeTeam?.id}
                    awayTeamId={awayTeam?.id}
                    key={gameEvent.id}
                  />
                ))}
              </Stack>
              <HalftimeSummary
                title={t(translations.halftime)}
                gameEvents={enrichedGameEvents.firstHalf}
                game={selectedGame}
              />
              <Stack alignItems="center">
                {enrichedGameEvents.secondHalf.map((gameEvent) => (
                  <GameEventDisplay
                    gameEvent={gameEvent}
                    homeTeamId={homeTeam?.id}
                    awayTeamId={awayTeam?.id}
                    key={gameEvent.id}
                  />
                ))}
              </Stack>
              <HalftimeSummary
                title={t(translations.fulltime)}
                gameEvents={enrichedGameEvents.secondHalf}
                game={selectedGame}
              />
            </Stack>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <Stack alignItems="center">
              <TeamsRosters homeTeam={homeTeam} awayTeam={awayTeam} />
            </Stack>
          </TabPanel>
          <TabPanel value={selectedTab} index={2}></TabPanel>
        </>
      )}
    </Layout>
  );
};

const LoadingPlayByPlay = () => (
  <Stack gap={2}>
    <Skeleton variant="rectangular" animation="wave" height={96} />
    <Stack gap={2}>
      <Skeleton variant="rectangular" animation="wave" height={56} />
      <Skeleton variant="rectangular" animation="wave" height={56} />
      <Skeleton variant="rectangular" animation="wave" height={56} />
      <Skeleton variant="rectangular" animation="wave" height={56} />
      <Skeleton variant="rectangular" animation="wave" height={56} />
      <Skeleton variant="rectangular" animation="wave" height={56} />
    </Stack>
  </Stack>
);
