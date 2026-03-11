import {Image} from 'expo-image';
import {useState} from 'react';
import {Alert, Modal, Pressable, TextInput, View} from 'react-native';
import {Icon, Text} from 'src/components';
import {useCameraCapture} from 'src/hooks/useCameraCapture';
import {useTheme} from 'src/hooks/useTheme';
import {eatingReasonOptions, useDiaryStore} from 'src/screens/Diary/hooks';
import type {EatingReason} from 'src/types/diary';
import {styles} from './EntryModal.styles';

const EntryModal = () => {
  const {palette} = useTheme();
  const {captureImage, pickFromLibrary, capturing} = useCameraCapture();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [reason, setReason] = useState<EatingReason | null>(null);

  const {visibleModal, addEntry, setVisibleModal} = useDiaryStore(store => ({
    visibleModal: store.visibleModal,
    addEntry: store.addEntry,
    setVisibleModal: store.setVisibleModal,
  }));

  const resetDraft = () => {
    setImageUri(null);
    setNote('');
    setReason(null);
  };

  const handleClose = () => {
    setVisibleModal(null);
    resetDraft();
  };

  const handleImageResult = (uri: string | null) => {
    if (uri) {
      setImageUri(uri);
    }
  };

  const handleAddPhoto = () => {
    Alert.alert('Add Photo', undefined, [
      {text: 'Take Photo', onPress: () => void captureImage().then(handleImageResult)},
      {text: 'Choose from Library', onPress: () => void pickFromLibrary().then(handleImageResult)},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const handleSave = () => {
    if (!imageUri) {
      Alert.alert('Photo required', 'Take a photo before saving this entry.');
      return;
    }

    if (!reason) {
      Alert.alert('Reason required', 'Choose why you are eating this entry.');
      return;
    }

    const trimmedNote = note.trim();

    addEntry({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      uri: imageUri,
      takenAt: Date.now(),
      note: trimmedNote.length > 0 ? trimmedNote : undefined,
      eatingReason: reason,
    });

    handleClose();
  };

  return (
    <Modal
      animationType="fade"
      visible={visibleModal === 'addEntry'}
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
              <Text>Cancel</Text>
            </Pressable>
            <Text>Add entry</Text>
            <View style={styles.modalHeaderSpacer} />
          </View>

          <Pressable
            style={styles.modalImagePressable}
            onPress={handleAddPhoto}
            disabled={capturing}
          >
            {imageUri ? (
              <Image
                source={{uri: imageUri}}
                style={styles.modalImage}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.modalImagePlaceholder, {borderColor: palette.addTileBorder}]}>
                <Icon
                  name="add-a-photo"
                  size={32}
                />
                <Text>Tap to add photo</Text>
              </View>
            )}
          </Pressable>

          <TextInput
            value={note}
            onChangeText={setNote}
            style={[
              styles.noteInput,
              {
                color: palette.text,
                borderColor: palette.inputBorder,
              },
            ]}
            placeholder="Optional title"
            placeholderTextColor={palette.placeholderText}
            numberOfLines={1}
          />

          <View style={styles.reasonSection}>
            <Text>why do I eat this?</Text>

            <View style={styles.reasonOptionsGrid}>
              {eatingReasonOptions.map(option => {
                const isSelected = reason === option;

                return (
                  <Pressable
                    key={option}
                    style={styles.reasonOptionRow}
                    onPress={() => {
                      setReason(option);
                    }}
                  >
                    <View style={[styles.radioOuter, {borderColor: palette.radioBorder}]}>
                      {isSelected ? <View style={[styles.radioInner, {backgroundColor: palette.text}]} /> : null}
                    </View>
                    <Text>{option}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text>Save entry</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EntryModal;
