import {Alert, TouchableOpacity} from 'react-native';
import {ThemedText, ThemedView} from 'src/components/primitives';
import {useDiaryStore} from 'src/screens/Diary/hooks';
import {useEntryStore} from '../../hooks/entryStore';

const DeleteButton = () => {
  const {editingId} = useEntryStore();

  if (!editingId) return null;

  const onPress = () => {
    Alert.alert('Delete entry?', 'This entry will be permanently removed.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => useDiaryStore.getState().deleteEntry(editingId),
      },
    ]);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        alignItems="center"
        paddingVertical="s"
        marginTop="s"
      >
        <ThemedText
          color="tierUltraProcessed"
          variant="description"
        >
          {'Delete entry'}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default DeleteButton;
