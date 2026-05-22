import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {STRICT_MODE} from 'src/constants/features';
import {useTheme} from 'src/hooks/useTheme';
import type {DiaryEntry} from 'src/types/diary';
import {getDayTimestamp} from 'src/utils/dateTime';
import {AddEntry, Entry, Header, Insights, StrictDiaryGrid} from './components';
import {styles} from './Diary.styles';
import {useDiaryStore} from './hooks';

const EMPTY_ENTRIES: DiaryEntry[] = [];

export const Diary = () => {
  const theme = useTheme();

  const {activeDay, activeDayTimestamp} = useDiaryStore(store => ({
    activeDay: store.activeDay,
    activeDayTimestamp: store.activeDayTimestamp,
  }));

  const entries = activeDay?.entries ?? EMPTY_ENTRIES;
  const isViewingToday = activeDayTimestamp === getDayTimestamp(Date.now());

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: theme.colors.background}]}
      edges={['top']}
    >
      <View style={styles.container}>
        <Header />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {STRICT_MODE ? (
            <StrictDiaryGrid entries={entries} isViewingToday={isViewingToday} />
          ) : (
            <View style={styles.grid}>
              {entries.map(item => (
                <Entry key={item.id} item={item} />
              ))}
              {isViewingToday && <AddEntry />}
            </View>
          )}
          {!STRICT_MODE && <Insights />}
        </ScrollView>

        {STRICT_MODE && (
          <View style={styles.strictBanner}>
            <Text style={styles.strictBannerText}>strict mode</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
