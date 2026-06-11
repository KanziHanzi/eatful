import {Image} from 'expo-image';
import {Alert, TouchableOpacity} from 'react-native';
import {Icon} from 'src/components/atoms';
import {ThemedText, ThemedView} from 'src/components/primitives';
import {useCameraCapture} from 'src/hooks/useCameraCapture';
import {useEntryStore} from '../../hooks/entryStore';
import {useTheme} from 'src/hooks/useTheme';

const Photo = () => {
  const theme = useTheme();

  const {imageUri, setAttributes} = useEntryStore();
  const {captureImage, pickFromLibrary, capturing} = useCameraCapture();

  const setImage = (uri: string | null | undefined) => {
    if (typeof uri === 'string' && uri.length > 0) {
      setAttributes('imageUri', uri);
    }
  };

  const takeImage = async () => {
    const imagePath = await captureImage();

    setImage(imagePath);
  };

  const pickImage = async () => {
    const imagePath = await pickFromLibrary();

    setImage(imagePath);
  };

  const onPress = () => {
    Alert.alert('', undefined, [
      {text: 'Take Photo', onPress: takeImage},
      {text: 'Choose from Library', onPress: pickImage},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={capturing}
      activeOpacity={0.8}
    >
      <ThemedView
        variant="elevated"
        height={220}
        borderRadius={theme.borderRadius.m}
        borderWidth={1}
        borderColor="background"
        alignItems="center"
        justifyContent="center"
        backgroundColor="modalCard"
        overflow={imageUri ? 'hidden' : 'visible'}
      >
        {imageUri ? (
          <Image
            source={{uri: imageUri}}
            style={{width: '100%', height: '100%'}}
            contentFit="cover"
          />
        ) : (
          <>
            <ThemedView
              borderRadius={theme.borderRadius.round}
              padding="s"
              justifyContent="center"
              alignItems="center"
              backgroundColor="inputBorder"
            >
              <Icon
                name="photo-camera"
                size={32}
                color="tint"
              />
            </ThemedView>
            <ThemedText
              variant="description"
              marginTop="xs"
            >
              {'Tap to add photo'}
            </ThemedText>
          </>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

export {Photo};
