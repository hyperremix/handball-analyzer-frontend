import { mdiHandPeace } from '@mdi/js';
import Icon from '@mdi/react';
import { GameEventType } from '@model';
import SnoozeIcon from '@mui/icons-material/Snooze';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { ReactNode } from 'react';

type Props = {
  gameEventType: GameEventType;
  count: number;
};

const gameEventIconMap: Record<GameEventType, ReactNode> = {
  [GameEventType.Goal]: <SportsSoccerIcon />,
  [GameEventType.SevenMeters]: (
    <Stack width={24} height={24} alignItems="center" justifyContent="center">
      <Typography variant="caption" fontWeight="bold">
        7m
      </Typography>
    </Stack>
  ),
  [GameEventType.Penalty]: <Icon path={mdiHandPeace} size={1} />,
  [GameEventType.Timeout]: <SnoozeIcon />,
  [GameEventType.YellowCard]: <Box height={20} width={12} mx={0.75} my={0.25} bgcolor="yellow" />,
  [GameEventType.RedCard]: <Box height={20} width={12} mx={0.75} my={0.25} bgcolor="red" />,
};

export const GameEventSummary = ({ gameEventType, count }: Props) => (
  <Stack alignItems="center">
    {gameEventIconMap[gameEventType]}
    <Typography>{count}</Typography>
  </Stack>
);
