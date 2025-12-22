export const STATISTICS_TIMEFRAMES = {
  FOUR_WEEKS: "4weeks",
  EIGHT_WEEKS: "8weeks",
  TWELVE_WEEKS: "12weeks",
  ONE_YEAR: "1year",
} as const;


export type StatisticsTimeframe = typeof STATISTICS_TIMEFRAMES[keyof typeof STATISTICS_TIMEFRAMES];