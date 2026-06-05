import {useEffect} from 'react';
import {ThemedSafeAreaView, ThemedScrollView, ThemedView} from 'src/components';
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
    <ThemedSafeAreaView
      flex={1}
      paddingHorizontal="m"
      paddingTop="l"
    >
      <Header />

      <ThemedScrollView
        flex={1}
        showsVerticalScrollIndicator={false}
        marginVertical='m'
      >
        <ThemedView gap="l">
          <Photo />
          <EatingReason />
          <DietaryScore />
        </ThemedView>
      </ThemedScrollView>

      <SaveButton />
    </ThemedSafeAreaView>
  );
};

export {NewEntry};
