import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { Colors } from 'src/constants/theme';
import { useColorScheme } from 'src/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const navigationTheme =
    colorScheme === 'dark'
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: Colors.dark.background,
            card: Colors.dark.background,
            text: Colors.dark.text,
            primary: Colors.dark.tint,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: Colors.light.background,
            card: Colors.light.background,
            text: Colors.light.text,
            primary: Colors.light.tint,
          },
        };

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar
        style={colorScheme === 'dark' ? 'light' : 'dark'}
        backgroundColor={palette.background}
        translucent={false}
      />
    </ThemeProvider>
  );
}
