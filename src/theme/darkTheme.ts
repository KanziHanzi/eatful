import {lightTheme, type Theme} from './lightTheme';
import {palette} from './palette';

export const darkTheme: Theme = {
  ...lightTheme,
  colors: {
    mainBackground: palette.gray900,
    cardBackground: palette.gray850,
    surfaceMuted: palette.gray800,

    textPrimary: palette.gray100,
    textMuted: palette.gray500,
    textInverse: palette.ink,

    iconPrimary: palette.gray100,
    iconMuted: palette.gray400,

    accentPrimary: palette.white,
    accentOnPrimary: palette.ink,

    borderSubtle: palette.gray700,
    borderStrong: palette.gray300,
    borderRadio: palette.gray500,

    highlight: palette.orangeHighlight,
    backdrop: palette.backdrop40,
    transparent: palette.transparent,

    dqsPositive2Bg: palette.green900,
    dqsPositive2Accent: palette.green500,
    dqsPositive2Title: palette.white,
    dqsPositive2Caption: palette.green100,

    dqsPositive1Bg: palette.teal900,
    dqsPositive1Accent: palette.teal500,
    dqsPositive1Title: palette.white,
    dqsPositive1Caption: palette.teal100,

    dqsZeroBg: palette.gray800,
    dqsZeroAccent: palette.gray400,
    dqsZeroTitle: palette.white,
    dqsZeroCaption: palette.gray300,

    dqsNegative1Bg: palette.orange900,
    dqsNegative1Accent: palette.orange500,
    dqsNegative1Title: palette.white,
    dqsNegative1Caption: palette.orange100,

    dqsNegative2Bg: palette.red900,
    dqsNegative2Accent: palette.red500,
    dqsNegative2Title: palette.white,
    dqsNegative2Caption: palette.red100,
  },
};
