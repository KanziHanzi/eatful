import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 36,
  },
  arrowButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  hidden: {
    opacity: 0,
  },
});
