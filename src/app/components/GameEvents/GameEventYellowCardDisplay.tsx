import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventYellowCard } from 'state/gameEvents/slice/TEnrichedGameEvent';

type Props = {
  gameEvent: TEnrichedGameEventYellowCard;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventYellowCardDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && <Box height={20} width={12} bgcolor="yellow" />}
      <Typography>{`${gameEvent.player?.number} ${gameEvent.player?.name}`}</Typography>
      {gameEvent.teamId === homeTeamId && <Box height={20} width={12} bgcolor="yellow" />}
    </Stack>
  );
};
