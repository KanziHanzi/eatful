import {Pressable, View} from 'react-native';
import {Icon, Text} from 'src/components/atoms';
import {useDiaryStore} from 'src/screens/Diary/hooks';
import {formatDate, getDayTimestamp} from 'src/utils/dateTime';
import {styles} from './Header.styles';

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
    <View style={styles.header}>
      <Pressable
        style={[styles.arrowButton, !canGoBack && styles.hidden]}
        onPress={moveToPreviousDay}
        disabled={!canGoBack}
      >
        <Icon
          name="arrow-back-ios"
          size={24}
        />
      </Pressable>

      <Text variant="title">{activeDayLabel}</Text>

      <Pressable
        style={[styles.arrowButton, isViewingToday && styles.hidden]}
        onPress={moveToNextDay}
        disabled={isViewingToday}
      >
        <Icon
          name="arrow-forward-ios"
          size={24}
        />
      </Pressable>
    </View>
  );
};

export default Header;
