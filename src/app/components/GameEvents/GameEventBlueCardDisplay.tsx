import { Box, Stack } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventBlueCard } from 'state/gameEvents/slice/TEnrichedGameEvent';
import { GameEventPlayerName } from './GameEventPlayerName';

type Props = {
  gameEvent: TEnrichedGameEventBlueCard;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventBlueCardDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && <Box height={20} width={12} mx={0.75} bgcolor="blue" />}
      <GameEventPlayerName
        number={gameEvent.teamMember?.number}
        name={gameEvent.teamMember?.name}
      />
      {gameEvent.teamId === homeTeamId && <Box height={20} width={12} mx={0.75} bgcolor="blue" />}
    </Stack>
  );
};
