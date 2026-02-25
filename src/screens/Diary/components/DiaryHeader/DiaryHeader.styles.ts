import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    textAlign: 'center',
  },
  arrowButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  arrowButtonText: {
    fontSize: 20,
    lineHeight: 24,
  },
  clearButton: {
    position: 'absolute',
    left: 0,
    top: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  clearButtonText: {
    fontSize: 12,
    opacity: 0.8,
  },
});
