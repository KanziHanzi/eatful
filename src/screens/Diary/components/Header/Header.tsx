import {Pressable, View} from 'react-native';
import {Icon, Text} from 'src/components';
import {useDiaryContext} from 'src/screens/Diary/hooks';
import {styles} from './Header.styles';

const Header = () => {
  const {activeDayLabel, canGoBack, isViewingToday, moveToNextDay, moveToPreviousDay} = useDiaryContext();

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
