import { TeamStatistics } from '@model';

export const calculatePoints = ({
  wins,
  draws,
  losses,
}: TeamStatistics): { for: number; against: number } => ({
  for: wins * 2 + draws,
  against: losses * 2 + draws,
});
