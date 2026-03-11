import {Image} from 'expo-image';
import {Alert, Modal, Pressable, TextInput, View} from 'react-native';
import {Icon, Text} from 'src/components';
import {useTheme} from 'src/hooks/useTheme';
import {eatingReasonOptions, useDiaryStore} from 'src/screens/Diary/hooks';
import {styles} from './EntryDetailModal.styles';

const EntryDetailModal = () => {
  const {palette} = useTheme();

  const {visibleModal, selectedEntry, setVisibleModal, deleteEntry} = useDiaryStore(store => ({
    visibleModal: store.visibleModal,
    selectedEntry: store.selectedEntry,
    setVisibleModal: store.setVisibleModal,
    deleteEntry: store.deleteEntry,
  }));

  const handleClose = () => setVisibleModal(null);

  const handleDelete = () => {
    if (!selectedEntry) return;

    Alert.alert('Delete entry?', 'This entry will be permanently removed.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteEntry(selectedEntry.id),
      },
    ]);
  };

  return (
    <Modal
      animationType="fade"
      visible={visibleModal === 'entryDetail'}
      onRequestClose={handleClose}
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={handleClose}
      >
        <Pressable
          style={[styles.modalCard, {backgroundColor: palette.modalCard}]}
          onPress={event => {
            event.stopPropagation();
          }}
        >
          <View style={styles.modalHeader}>
            <Pressable
              onPress={handleClose}
              style={styles.modalHeaderButton}
            >
              <Text>Close</Text>
            </Pressable>
            <Text>Entry details</Text>
            <Pressable
              onPress={handleDelete}
              style={styles.modalHeaderButton}
            >
              <Icon name="delete" size={22} />
            </Pressable>
          </View>

          {selectedEntry ? (
            <View style={styles.modalImageContainer}>
              <Image
                source={{uri: selectedEntry.uri}}
                style={styles.modalImage}
                contentFit="cover"
              />
            </View>
          ) : null}

          <TextInput
            value={selectedEntry?.note ?? ''}
            editable={false}
            style={[
              styles.noteInput,
              {
                color: palette.text,
                borderColor: palette.inputBorder,
              },
            ]}
            placeholder="No title"
            placeholderTextColor={palette.placeholderText}
            numberOfLines={1}
          />

          <View style={styles.reasonSection}>
            <Text>why do I eat this?</Text>

            <View style={styles.reasonOptionsGrid}>
              {eatingReasonOptions.map(option => {
                const isSelected = selectedEntry?.eatingReason === option;

                return (
                  <View
                    key={option}
                    style={[styles.reasonOptionRow, !isSelected ? styles.unselectedReasonOption : undefined]}
                  >
                    <View style={[styles.radioOuter, {borderColor: palette.radioBorder}]}>
                      {isSelected ? <View style={[styles.radioInner, {backgroundColor: palette.text}]} /> : null}
                    </View>
                    <Text>{option}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EntryDetailModal;
