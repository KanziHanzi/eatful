import {type Theme} from '@react-navigation/native';
import {useTheme} from 'src/hooks/useTheme';

type UseNavigationThemeResult = {
  navigationTheme: Theme;
  statusBarBackground: string;
  statusBarStyle: 'light-content' | 'dark-content';
};

export const useNavigationTheme = (): UseNavigationThemeResult => {
  const {isDark, palette} = useTheme();

  const navigationTheme: Theme = {
    dark: isDark,
    colors: {
      background: palette.background,
      card: palette.background,
      text: palette.text,
      primary: palette.tint,
      border: palette.inputBorder,
      notification: palette.tint,
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
    statusBarBackground: palette.background,
    statusBarStyle: palette.statusBarStyle === 'light' ? 'light-content' : 'dark-content',
  };
};
