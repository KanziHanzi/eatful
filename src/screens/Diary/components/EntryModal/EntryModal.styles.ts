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
modalImagePressable: {
    width: '100%',
    aspectRatio: 1.45,
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  modalImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  modalImagePlaceholderText: {
    fontSize: 14,
    opacity: 0.75,
  },
timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  timeButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  timePickerBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timePickerCard: {
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    minWidth: 280,
  },
  timePickerDone: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
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
  pillText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  saveButton: {
    marginTop: 2,
    borderRadius: 12,
    minHeight: 44,
    backgroundColor: '#0A7EA4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
