import { Colors } from 'src/constants/theme';
import { useColorScheme } from 'src/hooks/useColorScheme';

type ThemeColorOptions = {
  light?: string;
  dark?: string;
};

type ThemeColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export const useThemeColor = (options: ThemeColorOptions, colorName: ThemeColorName) => {
  const theme = useColorScheme() ?? 'light';
  const colorFromOptions = options[theme];

  if (colorFromOptions) {
    return colorFromOptions;
  }

  return Colors[theme][colorName];
};
