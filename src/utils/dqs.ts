import {DQS_TIERS, TierId} from 'src/constants/dqs';
import type {DiaryEntry} from 'src/screens/Diary/Diary.types';

export const getEntryScore = (selectedTiers: Record<TierId, number>): number => {
  let totalScore = 0;
  let totalCount = 0;

  for (const tier of DQS_TIERS) {
    const count = selectedTiers[tier.id];

    totalScore += tier.score * count;
    totalCount += count;
  }

  return totalCount === 0 ? 0 : totalScore / totalCount;
};

export const getDayScore = (entries: DiaryEntry[]): number => {
  return entries.reduce((sum, entry) => sum + getEntryScore(entry.selectedTiers), 0);
};

export const formatDietaryScore = (score: number) => {
  const truncated = Math.trunc(score * 10) / 10;

  return truncated.toFixed(1);
};
