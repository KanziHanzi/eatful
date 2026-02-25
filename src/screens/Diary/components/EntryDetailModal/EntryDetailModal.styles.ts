import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  modalCard: {
    width: '100%',
    maxWidth: 440,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 14,
    gap: 10,
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 12,
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
  noteInput: {
    minHeight: 42,
    maxHeight: 42,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 0,
    textAlignVertical: 'center',
    fontSize: 15,
    opacity: 0.9,
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
  unselectedReasonOption: {
    opacity: 0.45,
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
});
