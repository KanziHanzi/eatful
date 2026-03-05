import {ThemeProvider} from '@react-navigation/native';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect} from 'react';
import {StatusBar} from 'react-native';
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
    <ThemeProvider value={navigationTheme}>
      <Stack screenOptions={{headerShown: false}} />
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackground}
      />
    </ThemeProvider>
  );
};

const RootLayout = () => (
  <SessionProvider>
    <AppContainer />
  </SessionProvider>
);

export default RootLayout;
