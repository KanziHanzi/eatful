import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  reasonLabel: {
    width: 72,
    textTransform: 'capitalize',
  },
  barTrack: {
    flex: 1,
    height: 14,
    borderRadius: 7,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 7,
  },
  countLabel: {
    width: 24,
    textAlign: 'right',
  },
});
