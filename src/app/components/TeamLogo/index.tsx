import { Stack } from '@mui/material';
import { IKImage } from 'imagekitio-react';
import * as React from 'react';

type Props = {
  teamId?: string;
  size?: string;
};

export const TeamLogo = ({ teamId, size = '45' }: Props) => (
  <Stack alignItems="center" justifyContent="center" width={`${size}px`} height={`${size}px`}>
    <IKImage
      path={`/teams/${teamId}`}
      transformation={[
        {
          width: size,
          height: size,
          crop: 'at_max',
        },
      ]}
      lqip={{ active: true }}
      loading="lazy"
    />
  </Stack>
);
