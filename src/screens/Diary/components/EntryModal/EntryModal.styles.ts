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
  modalHeaderButton: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    minWidth: 54,
  },
  modalHeaderButtonText: {
    fontSize: 15,
  },
  modalHeaderSpacer: {
    minWidth: 54,
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
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
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
  reasonOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  reasonOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '48%',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  reasonOptionText: {
    fontSize: 15,
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
