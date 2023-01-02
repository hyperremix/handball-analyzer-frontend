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
  Team,
  TeamMember,
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
    teamMember: TeamMember;
  };

export type TEnrichedGameEventSevenMeters = TBaseEnrichedGameEvent<GameEventType.SevenMeters> &
  GameEventSevenMeters & {
    teamMember: TeamMember;
  };

export type TEnrichedGameEventPenalty = TBaseEnrichedGameEvent<GameEventType.Penalty> &
  GameEventPenalty & {
    teamMember: TeamMember;
  };

export type TEnrichedGameEventTimeout = TBaseEnrichedGameEvent<GameEventType.Timeout> &
  GameEventTimeout;

export type TEnrichedGameEventYellowCard = TBaseEnrichedGameEvent<GameEventType.YellowCard> &
  GameEventYellowCard & {
    teamMember: TeamMember;
  };

export type TEnrichedGameEventRedCard = TBaseEnrichedGameEvent<GameEventType.RedCard> &
  GameEventRedCard & {
    teamMember: TeamMember;
  };

export type TEnrichedGameEventBlueCard = TBaseEnrichedGameEvent<GameEventType.BlueCard> &
  GameEventBlueCard & {
    teamMember: TeamMember;
  };
