import { Box, Stack } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventRedCard } from 'state/gameEvents/slice/TEnrichedGameEvent';
import { GameEventPlayerName } from './GameEventPlayerName';

type Props = {
  gameEvent: TEnrichedGameEventRedCard;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventRedCardDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && <Box height={20} width={12} mx={0.75} bgcolor="red" />}
      <GameEventPlayerName number={gameEvent.player?.number} name={gameEvent.player?.name} />
      {gameEvent.teamId === homeTeamId && <Box height={20} width={12} mx={0.75} bgcolor="red" />}
    </Stack>
  );
};
