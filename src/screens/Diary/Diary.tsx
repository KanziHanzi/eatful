import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from 'src/hooks/useTheme';
import {AddEntry, Entry, EntryDetailModal, EntryModal, Header, Insights} from './components';
import {styles} from './Diary.styles';
import {DiaryProvider, useDiaryContext} from './hooks';

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

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {entries.map(item => (
              <Entry key={item.id} item={item} />
            ))}
            {isViewingToday && <AddEntry />}
          </View>
          <Insights />
        </ScrollView>

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
