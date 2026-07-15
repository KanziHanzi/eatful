import {ThemeProvider as NavigationThemeProvider} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from 'src/constants/theme';
import {SessionProvider, useSession} from 'src/context/SessionContext';
import {useAssetLoader} from 'src/hooks/useAssetLoader';
import {useNavigationTheme} from 'src/hooks/useNavigationTheme';

void SplashScreen.preventAutoHideAsync();

const AppContainer = () => {
  const {navigationTheme, statusBarBackground, statusBarStyle} = useNavigationTheme();
  const {ready} = useSession();

  useAssetLoader();

  useEffect(() => {
    if (ready) {
      void SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="add-entry"
          options={{
            presentation: 'formSheet',
            sheetAllowedDetents: 'fitToContents',
            sheetGrabberVisible: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="new-entry"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackground}
      />
    </NavigationThemeProvider>
  );
};

const RootLayout = () => {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <AppContainer />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default RootLayout;
