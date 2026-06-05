import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';
import {Alert} from 'react-native';

const imagePickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: false,
  quality: 0.8,
};

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

      const captureResult = await ImagePicker.launchCameraAsync(imagePickerOptions);

      if (captureResult.canceled) {
        return null;
      }

      const [capturedAsset] = captureResult.assets;
      return capturedAsset.uri;
    } catch (error: unknown) {
      const errorResult = error as ImagePicker.ImagePickerErrorResult;

      Alert.alert('', errorResult.message, [{text: 'Ok', style: 'cancel'}]);
    } finally {
      setCapturing(false);
    }
  };

  const pickFromLibrary = async () => {
    if (capturing) {
      return null;
    }

    setCapturing(true);

    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert('Photo library access needed', 'Allow photo library access to add meal photos.');
        return null;
      }

      const pickResult = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

      if (pickResult.canceled) {
        return null;
      }

      const [pickedAsset] = pickResult.assets;
      return pickedAsset.uri;
    } finally {
      setCapturing(false);
    }
  };

  return {
    capturing,
    captureImage,
    pickFromLibrary,
  };
};
