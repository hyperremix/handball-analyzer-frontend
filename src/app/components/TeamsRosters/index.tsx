import { Team } from '@model';
import { Stack, Typography } from '@mui/material';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  homeTeam?: Team;
  awayTeam?: Team;
};

export const TeamsRosters = ({ homeTeam, awayTeam }: Props) => {
  const { t } = useTranslation();
  const homeTeamRef = useRef<HTMLDivElement>(null);
  const awayTeamRef = useRef<HTMLDivElement>(null);

  const sortedHomeTeamPlayers = useMemo(() => {
    const players = homeTeam?.players.slice() ?? [];
    players.sort((a, b) => a.number - b.number);
    return players;
  }, [homeTeam]);

  const sortedAwayTeamPlayers = useMemo(() => {
    const players = awayTeam?.players.slice() ?? [];
    players.sort((a, b) => a.number - b.number);
    return players;
  }, [awayTeam]);

  useEffect(() => {
    if (!(homeTeamRef.current && awayTeamRef.current)) {
      return;
    }

    const homeTeamWidth = homeTeamRef.current.clientWidth;
    const awayTeamWidth = awayTeamRef.current.clientWidth;
    if (homeTeamWidth > awayTeamWidth) {
      awayTeamRef.current.style.width = `${homeTeamWidth}px`;
    } else {
      homeTeamRef.current.style.width = `${awayTeamWidth}px`;
    }
  }, [homeTeamRef, awayTeamRef]);

  return (
    <Stack direction="row" gap={5} mt={3}>
      <Stack direction="column" gap={1} ref={homeTeamRef}>
        {sortedHomeTeamPlayers.map((player) => (
          <Stack direction="row" gap={1} key={player.id}>
            <Stack direction="row" alignItems="center">
              <Typography noWrap fontWeight="bold">
                {player.number}
              </Typography>
              {player.number < 10 && (
                <Typography noWrap fontWeight="bold" sx={{ visibility: 'hidden' }}>
                  {0}
                </Typography>
              )}
            </Stack>
            <Typography>{player.name}</Typography>
          </Stack>
        ))}
        <Typography variant="h5" mt={2}>
          {t(translations.coachesHeader)}
        </Typography>
        {homeTeam?.coaches.map((coach) => (
          <Typography key={coach}>{coach}</Typography>
        ))}
      </Stack>
      <Stack direction="column" gap={1} ref={awayTeamRef}>
        {sortedAwayTeamPlayers.map((player) => (
          <Stack direction="row" gap={1} key={player.id}>
            <Stack direction="row" alignItems="center">
              <Typography noWrap fontWeight="bold">
                {player.number}
              </Typography>
              {player.number < 10 && (
                <Typography noWrap fontWeight="bold" sx={{ visibility: 'hidden' }}>
                  {0}
                </Typography>
              )}
            </Stack>
            <Typography>{player.name}</Typography>
          </Stack>
        ))}
        <Typography variant="h5" mt={2}>
          {t(translations.coachesHeader)}
        </Typography>
        {awayTeam?.coaches.map((coach) => (
          <Typography key={coach}>{coach}</Typography>
        ))}
      </Stack>
    </Stack>
  );
};
