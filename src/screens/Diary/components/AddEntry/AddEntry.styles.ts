import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: '30%',
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
