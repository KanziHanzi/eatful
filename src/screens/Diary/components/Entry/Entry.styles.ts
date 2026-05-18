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
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
