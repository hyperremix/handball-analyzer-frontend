import CallMissedIcon from '@mui/icons-material/CallMissed';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventSevenMeters } from 'state/gameEvents/slice/TEnrichedGameEvent';
import { GameEventPlayerName } from './GameEventPlayerName';

type Props = {
  gameEvent: TEnrichedGameEventSevenMeters;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventSevenMetersDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && (
        <>
          <GameEventIcon isGoal={gameEvent.isGoal} />
          <Typography variant="caption" fontWeight="bold">
            7m
          </Typography>
        </>
      )}
      <GameEventPlayerName
        number={gameEvent.teamMember?.number}
        name={gameEvent.teamMember?.name}
      />
      {gameEvent.teamId === homeTeamId && (
        <>
          <Typography variant="caption" fontWeight="bold">
            7m
          </Typography>
          <GameEventIcon isGoal={gameEvent.isGoal} />
        </>
      )}
    </Stack>
  );
};

const GameEventIcon = ({ isGoal }: { isGoal: boolean }) =>
  isGoal ? <SportsSoccerIcon /> : <CallMissedIcon />;
