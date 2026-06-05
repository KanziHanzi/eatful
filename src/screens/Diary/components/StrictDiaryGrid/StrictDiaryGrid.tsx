import {View} from 'react-native';
import {Text} from 'src/components';
import {STRICT_MEAL_SLOTS, STRICT_SNACK_SLOTS} from 'src/constants/features';
import {useTheme} from 'src/hooks/useTheme';
import type {DiaryEntry} from '@/src/screens/Diary/Diary.types';
import AddEntry from '../AddEntry/AddEntry';
import Entry from '../Entry/Entry';
import {styles} from './StrictDiaryGrid.styles';

type Props = {
  entries: DiaryEntry[];
  isViewingToday: boolean;
};

const EmptySlot = ({borderColor}: {borderColor: string}) => (
  <View style={[styles.emptySlot, {borderColor}]} />
);

const StrictDiaryGrid = ({entries, isViewingToday}: Props) => {
  const theme = useTheme();

  const mealEntries = entries
    .filter(e => e.category === 'meal')
    .sort((a, b) => a.takenAt - b.takenAt);

  const snackEntries = entries
    .filter(e => e.category === 'snack')
    .sort((a, b) => a.takenAt - b.takenAt);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Meals</Text>
        <View style={styles.grid}>
          {Array.from({length: STRICT_MEAL_SLOTS}).map((_, i) => {
            const entry = mealEntries[i];
            if (entry) {
              return <Entry key={entry.id} item={entry} />;
            }
            if (isViewingToday) {
              return <AddEntry key={`meal-empty-${i}`} category="meal" />;
            }
            return <EmptySlot key={`meal-empty-${i}`} borderColor={theme.colors.addTileBorder} />;
          })}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Snacks</Text>
        <View style={styles.grid}>
          {Array.from({length: STRICT_SNACK_SLOTS}).map((_, i) => {
            const entry = snackEntries[i];
            if (entry) {
              return <Entry key={entry.id} item={entry} />;
            }
            if (isViewingToday) {
              return <AddEntry key={`snack-empty-${i}`} category="snack" />;
            }
            return <EmptySlot key={`snack-empty-${i}`} borderColor={theme.colors.addTileBorder} />;
          })}
        </View>
      </View>
    </View>
  );
};

export default StrictDiaryGrid;
