import {router} from 'expo-router';

import {Box, Icon, Pressable, Text} from 'src/components';
import {useDiaryStore} from 'src/screens/Diary/hooks';
import {formatDate, getDayTimestamp} from 'src/utils/dateTime';

const Header = () => {
  const {activeDayTimestamp, startDate, moveToNextDay, moveToPreviousDay} = useDiaryStore(store => ({
    activeDayTimestamp: store.activeDayTimestamp,
    startDate: store.startDate,
    moveToNextDay: store.moveToNextDay,
    moveToPreviousDay: store.moveToPreviousDay,
  }));

  const isViewingToday = activeDayTimestamp === getDayTimestamp(Date.now());
  const activeDayLabel = isViewingToday ? 'Today' : formatDate(activeDayTimestamp);
  const canGoBack = startDate != null && activeDayTimestamp !== startDate;

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      minHeight={36}
    >
      <Pressable
        paddingHorizontal="xs"
        paddingVertical="nano"
        onPress={moveToPreviousDay}
        disabled={!canGoBack}
        opacity={canGoBack ? 1 : 0}
      >
        <Icon
          name="arrow-back-ios"
          size={24}
        />
      </Pressable>

      <Pressable onLongPress={() => router.push('/sandbox')}>
        <Text variant="title">{activeDayLabel}</Text>
      </Pressable>

      <Pressable
        paddingHorizontal="xs"
        paddingVertical="nano"
        onPress={moveToNextDay}
        disabled={isViewingToday}
        opacity={isViewingToday ? 0 : 1}
      >
        <Icon
          name="arrow-forward-ios"
          size={24}
        />
      </Pressable>
    </Box>
  );
};

export default Header;
