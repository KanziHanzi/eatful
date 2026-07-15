import {ThemedText, ThemedView} from 'src/components/primitives';
import {STRICT_MODE} from 'src/constants/features';
import {MEAL_SLOTS} from 'src/screens/Diary/slots';
import {useEntryStore} from '../../hooks/entryStore';
import CancelButton from './components/CancelButton';
import TimePicker from './components/TimePicker';

const Header = () => {
  const {editingId, category} = useEntryStore();

  const slotLabel = MEAL_SLOTS.find(slot => slot.category === category)?.label;

  const getTitle = () => {
    if (editingId) return 'Edit Entry';
    if (STRICT_MODE && slotLabel) return slotLabel;
    return 'New Entry';
  };

  return (
    <ThemedView
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <CancelButton />

      <ThemedText variant="subtitle">{getTitle()}</ThemedText>

      <TimePicker />
    </ThemedView>
  );
};

export {Header};
