import {ThemedText, ThemedView} from '@/src/components';
import {randomUUID} from 'expo-crypto';
import {router} from 'expo-router';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'src/hooks/useTheme';
import {useDiaryStore} from 'src/screens/Diary/hooks';
import {useEntryStore} from '../../../hooks/entryStore';

const SaveButton = () => {
  const theme = useTheme();

  const {timestamp, imageUri, eatingReason, category, selectedTiers} = useEntryStore();

  const disabled = eatingReason === null;

  const onPress = () => {
    if (eatingReason === null) return;

    // TODO: rework with new diary storage
    useDiaryStore.getState().addEntry({
      id: randomUUID(),
      takenAt: timestamp,
      imageUri,
      eatingReason,
      category,
      selectedTiers,
    });

    router.back();
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
    >
      <ThemedView
        variant="elevated"
        backgroundColor={disabled ? 'modalCard' : 'tint'}
        alignItems="center"
        alignContent="center"
        paddingVertical="s"
        borderRadius={theme.borderRadius.xs}
      >
        <ThemedText
          color={disabled ? 'placeholderText' : 'text'}
          variant="description"
        >
          {'Save entry'}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default SaveButton;
