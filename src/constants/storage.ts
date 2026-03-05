export const DIARY_DAY_PREFIX = 'eatful:diary:';
export const DIARY_START_DATE_KEY = 'eatful:diary:startDate';

export const getDiaryDayKey = (dateKey: string) => `${DIARY_DAY_PREFIX}${dateKey}`;
