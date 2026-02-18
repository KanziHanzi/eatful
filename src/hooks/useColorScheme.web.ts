import { useEffect, useState } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';

export const useColorScheme = () => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const colorScheme = useNativeColorScheme();

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
};
