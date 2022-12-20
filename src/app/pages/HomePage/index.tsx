import { Stack, Typography } from '@mui/material';
import { Layout } from 'app/components/Layout';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLeaguesSlice } from 'state/leagues/slice';
import {
  selectGetLeaguesError,
  selectIsLeaguesLoading,
  selectLeagues,
} from 'state/leagues/slice/selectors';

export const HomePage = () => {
  const { actions } = useLeaguesSlice();
  const dispatch = useDispatch();

  const leagues = useSelector(selectLeagues);
  const loading = useSelector(selectIsLeaguesLoading);
  const error = useSelector(selectGetLeaguesError);

  useEffect(() => {
    dispatch(actions.loadLeagues());
  }, [dispatch, actions]);

  return (
    <Layout>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error: {error}</Typography>}
      <Stack>
        {leagues.map((league) => (
          <Stack key={league.id}>
            <Typography>{league.id}</Typography>
            <Typography>{league.season}</Typography>
            <Typography>{league.name}</Typography>
            <Typography>{league.slug}</Typography>
          </Stack>
        ))}
      </Stack>
    </Layout>
  );
};
