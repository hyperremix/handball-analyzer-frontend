import {
  BaseGameEvent,
  GameEventBlueCard,
  GameEventGoal,
  GameEventPenalty,
  GameEventRedCard,
  GameEventSevenMeters,
  GameEventTimeout,
  GameEventType,
  GameEventYellowCard,
  Player,
  Team,
} from '@model';

export type TEnrichedGameEvent =
  | TEnrichedGameEventGoal
  | TEnrichedGameEventSevenMeters
  | TEnrichedGameEventPenalty
  | TEnrichedGameEventTimeout
  | TEnrichedGameEventYellowCard
  | TEnrichedGameEventRedCard
  | TEnrichedGameEventBlueCard;

export type TBaseEnrichedGameEvent<T extends GameEventType> = BaseGameEvent<T> & {
  team: Team;
};

export type TEnrichedGameEventGoal = TBaseEnrichedGameEvent<GameEventType.Goal> &
  GameEventGoal & {
    player: Player;
  };

export type TEnrichedGameEventSevenMeters = TBaseEnrichedGameEvent<GameEventType.SevenMeters> &
  GameEventSevenMeters & {
    player: Player;
  };

export type TEnrichedGameEventPenalty = TBaseEnrichedGameEvent<GameEventType.Penalty> &
  GameEventPenalty & {
    player: Player;
  };

export type TEnrichedGameEventTimeout = TBaseEnrichedGameEvent<GameEventType.Timeout> &
  GameEventTimeout;

export type TEnrichedGameEventYellowCard = TBaseEnrichedGameEvent<GameEventType.YellowCard> &
  GameEventYellowCard & {
    player: Player;
  };

export type TEnrichedGameEventRedCard = TBaseEnrichedGameEvent<GameEventType.RedCard> &
  GameEventRedCard & {
    player: Player;
  };

export type TEnrichedGameEventBlueCard = TBaseEnrichedGameEvent<GameEventType.BlueCard> &
  GameEventBlueCard & {
    player: Player;
  };
