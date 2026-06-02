import {useEffect} from 'react';
import {ThemedScrollView, ThemedView} from 'src/components';
import DietaryScore from './components/DietaryScore';
import EatingReason from './components/EatingReason';
import SaveButton from './components/EatingReason/components/SaveButton';
import {Header} from './components/Header';
import {Photo} from './components/Photo';
import {useEntryStore} from './hooks/entryStore';

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

      <ThemedScrollView showsVerticalScrollIndicator={false}>
        <ThemedView gap="l">
          <Photo />
          <EatingReason />
          <DietaryScore />
        </ThemedView>
      </ThemedScrollView>

      <SaveButton />
    </ThemedView>
  );
};

export {NewEntry};
