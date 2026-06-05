import {ThemedText, ThemedView} from '@/src/components';
import CancelButton from './components/CancelButton';
import TimePicker from './components/TimePicker';

const Header = () => {
  return (
    <ThemedView
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <CancelButton />

      <ThemedText variant="subtitle">{'New Entry'}</ThemedText>

      <TimePicker />
    </ThemedView>
  );
};

export {Header};
