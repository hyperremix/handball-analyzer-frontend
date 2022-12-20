import { Box, Button, Stack, useMediaQuery, useTheme } from '@mui/material';
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

type Props = {
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const NavigationButton = ({ icon, to, onClick, children }: Props) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const theme = useTheme();

  const isBelowMediumBreakpoint = useMediaQuery(theme.breakpoints.down('md'));

  const ButtonContent = () => (
    <Stack direction="column" alignItems="center">
      {icon}
      {!isBelowMediumBreakpoint && <Box>{children}</Box>}
    </Stack>
  );

  return !!to ? (
    <Button
      size="small"
      sx={{
        color: (theme) => (isActive ? theme.palette.primary.main : theme.palette.text.secondary),
      }}
      component={Link}
      to={to}
    >
      <ButtonContent />
    </Button>
  ) : (
    <Button
      size="small"
      sx={{
        color: (theme) => (isActive ? theme.palette.primary.main : theme.palette.text.secondary),
      }}
      onClick={onClick}
    >
      <ButtonContent />
    </Button>
  );
};
