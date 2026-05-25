import {ThemedView} from 'src/components';
import {Header} from './components/Header';
import {Photo} from './components/Photo';
import {useEntryStore} from './hooks/entryStore';
import {useEffect} from 'react';

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
    >
      <Header />

      <ThemedView marginTop="l">
        <Photo />
      </ThemedView>
    </ThemedView>
  );
};

export {NewEntry};
