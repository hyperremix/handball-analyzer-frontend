import { Game } from '@model';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Card, CardActionArea, Paper, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gamesActions } from 'state/games/slice';
import { selectTeams } from 'state/teams/slice/selectors';
import { isWinner } from 'utils/isWinner';

type Props = { game?: Game };

export const GameResultRow = ({ game }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const teams = useSelector(selectTeams);

  const [homeTeam, awayTeam] = useMemo(
    () => [
      {
        ...teams.find((team) => team.id === game?.homeTeamId),
        isWinner: isWinner(game, game?.homeTeamId),
      },
      {
        ...teams.find((team) => team.id === game?.awayTeamId),
        isWinner: isWinner(game, game?.awayTeamId),
      },
    ],
    [teams, game],
  );

  if (!game) {
    return null;
  }

  const handleSelectGame = () => {
    dispatch(gamesActions.selectGame(game.id));
    navigate(`games/${game.id}`);
  };

  return (
    <Card onClick={handleSelectGame} sx={{ borderRadius: 0 }}>
      <CardActionArea>
        <Stack direction="row" alignItems="center">
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ flex: 1 }}
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
          <Stack direction="row" alignItems="center" sx={{ flex: 1 }} gap={1} p={1}>
            <Typography>{awayTeam?.name ?? 'N/A'}</Typography>
            {awayTeam.isWinner && <EmojiEventsIcon />}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};
