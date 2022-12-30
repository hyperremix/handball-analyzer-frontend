import { GameEventType } from '@model';
import { Box, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { TEnrichedGameEvent } from 'state/gameEvents/slice/TEnrichedGameEvent';
import { GameEventBlueCardDisplay } from './GameEventBlueCardDisplay';
import { GameEventGoalDisplay } from './GameEventGoalDisplay';
import { GameEventPenaltyDisplay } from './GameEventPenaltyDisplay';
import { GameEventRedCardDisplay } from './GameEventRedCardDisplay';
import { GameEventSevenMetersDisplay } from './GameEventSevenMetersDisplay';
import { GameEventTimeoutDisplay } from './GameEventTimeoutDisplay';
import { GameEventYellowCardDisplay } from './GameEventYellowCardDisplay';

type Props = {
  gameEvent?: TEnrichedGameEvent;
  homeTeamId?: string;
  awayTeamId?: string;
};

export const GameEventDisplay = ({ gameEvent, homeTeamId, awayTeamId }: Props) => {
  if (!gameEvent || !homeTeamId || !awayTeamId) {
    return null;
  }

  let gameEventDisplay: ReactNode = <></>;

  switch (gameEvent.type) {
    case GameEventType.Goal:
      gameEventDisplay = (
        <GameEventGoalDisplay
          gameEvent={gameEvent}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
        />
      );
      break;
    case GameEventType.SevenMeters:
      gameEventDisplay = (
        <GameEventSevenMetersDisplay
          gameEvent={gameEvent}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
        />
      );
      break;
    case GameEventType.Penalty:
      gameEventDisplay = (
        <GameEventPenaltyDisplay
          gameEvent={gameEvent}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
        />
      );
      break;
    case GameEventType.Timeout:
      gameEventDisplay = (
        <GameEventTimeoutDisplay
          gameEvent={gameEvent}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
        />
      );
      break;
    case GameEventType.YellowCard:
      gameEventDisplay = (
        <GameEventYellowCardDisplay
          gameEvent={gameEvent}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
        />
      );
      break;
    case GameEventType.RedCard:
      gameEventDisplay = (
        <GameEventRedCardDisplay
          gameEvent={gameEvent}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
        />
      );
      break;
    case GameEventType.BlueCard:
      gameEventDisplay = (
        <GameEventBlueCardDisplay
          gameEvent={gameEvent}
          homeTeamId={homeTeamId}
          awayTeamId={awayTeamId}
        />
      );
      break;
  }

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" gap={1} p={1}>
      <Box sx={{ visibility: gameEvent.teamId === homeTeamId ? 'visible' : 'hidden' }}>
        {gameEventDisplay}
      </Box>
      <Stack alignItems="center" width={60}>
        <Typography>{`${Math.round(gameEvent.elapsedSeconds / 60)}'`}</Typography>
        {(gameEvent.type === GameEventType.Goal ||
          (gameEvent.type === GameEventType.SevenMeters && gameEvent.isGoal)) && (
          <Typography variant="h6">{`${gameEvent.score?.home ?? '- '}:${
            gameEvent.score?.away ?? ' -'
          }`}</Typography>
        )}
      </Stack>
      <Box sx={{ visibility: gameEvent.teamId === awayTeamId ? 'visible' : 'hidden' }}>
        {gameEventDisplay}
      </Box>
    </Stack>
  );
};
