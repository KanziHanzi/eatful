export const DIARY_DAY_PREFIX = 'eatful:diary:';

export const getDiaryDayKey = (dateKey: string) => `${DIARY_DAY_PREFIX}${dateKey}`;
