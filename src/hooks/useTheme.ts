import {useColorScheme as useNativeColorScheme} from 'react-native';

import {Colors, type ThemePalette} from 'src/constants/theme';

type UseThemeResult = {
  isDark: boolean;
  palette: ThemePalette;
};

export const useTheme = (): UseThemeResult => {
  const colorScheme = useNativeColorScheme();

  if (colorScheme === 'dark') {
    return {
      isDark: true,
      palette: Colors.dark,
    };
  }

  return {
    isDark: false,
    palette: Colors.light,
  };
};
