import {router} from 'expo-router';
import {TouchableOpacity} from 'react-native';
import {ThemedText, ThemedView} from 'src/components';

const CancelButton = () => {
  const onCancel = () => {
    router.back();
  };

  return (
    <TouchableOpacity onPress={onCancel}>
      <ThemedView
        flexDirection="row"
        alignItems="center"
        paddingVertical="xxs"
        paddingHorizontal="xs"
        borderWidth={1}
        borderRadius={99}
        borderColor="inputBorder"
      >
        <ThemedText variant="description">{'Cancel'}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default CancelButton;
