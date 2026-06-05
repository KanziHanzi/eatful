import {IconName} from 'src/components/globals/Icon/Icon';
import {DQS_TIERS, DqsTier, TierScore} from 'src/constants/dqs';
import {Color} from 'src/constants/theme';

export const getValuePrefix = (value: number) => {
  if (value > 0) {
    return '+';
  } else {
    return '';
  }
};

const TIER_ICON_NAMES: Record<TierScore, IconName> = {
  2: 'eco',
  1: 'thumb-up',
  [-1]: 'thumb-down',
  [-2]: 'warning',
};

const TIER_COLORS: Record<TierScore, Color> = {
  2: 'tierSuperfoods',
  1: 'tierHighQuality',
  [-1]: 'tierLowQuality',
  [-2]: 'tierUltraProcessed',
};

const TIER_SURFACE_COLORS: Record<TierScore, Color> = {
  2: 'tierSuperfoodsSurface',
  1: 'tierHighQualitySurface',
  [-1]: 'tierLowQualitySurface',
  [-2]: 'tierUltraProcessedSurface',
};

export const getTierIconName = (score: TierScore): IconName => TIER_ICON_NAMES[score];

export const getTierColor = (score: TierScore): Color => TIER_COLORS[score];

export const getTierSurfaceColor = (score: TierScore): Color => TIER_SURFACE_COLORS[score];

export const getTierByScore = (score: number): DqsTier | null => {
  if (score >= 1.5) return DQS_TIERS[0];
  if (score >= 0.5) return DQS_TIERS[1];
  if (score <= -1.5) return DQS_TIERS[3];
  if (score <= -0.5) return DQS_TIERS[2];

  return null;
};
