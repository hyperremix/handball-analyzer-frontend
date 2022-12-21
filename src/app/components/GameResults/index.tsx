import { Stack, Typography } from '@mui/material';
import { getDateInFormat } from 'i18n/datetime';
import { translations } from 'i18n/translations';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TGroupedGames } from 'state/games/slice/TGroupedGames';
import { GameResultRow } from './GameResultRow';

type Props = {
  games: TGroupedGames[];
};

export const GameResults = ({ games }: Props) => {
  const { t } = useTranslation();

  return (
    <Stack gap={2}>
      <Typography variant="h4">{t(translations.resultsHeader)}</Typography>
      {games.map((groupedGames) => (
        <Stack key={groupedGames.date.getTime()} alignItems="stretch" gap={1}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography fontWeight="bold">{getDateInFormat(groupedGames.date, 'dddd')}</Typography>
            <Typography>{getDateInFormat(groupedGames.date, 'L')}</Typography>
          </Stack>
          {groupedGames.games.map((game) => (
            <GameResultRow key={game.id} game={game} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
