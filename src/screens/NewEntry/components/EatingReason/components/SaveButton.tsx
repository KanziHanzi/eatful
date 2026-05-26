import {ThemedText, ThemedView} from '@/src/components';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'src/hooks/useTheme';
import {useEntryStore} from '../../../hooks/entryStore';

const SaveButton = () => {
  const theme = useTheme();

  const {eatingReason} = useEntryStore();

  const disabled = eatingReason === null;

  const onPress = () => {
    // TODO: save entry and pop screen
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
        paddingVertical="xs"
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
