import { Box, Breakpoint, Container, Divider } from '@mui/material';
import { TBreadcrumb } from 'app/components/AppBar/Breadcrumbs';
import React, { ReactNode } from 'react';
import { AppBar } from '../AppBar';

type Props = {
  breadcrumbs?: TBreadcrumb[];
  tabs?: ReactNode;
  title?: ReactNode;
  maxWidth?: Breakpoint;
  children: ReactNode;
};

export const Layout = ({ breadcrumbs, tabs, title, maxWidth, children }: Props) => (
  <>
    <AppBar breadcrumbs={breadcrumbs} title={title} />
    {tabs && (
      <>
        <Divider />
        <Box sx={{ backgroundColor: (theme) => theme.palette.action.hover }}>{tabs}</Box>
      </>
    )}
    <Container maxWidth={maxWidth}>
      <Box my={3}>{children}</Box>
    </Container>
  </>
);
