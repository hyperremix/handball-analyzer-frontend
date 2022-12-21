import { Typography } from '@mui/material';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  error: string;
};

export const ErrorDisplay = ({ error }: Props) => {
  const { t } = useTranslation();

  return (
    <Typography sx={{ color: (theme) => theme.palette.error.main }}>{`${t(
      translations.errorLabel,
    )}: ${error}`}</Typography>
  );
};
