import { Game } from '@model';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {
  Card,
  CardActionArea,
  Paper,
  Stack,
  Theme,
  Typography,
  TypographyProps,
  useMediaQuery,
} from '@mui/material';
import { IKImage } from 'imagekitio-react';
import * as React from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { gamesActions } from 'state/games/slice';
import { selectTeams } from 'state/teams/slice/selectors';
import { isWinner } from 'utils/isWinner';

type Props = {
  game?: Game;
  disableClick?: boolean;
  size?: 'small' | 'large';
};

export const GameResultRow = ({ game, disableClick = false, size = 'small' }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!game) {
    return null;
  }

  const handleSelectGame = () => {
    if (disableClick) {
      return;
    }

    dispatch(gamesActions.selectGame(game.id));
    navigate(`games/${game.id}`);
  };

  return (
    <Card onClick={handleSelectGame} sx={{ borderRadius: 0 }}>
      {disableClick ? (
        <GameResultCardContent game={game} size={size} />
      ) : (
        <CardActionArea>
          <GameResultCardContent game={game} size={size} />
        </CardActionArea>
      )}
    </Card>
  );
};

const GameResultCardContent = ({ game, size }: { game?: Game; size: 'small' | 'large' }) => {
  const isSmallScreen = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  const teams = useSelector(selectTeams);

  const [homeTeam, awayTeam] = useMemo(
    () => [
      {
        ...teams.find((team) => team.id === game?.homeTeamId),
        isWinner: isWinner(game, game?.homeTeamId),
      },
      {
        ...teams.find((team) => team.id === game?.awayTeamId),
        isWinner: isWinner(game, game?.awayTeamId),
      },
    ],
    [teams, game],
  );

  const { teamLogoSize, teamNameSize, scoreSize, spacing, iconSize } = useMemo(() => {
    return {
      teamLogoSize: size === 'small' || isSmallScreen ? '45' : '75',
      teamNameSize: (size === 'small' || isSmallScreen
        ? 'body1'
        : 'h5') as TypographyProps['variant'],
      scoreSize: (size === 'small' || isSmallScreen ? 'h6' : 'h3') as TypographyProps['variant'],
      spacing: size === 'small' || isSmallScreen ? 1 : 2,
      iconSize: (size === 'small' || isSmallScreen ? 'medium' : 'large') as 'medium' | 'large',
    };
  }, [size, isSmallScreen]);

  return (
    <Stack direction="row">
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ flex: 1 }}
        gap={spacing}
        p={spacing}
      >
        {homeTeam.isWinner && <EmojiEventsIcon fontSize={iconSize} />}
        {!isSmallScreen && (
          <Typography variant={teamNameSize}>{homeTeam?.name ?? 'N/A'}</Typography>
        )}
        <IKImage
          path={`/teams/${homeTeam.id}.png`}
          transformation={[
            {
              width: teamLogoSize,
              height: teamLogoSize,
            },
          ]}
          lqip={{ active: true }}
          loading="lazy"
        />
      </Stack>
      <Stack justifyContent="center" p={1} component={Paper} elevation={5} sx={{ borderRadius: 0 }}>
        <Typography variant={scoreSize}>{game?.fulltimeScore.home}</Typography>
      </Stack>
      <Stack justifyContent="center" p={1} component={Paper} elevation={5} sx={{ borderRadius: 0 }}>
        <Typography variant={scoreSize}>{game?.fulltimeScore.away}</Typography>
      </Stack>
      <Stack direction="row" alignItems="center" sx={{ flex: 1 }} gap={spacing} p={spacing}>
        <IKImage
          path={`/teams/${awayTeam.id}.png`}
          transformation={[
            {
              width: teamLogoSize,
              height: teamLogoSize,
            },
          ]}
          lqip={{ active: true }}
          loading="lazy"
        />
        {!isSmallScreen && (
          <Typography variant={teamNameSize}>{awayTeam?.name ?? 'N/A'}</Typography>
        )}
        {awayTeam.isWinner && <EmojiEventsIcon />}
      </Stack>
    </Stack>
  );
};
