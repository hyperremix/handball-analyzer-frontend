import { Referee, Team, TeamMemberType } from '@model';
import { Stack, Typography } from '@mui/material';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  homeTeam?: Team;
  awayTeam?: Team;
  referees: Referee[];
};

export const Rosters = ({ homeTeam, awayTeam, referees }: Props) => {
  const { t } = useTranslation();
  const homeTeamRef = useRef<HTMLDivElement>(null);
  const awayTeamRef = useRef<HTMLDivElement>(null);

  const [sortedHomeTeamPlayers, homeTeamCoaches] = useMemo(
    () => getTeamPlayersAndCoaches(homeTeam),
    [homeTeam],
  );

  const [sortedAwayTeamPlayers, awayTeamCoaches] = useMemo(
    () => getTeamPlayersAndCoaches(awayTeam),
    [awayTeam],
  );

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
    <>
      <Stack direction="row" gap={5} mt={3}>
        <Stack direction="column" gap={1} ref={homeTeamRef}>
          {sortedHomeTeamPlayers.map((player) => (
            <Stack direction="row" gap={1} key={player.id}>
              <Stack direction="row" alignItems="center">
                <Typography noWrap fontWeight="bold">
                  {player.number}
                </Typography>
                {parseInt(player.number) < 10 && (
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
          {homeTeamCoaches.map((coach) => (
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
                {parseInt(player.number) < 10 && (
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
          {awayTeamCoaches.map((coach) => (
            <Typography key={coach}>{coach}</Typography>
          ))}
        </Stack>
      </Stack>
      <Stack gap={1} mt={5}>
        <Typography variant="h5">{t(translations.referees)}</Typography>
        {referees.map((referee) => (
          <Stack direction="row" gap={1} key={referee.id}>
            <Typography>{referee.name}</Typography>
            <Typography>({referee.club})</Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

const getTeamPlayersAndCoaches = (team?: Team) => {
  const players =
    team?.teamMembers.slice().filter((member) => member.type === TeamMemberType.Player) ?? [];
  players.sort((a, b) => parseInt(a.number) - parseInt(b.number));
  const coaches =
    team?.teamMembers
      .slice()
      .filter((member) => member.type === TeamMemberType.Coach)
      .map((member) => member.name) ?? [];

  const uniqueCoaches = coaches.filter((coach, index) => coaches.indexOf(coach) === index) ?? [];
  return [players, uniqueCoaches];
};
