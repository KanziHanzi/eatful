import {type Theme as NavigationTheme} from '@react-navigation/native';

import type {Theme} from 'src/theme';

type UseNavigationThemeResult = {
  navigationTheme: NavigationTheme;
  statusBarBackground: string;
  statusBarStyle: 'light-content' | 'dark-content';
};

export const useNavigationTheme = (theme: Theme, isDark: boolean): UseNavigationThemeResult => {
  const navigationTheme: NavigationTheme = {
    dark: isDark,
    colors: {
      background: theme.colors.mainBackground,
      card: theme.colors.cardBackground,
      text: theme.colors.textPrimary,
      primary: theme.colors.accentPrimary,
      border: theme.colors.borderSubtle,
      notification: theme.colors.accentPrimary,
    },
    fonts: {
      regular: {
        fontFamily: 'Inter',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Inter',
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: 'Inter',
        fontWeight: 'normal',
      },
      heavy: {
        fontFamily: 'Inter',
        fontWeight: 'normal',
      },
    },
  };

  return {
    navigationTheme,
    statusBarBackground: theme.colors.mainBackground,
    statusBarStyle: isDark ? 'light-content' : 'dark-content',
  };
};
