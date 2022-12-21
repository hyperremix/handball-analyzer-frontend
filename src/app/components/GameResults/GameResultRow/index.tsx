import { Game } from '@model';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectTeams } from 'state/teams/slice/selectors';

type Props = { game: Game };

export const GameResultRow = ({ game }: Props) => {
  const teams = useSelector(selectTeams);

  const [homeTeam, awayTeam] = useMemo(
    () => [
      {
        ...teams.find((team) => team.id === game.homeTeamId),
        isWinner: isWinner(game, game.homeTeamId),
      },
      {
        ...teams.find((team) => team.id === game.awayTeamId),
        isWinner: isWinner(game, game.awayTeamId),
      },
    ],
    [teams, game],
  );

  return (
    <Paper>
      <Stack direction="row" alignItems="center">
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ flexGrow: 1 }}
          gap={1}
          p={1}
        >
          {homeTeam.isWinner && <EmojiEventsIcon />}
          <Typography>{homeTeam?.name ?? 'N/A'}</Typography>
        </Stack>
        <Paper elevation={5} sx={{ borderRadius: 0 }}>
          <Box p={1}>
            <Typography variant="h6">{game.fulltimeScore.home}</Typography>
          </Box>
        </Paper>
        <Paper elevation={5} sx={{ borderRadius: 0 }}>
          <Box p={1}>
            <Typography variant="h6">{game.fulltimeScore.away}</Typography>
          </Box>
        </Paper>
        <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }} gap={1} p={1}>
          <Typography>{awayTeam?.name ?? 'N/A'}</Typography>
          {awayTeam.isWinner && <EmojiEventsIcon />}
        </Stack>
      </Stack>
    </Paper>
  );
};

const isWinner = (game: Game, teamId?: string) =>
  teamId === game.winnerTeamId && game.fulltimeScore.home !== game.fulltimeScore.away;
