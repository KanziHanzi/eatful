import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useFonts} from 'expo-font';
import {useEffect} from 'react';
import {useSession} from 'src/context/SessionContext';

export const useAssetLoader = () => {
  const [fontLoaded, fontError] = useFonts({...MaterialIcons.font});

  const {setAttributes} = useSession();

  useEffect(() => {
    if (fontError) {
      console.warn('Failed to load icon font: ', fontError);
      setAttributes({fallbackIcons: true, assetsLoaded: true});
      return;
    }

    if (fontLoaded) {
      setAttributes({assetsLoaded: true});
    }
  }, [fontError, fontLoaded, setAttributes]);
};
