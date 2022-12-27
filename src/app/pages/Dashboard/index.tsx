import { Card, CardActionArea, CardContent, Skeleton, Stack, Typography } from '@mui/material';
import { ErrorDisplay } from 'app/components/common/ErrorDisplay';
import { NotFoundError } from 'app/components/common/NotFoundError';
import { Layout } from 'app/components/Layout';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { leaguesActions } from 'state/leagues/slice';
import {
  selectIsLeaguesLoading,
  selectLeagues,
  selectLoadLeaguesError,
} from 'state/leagues/slice/selectors';

export const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const leagues = useSelector(selectLeagues);
  const isLoading = useSelector(selectIsLeaguesLoading);
  const error = useSelector(selectLoadLeaguesError);

  useEffect(() => {
    dispatch(leaguesActions.loadLeagues());
  }, [dispatch]);

  const handleSelectSeason = (season: string) => {
    dispatch(leaguesActions.selectSeason(season));
    navigate(`seasons/${season.replace('/', '-')}`);
  };

  return (
    <Layout maxWidth="xs">
      {error && <ErrorDisplay error={error} />}
      <Stack gap={3}>
        <Typography variant="h3">{t(translations.seasonsHeader)}</Typography>
        <Stack gap={2}>
          {isLoading ? (
            <LoadingView />
          ) : (
            Object.keys(leagues).map((season) => (
              <Card key={season} onClick={() => handleSelectSeason(season)}>
                <CardActionArea>
                  <CardContent>
                    <Stack alignItems="center">
                      <Typography>{season}</Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))
          )}
          {Object.keys(leagues).length === 0 && isLoading === false && <NotFoundError />}
        </Stack>
      </Stack>
    </Layout>
  );
};

const LoadingView = () => (
  <>
    <Skeleton variant="rectangular" animation="wave" height={64} />
    <Skeleton variant="rectangular" animation="wave" height={64} />
  </>
);
