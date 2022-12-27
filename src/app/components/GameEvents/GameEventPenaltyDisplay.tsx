import { mdiHandPeace } from '@mdi/js';
import Icon from '@mdi/react';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { TEnrichedGameEventPenalty } from 'state/gameEvents/slice/TEnrichedGameEvent';

type Props = {
  gameEvent: TEnrichedGameEventPenalty;
  homeTeamId: string;
  awayTeamId: string;
};

export const GameEventPenaltyDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      {gameEvent.teamId === awayTeamId && <Icon path={mdiHandPeace} size={1} />}
      <Typography>{`${gameEvent.player?.number} ${gameEvent.player?.name}`}</Typography>
      {gameEvent.teamId === homeTeamId && <Icon path={mdiHandPeace} size={1} />}
    </Stack>
  );
};
