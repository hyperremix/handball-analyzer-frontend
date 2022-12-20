import { Box, Container } from '@mui/material';
import { TBreadcrumb } from 'app/components/AppBar/Breadcrumbs';
import React, { ReactNode } from 'react';
import { AppBar } from '../AppBar';

type Props = {
  breadcrumbs?: TBreadcrumb[];
  children: ReactNode;
};

export const Layout = ({ breadcrumbs, children }: Props) => (
  <>
    <AppBar breadcrumbs={breadcrumbs} />
    <Container>
      <Box my={3}>{children}</Box>
    </Container>
  </>
);
