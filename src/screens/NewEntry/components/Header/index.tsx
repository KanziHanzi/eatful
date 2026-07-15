import {ThemedText, ThemedView} from 'src/components/primitives';
import {useEntryStore} from '../../hooks/entryStore';
import CancelButton from './components/CancelButton';
import TimePicker from './components/TimePicker';

const Header = () => {
  const {editingId} = useEntryStore();

  return (
    <ThemedView
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <CancelButton />

      <ThemedText variant="subtitle">{editingId ? 'Edit Entry' : 'New Entry'}</ThemedText>

      <TimePicker />
    </ThemedView>
  );
};

export {Header};
