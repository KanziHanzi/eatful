import {DQS_TIERS, TierId} from 'src/constants/dqs';
import type {DiaryEntry} from 'src/screens/Diary/Diary.types';

const getTierTotals = (selectedTiers: Record<TierId, number>) => {
  let score = 0;
  let count = 0;

  for (const tier of DQS_TIERS) {
    const tierCount = selectedTiers[tier.id];

    score += tier.score * tierCount;
    count += tierCount;
  }

  return {score, count};
};

export const getEntryScore = (selectedTiers: Record<TierId, number>): number => {
  const {score, count} = getTierTotals(selectedTiers);

  return count === 0 ? 0 : score / count;
};

export const getDayScore = (entries: DiaryEntry[]): number => {
  let totalScore = 0;
  let totalCount = 0;

  for (const entry of entries) {
    const {score, count} = getTierTotals(entry.selectedTiers);

    totalScore += score;
    totalCount += count;
  }

  return totalCount === 0 ? 0 : totalScore / totalCount;
};

export const formatDietaryScore = (score: number) => {
  const truncated = Math.trunc(score * 10) / 10;

  return truncated.toFixed(1);
};
