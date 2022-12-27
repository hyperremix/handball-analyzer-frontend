import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import {
  AppBar as MuiAppBar,
  Stack,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, TBreadcrumb } from './Breadcrumbs';

type Props = {
  breadcrumbs?: TBreadcrumb[];
  title?: ReactNode;
};

export const AppBar = ({ breadcrumbs, title }: Props) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  return (
    <MuiAppBar position="static" sx={{ boxShadow: 0 }}>
      <Toolbar>
        <Stack direction="row" alignItems="center" gap={4}>
          <Stack direction="column">
            <Stack direction="row" alignItems="center" gap={2}>
              <Link to="/">
                <SportsHandballIcon fontSize="large" color="action" />
              </Link>
              <Typography sx={{ lineHeight: 1 }} variant="h4" noWrap>
                Handball Analyzer
              </Typography>
            </Stack>
            {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
          </Stack>
          {title && !isSmallScreen && <Typography variant="h5">{title}</Typography>}
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
};
