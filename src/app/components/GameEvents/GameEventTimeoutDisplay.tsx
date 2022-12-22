import SnoozeIcon from '@mui/icons-material/Snooze';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventTimeout } from 'state/gameEvents/slice/TEnrichedGameEvent';

type Props = {
  gameEvent: TEnrichedGameEventTimeout;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventTimeoutDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && <SnoozeIcon />}
      <Typography>Timeout</Typography>
      {gameEvent.teamId === homeTeamId && <SnoozeIcon />}
    </Stack>
  );
};
