import {ScrollView, View} from 'react-native';
import {ThemedText, ThemedView} from 'src/components/primitives';
import {ScreenWrapper} from 'src/components/templates';
import {STRICT_MODE} from 'src/constants/features';
import type {DiaryEntry} from 'src/screens/Diary/Diary.types';
import {formatDietaryScore, getDayScore} from 'src/utils';
import {getDayTimestamp} from 'src/utils/dateTime';
import {AddEntry, Entry, Header, SlotTile} from './components';
import {styles} from './Diary.styles';
import {useDiaryStore} from './hooks';
import {MEAL_SLOTS} from './slots';

const EMPTY_ENTRIES: DiaryEntry[] = [];

export const Diary = () => {
  const {activeDay, activeDayTimestamp} = useDiaryStore(store => ({
    activeDay: store.activeDay,
    activeDayTimestamp: store.activeDayTimestamp,
  }));

  const entries = activeDay?.entries ?? EMPTY_ENTRIES;
  const isViewingToday = activeDayTimestamp === getDayTimestamp(Date.now());

  const dayScore = getDayScore(entries);
  const formattedDayScore = formatDietaryScore(dayScore);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {STRICT_MODE ? (
            <View style={styles.grid}>
              {MEAL_SLOTS.map(slot => (
                <SlotTile
                  key={slot.category}
                  slot={slot}
                  entry={entries.find(entry => entry.category === slot.category)}
                  canLog={isViewingToday}
                />
              ))}
            </View>
          ) : (
            <View style={styles.grid}>
              {entries.map(item => (
                <Entry
                  key={item.id}
                  item={item}
                />
              ))}
              {isViewingToday && <AddEntry />}
            </View>
          )}
        </ScrollView>

        <ThemedView
          width="100%"
          alignItems="center"
        >
          <ThemedText>{`Day score: ${formattedDayScore}`}</ThemedText>
        </ThemedView>
      </View>
    </ScreenWrapper>
  );
};
