import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'src/hooks/useTheme';
import type {DiaryEntry} from 'src/types/diary';
import {AddEntry, Entry, EntryDetailModal, EntryModal, Header} from './components';
import {styles} from './Diary.styles';
import {DiaryProvider, useDiaryContext} from './hooks';

const gridColumns = 3;
const ADD_ENTRY_ID = '__add__';
const addEntryPlaceholder = {id: ADD_ENTRY_ID} as DiaryEntry;

const DiaryContent = () => {
  const {entries, isViewingToday} = useDiaryContext();
  const {palette} = useTheme();

  const data = isViewingToday ? [...entries, addEntryPlaceholder] : entries;

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: palette.background}]}
      edges={['top']}
    >
      <View style={styles.container}>
        <Header />

        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            if (item.id === ADD_ENTRY_ID) {
              return <AddEntry />;
            }

            return <Entry item={item} />;
          }}
          numColumns={gridColumns}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        />

        <EntryModal />
        <EntryDetailModal />
      </View>
    </SafeAreaView>
  );
};

export const Diary = () => {
  return (
    <DiaryProvider>
      <DiaryContent />
    </DiaryProvider>
  );
};
