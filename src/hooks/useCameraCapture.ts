import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {Alert} from 'react-native';

export const useCameraCapture = () => {
  const [capturing, setCapturing] = useState(false);

  const captureImage = async () => {
    if (capturing) {
      return null;
    }

    setCapturing(true);

    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert('Camera access needed', 'Allow camera access to track meals with photos.');
        return null;
      }

      const captureResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: false,
        quality: 0.8,
      });

      if (captureResult.canceled) {
        return null;
      }

      const [capturedAsset] = captureResult.assets;
      return capturedAsset.uri;
    } finally {
      setCapturing(false);
    }
  };

  return {
    capturing,
    captureImage,
  };
};
