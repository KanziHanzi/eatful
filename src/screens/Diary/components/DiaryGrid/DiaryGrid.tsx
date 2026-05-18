import {View} from 'react-native';
import {Text} from 'src/components';
import {STRICT_MEAL_SLOTS, STRICT_MODE, STRICT_SNACK_SLOTS} from 'src/constants/features';
import {useTheme} from 'src/hooks/useTheme';
import type {DiaryEntry, EntryCategory} from 'src/types/diary';
import {AddEntry, Entry} from '../index';
import {styles} from './DiaryGrid.styles';

type Props = {
  entries: DiaryEntry[];
  isViewingToday: boolean;
};

const EmptySlot = ({borderColor}: {borderColor: string}) => (
  <View style={[styles.emptySlot, {borderColor}]} />
);

const DiaryGrid = ({entries, isViewingToday}: Props) => {
  const {palette} = useTheme();

  const mealEntries = entries
    .filter(e => e.category === 'meal')
    .sort((a, b) => a.takenAt - b.takenAt);

  const snackEntries = entries
    .filter(e => e.category === 'snack')
    .sort((a, b) => a.takenAt - b.takenAt);

  const renderSection = (
    sectionEntries: DiaryEntry[],
    category: EntryCategory,
    strictSlotCount: number,
  ) => {
    if (STRICT_MODE) {
      return Array.from({length: strictSlotCount}).map((_, i) => {
        const entry = sectionEntries[i];
        if (entry) return <Entry key={entry.id} item={entry} />;
        if (isViewingToday) return <AddEntry key={`${category}-empty-${i}`} category={category} />;
        return <EmptySlot key={`${category}-empty-${i}`} borderColor={palette.addTileBorder} />;
      });
    }

    const items = sectionEntries.map(entry => <Entry key={entry.id} item={entry} />);
    if (isViewingToday) {
      items.push(<AddEntry key={`${category}-add`} category={category} />);
    }
    return items;
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Meals</Text>
        <View style={styles.grid}>{renderSection(mealEntries, 'meal', STRICT_MEAL_SLOTS)}</View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Snacks</Text>
        <View style={styles.grid}>{renderSection(snackEntries, 'snack', STRICT_SNACK_SLOTS)}</View>
      </View>
    </View>
  );
};

export default DiaryGrid;
