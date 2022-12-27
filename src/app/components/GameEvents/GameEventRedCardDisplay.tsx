import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventRedCard } from 'state/gameEvents/slice/TEnrichedGameEvent';

type Props = {
  gameEvent: TEnrichedGameEventRedCard;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventRedCardDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && <Box height={20} width={12} mx={0.75} bgcolor="red" />}
      <Typography>{`${gameEvent.player?.number} ${gameEvent.player?.name}`}</Typography>
      {gameEvent.teamId === homeTeamId && <Box height={20} width={12} mx={0.75} bgcolor="red" />}
    </Stack>
  );
};
