import { Game, GameEventType } from '@model';
import { Divider, Stack, Typography } from '@mui/material';
import * as React from 'react';
import { useMemo } from 'react';
import { TEnrichedGameEvent } from 'state/gameEvents/slice/TEnrichedGameEvent';
import { GameEventSummary } from './GameEventSummary/GameEventSummary';

type Props = {
  title: string;
  gameEvents: TEnrichedGameEvent[];
  game?: Game;
};

export const HalftimeSummary = ({ title, gameEvents, game }: Props) => {
  const homeTeamGameEventSummary = useMemo(
    () => reduceGameEvents(gameEvents, game?.homeTeamId),
    [gameEvents, game],
  );

  const awayTeamGameEventSummary = useMemo(
    () => reduceGameEvents(gameEvents, game?.awayTeamId),
    [gameEvents, game],
  );

  return (
    <Stack>
      <Stack alignItems="center" gap={2}>
        <Typography variant="h3">{title}</Typography>
        <Stack direction="row" justifyContent="center" alignItems="center" gap={8}>
          <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
            {Object.keys(GameEventType).map((type) => (
              <GameEventSummary
                key={type}
                gameEventType={type as GameEventType}
                count={homeTeamGameEventSummary[type] ?? 0}
              />
            ))}
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
            {Object.keys(GameEventType).map((type) => (
              <GameEventSummary
                key={type}
                gameEventType={type as GameEventType}
                count={awayTeamGameEventSummary[type] ?? 0}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
};

const reduceGameEvents = (gameEvents: TEnrichedGameEvent[], teamId?: string) =>
  gameEvents
    .filter((gameEvent) => gameEvent.teamId === teamId)
    .reduce((acc, gameEvent) => {
      if (gameEvent.type === GameEventType.SevenMeters) {
        acc[gameEvent.type] = (acc[gameEvent.type] || 0) + (gameEvent.isGoal ? 1 : 0);
        return acc;
      }

      acc[gameEvent.type] = (acc[gameEvent.type] || 0) + 1;
      return acc;
    }, {} as Record<GameEventType, number>);
