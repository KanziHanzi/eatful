import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
    gap: 14,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  title: {
    textAlign: 'center',
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
  gridContent: {
    paddingBottom: 16,
    gap: 10,
  },
  row: {
    gap: 10,
  },
  card: {
    flex: 1,
    maxWidth: '32%',
    gap: 6,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  addTile: {
    gap: 0,
  },
  addTileImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  timestamp: {
    fontSize: 12,
    textAlign: 'center',
  },
});
