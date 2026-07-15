import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tile: {
    flexGrow: 1,
    flexBasis: '47%',
    maxWidth: '48%',
    gap: 6,
  },
  label: {
    textAlign: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  emptyBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
