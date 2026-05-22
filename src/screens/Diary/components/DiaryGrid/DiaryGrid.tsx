import {Box, Text} from 'src/components';
import {STRICT_MEAL_SLOTS, STRICT_MODE, STRICT_SNACK_SLOTS} from 'src/constants/features';
import type {DiaryEntry, EntryCategory} from 'src/types/diary';

import {AddEntry, Entry} from '../index';

type Props = {
  entries: DiaryEntry[];
  isViewingToday: boolean;
};

const EmptySlot = () => (
  <Box
    flexGrow={1}
    flexBasis="30%"
    maxWidth="32%"
    aspectRatio={1}
    borderRadius="s"
    borderWidth={1.5}
    borderStyle="dashed"
    borderColor="borderStrong"
    opacity={0.25}
  />
);

const DiaryGrid = ({entries, isViewingToday}: Props) => {
  const mealEntries = entries
    .filter(e => e.category === 'meal')
    .sort((a, b) => a.takenAt - b.takenAt);

  const snackEntries = entries
    .filter(e => e.category === 'snack')
    .sort((a, b) => a.takenAt - b.takenAt);

  const drinkEntries = entries
    .filter(e => e.category === 'drink')
    .sort((a, b) => a.takenAt - b.takenAt);

  const renderSection = (
    sectionEntries: DiaryEntry[],
    category: EntryCategory,
    strictSlotCount: number | null,
  ) => {
    if (STRICT_MODE && strictSlotCount !== null) {
      return Array.from({length: strictSlotCount}).map((_, i) => {
        const entry = sectionEntries[i];
        if (entry) return <Entry key={entry.id} item={entry} />;
        if (isViewingToday) return <AddEntry key={`${category}-empty-${i}`} category={category} />;
        return <EmptySlot key={`${category}-empty-${i}`} />;
      });
    }

    const items = sectionEntries.map(entry => <Entry key={entry.id} item={entry} />);
    if (isViewingToday) {
      items.push(<AddEntry key={`${category}-add`} category={category} />);
    }
    return items;
  };

  return (
    <Box gap="l">
      <Box gap="s">
        <Text
          fontSize={13}
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing={0.6}
          opacity={0.5}
        >
          Meals
        </Text>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          gap="sm"
        >
          {renderSection(mealEntries, 'meal', STRICT_MEAL_SLOTS)}
        </Box>
      </Box>

      <Box gap="s">
        <Text
          fontSize={13}
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing={0.6}
          opacity={0.5}
        >
          Snacks
        </Text>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          gap="sm"
        >
          {renderSection(snackEntries, 'snack', STRICT_SNACK_SLOTS)}
        </Box>
      </Box>

      <Box gap="s">
        <Text
          fontSize={13}
          fontWeight="600"
          textTransform="uppercase"
          letterSpacing={0.6}
          opacity={0.5}
        >
          Drinks
        </Text>
        <Box
          flexDirection="row"
          flexWrap="wrap"
          gap="sm"
        >
          {renderSection(drinkEntries, 'drink', null)}
        </Box>
      </Box>
    </Box>
  );
};

export default DiaryGrid;
