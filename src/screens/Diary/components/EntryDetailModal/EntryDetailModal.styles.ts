import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 40,
    paddingBottom: 14,
    gap: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 32,
  },
  modalImageContainer: {
    width: '100%',
    aspectRatio: 1.45,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  reasonSection: {
    gap: 8,
  },
  pillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillSelected: {
    borderColor: '#FF8C00',
    borderWidth: 1.5,
    shadowColor: '#FF8C00',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 4,
  },
  pillUnselected: {
    opacity: 0.35,
  },
  pillText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
