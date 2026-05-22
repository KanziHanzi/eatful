import type {DqsValue} from 'src/constants/dqs.types';

import type {Theme} from './lightTheme';

type ThemeColorKey = keyof Theme['colors'];

type DqsColorTokens = {
  bg: ThemeColorKey;
  accent: ThemeColorKey;
  title: ThemeColorKey;
  caption: ThemeColorKey;
};

export const dqsColors: Record<DqsValue, DqsColorTokens> = {
  2: {
    bg: 'dqsPositive2Bg',
    accent: 'dqsPositive2Accent',
    title: 'dqsPositive2Title',
    caption: 'dqsPositive2Caption',
  },
  1: {
    bg: 'dqsPositive1Bg',
    accent: 'dqsPositive1Accent',
    title: 'dqsPositive1Title',
    caption: 'dqsPositive1Caption',
  },
  0: {
    bg: 'dqsZeroBg',
    accent: 'dqsZeroAccent',
    title: 'dqsZeroTitle',
    caption: 'dqsZeroCaption',
  },
  [-1]: {
    bg: 'dqsNegative1Bg',
    accent: 'dqsNegative1Accent',
    title: 'dqsNegative1Title',
    caption: 'dqsNegative1Caption',
  },
  [-2]: {
    bg: 'dqsNegative2Bg',
    accent: 'dqsNegative2Accent',
    title: 'dqsNegative2Title',
    caption: 'dqsNegative2Caption',
  },
};
