import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventGoal } from 'state/gameEvents/slice/TEnrichedGameEvent';

type Props = {
  gameEvent: TEnrichedGameEventGoal;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventGoalDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && <SportsSoccerIcon />}
      <Typography>{`${gameEvent.player?.number} ${gameEvent.player?.name}`}</Typography>
      {gameEvent.teamId === homeTeamId && <SportsSoccerIcon />}
    </Stack>
  );
};
