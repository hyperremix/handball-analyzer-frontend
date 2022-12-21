import { Box, Breakpoint, Container } from '@mui/material';
import { TBreadcrumb } from 'app/components/AppBar/Breadcrumbs';
import React, { ReactNode } from 'react';
import { AppBar } from '../AppBar';

type Props = {
  breadcrumbs?: TBreadcrumb[];
  maxWidth?: Breakpoint;
  children: ReactNode;
};

export const Layout = ({ breadcrumbs, maxWidth, children }: Props) => (
  <>
    <AppBar breadcrumbs={breadcrumbs} />
    <Container maxWidth={maxWidth}>
      <Box my={3}>{children}</Box>
    </Container>
  </>
);
