import {createTheme} from '@shopify/restyle';

import {borderRadius, breakpoints, spacing} from './baseTheme';
import {palette} from './palette';

export const lightTheme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardBackground: palette.white,
    surfaceMuted: palette.gray50,

    textPrimary: palette.ink,
    textMuted: palette.gray500,
    textInverse: palette.white,

    iconPrimary: palette.ink,
    iconMuted: palette.gray600,

    accentPrimary: palette.blue500,
    accentOnPrimary: palette.white,

    borderSubtle: palette.gray200,
    borderStrong: palette.gray700,
    borderRadio: palette.gray500,

    highlight: palette.orangeHighlight,
    backdrop: palette.backdrop40,
    transparent: palette.transparent,

    dqsPositive2Bg: palette.green100,
    dqsPositive2Accent: palette.green900,
    dqsPositive2Title: palette.ink,
    dqsPositive2Caption: palette.green900,

    dqsPositive1Bg: palette.teal100,
    dqsPositive1Accent: palette.teal900,
    dqsPositive1Title: palette.ink,
    dqsPositive1Caption: palette.teal900,

    dqsZeroBg: palette.gray100,
    dqsZeroAccent: palette.gray700,
    dqsZeroTitle: palette.ink,
    dqsZeroCaption: palette.gray700,

    dqsNegative1Bg: palette.orange100,
    dqsNegative1Accent: palette.orange900,
    dqsNegative1Title: palette.ink,
    dqsNegative1Caption: palette.orange900,

    dqsNegative2Bg: palette.red100,
    dqsNegative2Accent: palette.red900,
    dqsNegative2Title: palette.ink,
    dqsNegative2Caption: palette.red900,
  },
  spacing,
  borderRadii: borderRadius,
  breakpoints,
  textVariants: {
    defaults: {
      fontFamily: 'Inter',
      color: 'textPrimary',
      fontSize: 16,
      lineHeight: 24,
    },
    title: {
      fontFamily: 'Inter',
      fontSize: 32,
      lineHeight: 32,
      fontWeight: 'bold',
      color: 'textPrimary',
    },
    subtitle: {
      fontFamily: 'Inter',
      fontSize: 20,
      lineHeight: 20,
      fontWeight: 'bold',
      color: 'textPrimary',
    },
    description: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 24,
      fontWeight: 'normal',
      color: 'textPrimary',
    },
    label: {
      fontFamily: 'Inter',
      fontSize: 14,
      lineHeight: 14,
      fontWeight: 'bold',
      color: 'textPrimary',
    },
    labelCaption: {
      fontFamily: 'Inter',
      fontSize: 12,
      lineHeight: 12,
      fontWeight: 'normal',
      color: 'textPrimary',
    },
    link: {
      fontFamily: 'Inter',
      fontSize: 16,
      lineHeight: 30,
      fontWeight: 'normal',
      color: 'accentPrimary',
    },
  },
});

export type Theme = typeof lightTheme;
