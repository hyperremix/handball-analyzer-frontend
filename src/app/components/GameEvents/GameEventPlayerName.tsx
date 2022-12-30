import { Typography } from '@mui/material';
import React from 'react';

type Props = {
  number?: number;
  name?: string;
};

export const GameEventPlayerName = ({ number, name }: Props) => (
  <Typography
    sx={{
      OverflowWrap: 'break-word',
      WordWrap: 'break-word',
      WebkitHyphens: 'auto',
      MSHyphens: 'auto',
      MozHyphens: 'auto',
      hyphens: 'auto',
    }}
  >{`${number} ${name}`}</Typography>
);
