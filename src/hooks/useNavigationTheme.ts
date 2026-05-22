import {type Theme} from '@react-navigation/native';
import {useTheme} from 'src/hooks/useTheme';

type UseNavigationThemeResult = {
  navigationTheme: Theme;
  statusBarBackground: string;
  statusBarStyle: 'light-content' | 'dark-content';
};

export const useNavigationTheme = (): UseNavigationThemeResult => {
  const theme = useTheme();

  const navigationTheme: Theme = {
    dark: theme.name === 'dark',
    colors: {
      background: theme.colors.background,
      card: theme.colors.background,
      text: theme.colors.text,
      primary: theme.colors.tint,
      border: theme.colors.inputBorder,
      notification: theme.colors.tint,
    },
    fonts: {
      regular: {
        fontFamily: theme.textVariants.defaults.fontFamily,
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: theme.textVariants.defaults.fontFamily,
        fontWeight: 'normal',
      },
      bold: {
        fontFamily: theme.textVariants.defaults.fontFamily,
        fontWeight: 'bold',
      },
      heavy: {
        fontFamily: theme.textVariants.defaults.fontFamily,
        fontWeight: 'bold',
      },
    },
  };

  return {
    navigationTheme,
    statusBarBackground: theme.colors.background,
    statusBarStyle: theme.statusBarStyle === 'light' ? 'light-content' : 'dark-content',
  };
};
