import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { NotFoundError } from 'app/components/common/NotFoundError';
import { Layout } from 'app/components/Layout';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { leaguesActions } from 'state/leagues/slice';
import { selectSelectedSeason, selectSelectedSeasonLeagues } from 'state/leagues/slice/selectors';

export const SeasonPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedSeasonLeagues = useSelector(selectSelectedSeasonLeagues);

  const handleSelectLeague = (leagueId: string) => {
    dispatch(leaguesActions.selectLeague(leagueId));
    navigate(`leagues/${leagueId}`);
  };

  return (
    <Layout
      maxWidth="xs"
      breadcrumbs={[
        { label: t(translations.dashboard), href: '/' },
        { label: selectedSeason ?? 'N/A' },
      ]}
    >
      <Stack gap={3}>
        <Typography variant="h3">{`${t(
          translations.seasonPageHeader,
        )} ${selectedSeason}`}</Typography>
        <Stack gap={2}>
          {selectedSeasonLeagues.map((league) => (
            <Card key={league.id} onClick={() => handleSelectLeague(league.id)}>
              <CardActionArea>
                <CardContent>
                  <Stack alignItems="center">
                    <Typography>{league.name}</Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
          {Object.keys(selectedSeasonLeagues).length === 0 && <NotFoundError />}
        </Stack>
      </Stack>
    </Layout>
  );
};
