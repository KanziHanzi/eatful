import {FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'src/hooks/useTheme';
import {AddEntry, Entry, EntryDetailModal, EntryModal, Header} from './components';
import {styles} from './Diary.styles';
import {DiaryProvider, useDiaryContext} from './hooks';

const gridColumns = 3;

const DiaryContent = () => {
  const {entries, isViewingToday} = useDiaryContext();
  const {palette} = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: palette.background}]}
      edges={['top']}
    >
      <View style={styles.container}>
        <Header />

        <FlatList
          data={entries}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            if (isViewingToday && index === entries.length - 1) {
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
