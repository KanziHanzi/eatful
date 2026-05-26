import {Icon, ThemedScrollView, ThemedText, ThemedView} from 'src/components';
import {Header} from './components/Header';
import {Photo} from './components/Photo';
import {useEntryStore} from './hooks/entryStore';
import {useEffect} from 'react';
import EatingReason from './components/EatingReason';
import SaveButton from './components/EatingReason/components/SaveButton';

const NewEntry = () => {
  const {reset} = useEntryStore();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <ThemedView
      paddingHorizontal="m"
      marginTop="l"
      marginBottom="s"
      gap="l"
    >
      <Header />

      <ThemedScrollView>
        <ThemedView gap="l">
          <Photo />
          <EatingReason />
        </ThemedView>
      </ThemedScrollView>

      <SaveButton />
    </ThemedView>
  );
};

export {NewEntry};
