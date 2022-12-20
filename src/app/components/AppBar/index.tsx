import DashboardIcon from '@mui/icons-material/Dashboard';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import { AppBar as MuiAppBar, Stack, Toolbar, Typography } from '@mui/material';
import { translations } from 'i18n/translations';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Breadcrumbs, TBreadcrumb } from './Breadcrumbs';
import { NavigationButton } from './NavigationButton';

type Props = {
  breadcrumbs?: TBreadcrumb[];
};

export const AppBar = ({ breadcrumbs }: Props) => {
  const { t } = useTranslation();

  return (
    <MuiAppBar position="static">
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
          <NavigationButton icon={<DashboardIcon />} to="/">
            {t(translations.dashboard)}
          </NavigationButton>
        </Stack>
      </Toolbar>
    </MuiAppBar>
  );
};
