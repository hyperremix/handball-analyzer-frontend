import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Stack } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventGoal } from 'state/gameEvents/slice/TEnrichedGameEvent';
import { GameEventPlayerName } from './GameEventPlayerName';

type Props = {
  gameEvent: TEnrichedGameEventGoal;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventGoalDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && <SportsSoccerIcon />}
      <GameEventPlayerName
        number={gameEvent.teamMember?.number}
        name={gameEvent.teamMember?.name}
      />
      {gameEvent.teamId === homeTeamId && <SportsSoccerIcon />}
    </Stack>
  );
};
