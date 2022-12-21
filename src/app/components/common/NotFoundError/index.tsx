import { Stack, Typography } from '@mui/material';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  message?: string;
};

export const NotFoundError = ({ message }: Props) => {
  const { t } = useTranslation();

  const effectiveMessage = message || t(translations.notFoundError);

  return (
    <Stack gap={1} alignItems="center">
      <span role="img" aria-label="Face Screaming In Fear" style={{ fontSize: '3.125rem' }}>
        😱
      </span>
      <Typography>{effectiveMessage}</Typography>
    </Stack>
  );
};
