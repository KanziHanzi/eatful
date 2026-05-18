import {DQS_CATEGORIES, DQS_CATEGORIES_BY_ID} from 'src/constants/dqs';
import type {DiaryEntry} from 'src/types/diary';

export type DailyDqs = {
  score: number;
  max: number;
  taggedCount: number;
};

export const calculateEntryDqs = (entry: DiaryEntry): number | null => {
  const ids = entry.dqsCategoryIds;

  if (!ids || ids.length === 0) return null;

  const sum = ids.reduce((acc, id) => {
    const matchingCategory = DQS_CATEGORIES.find(category => category.id === id);

    if (!matchingCategory) return 0;

    return acc + matchingCategory.value
  }, 0);

  return sum / ids.length;
};

export const calculateDailyDqs = (entries: DiaryEntry[]): DailyDqs | null => {
  const mealScores = entries.map(calculateEntryDqs).filter(entry => entry !== null);

  if (mealScores.length === 0) return null;

  const score = mealScores.reduce((acc, value) => {
    return acc + value
  }, 0);

  return {
    score,
    max: mealScores.length * 2,
    taggedCount: mealScores.length,
  };
};
