import { GameEventType, Team } from '@model';
import { TableCell, TableRow, Theme, Typography, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useMemo } from 'react';
import { LeagueTableCell } from './LeagueTableCell';

type Props = {
  index: number;
  team: Team;
};

export const LeagueTableRow = ({ index, team }: Props) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  const games = useMemo(() => team.stats.wins + team.stats.draws + team.stats.losses, [team]);
  const goalDiff = useMemo(
    () => team.stats.gameEvents[GameEventType.Goal] - team.stats.concededGoals,
    [team],
  );

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}>
      <LeagueTableCell>
        <Typography fontWeight="bold">{index + 1}</Typography>
      </LeagueTableCell>
      <TableCell
        sx={{
          border: 0,
          lineHeight: 1,
          px: (theme) => (isSmallScreen ? theme.spacing(1) : theme.spacing(2)),
        }}
      >
        {team.name}
      </TableCell>
      <LeagueTableCell align="right">
        <Typography fontWeight="bold">{games}</Typography>
      </LeagueTableCell>
      <LeagueTableCell align="center" sx={{ px: (theme) => theme.spacing(1) }}>
        {team.stats.wins}
      </LeagueTableCell>
      <LeagueTableCell align="center" sx={{ px: (theme) => theme.spacing(1) }}>
        {team.stats.draws}
      </LeagueTableCell>
      <LeagueTableCell align="center" sx={{ px: (theme) => theme.spacing(1) }}>
        {team.stats.losses}
      </LeagueTableCell>
      <LeagueTableCell align="center">
        {`${team.stats.gameEvents[GameEventType.Goal]}:${team.stats.concededGoals}`}
      </LeagueTableCell>
      {!isSmallScreen && (
        <LeagueTableCell align="center">
          <Typography
            variant="h6"
            sx={{
              color: (theme) =>
                goalDiff > 0
                  ? theme.palette.success.main
                  : goalDiff === 0
                  ? theme.palette.text.disabled
                  : theme.palette.error.main,
            }}
          >{`${goalDiff > 0 ? '+' : ''}${goalDiff}`}</Typography>
        </LeagueTableCell>
      )}
      <LeagueTableCell align="right">
        <Typography variant="h6">{team.stats.points}</Typography>
      </LeagueTableCell>
    </TableRow>
  );
};
