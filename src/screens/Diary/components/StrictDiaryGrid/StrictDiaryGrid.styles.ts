import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  section: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    opacity: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emptySlot: {
    flexGrow: 1,
    flexBasis: '30%',
    maxWidth: '32%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    opacity: 0.25,
  },
});
