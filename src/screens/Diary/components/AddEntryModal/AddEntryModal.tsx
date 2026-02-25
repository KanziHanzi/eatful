import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Image} from 'expo-image';
import {Modal, Pressable, TextInput, View} from 'react-native';

import {ThemedText} from 'src/components/ThemedText';
import type {EatingReason} from 'src/types/diary';

import {styles} from './AddEntryModal.styles';

type AddEntryModalProps = {
  visible: boolean;
  isCapturing: boolean;
  colorScheme: 'light' | 'dark';
  paletteTextColor: string;
  modalCardColor: string;
  addTileColor: string;
  inputBorderColor: string;
  radioBorderColor: string;
  draftImageUri: string | null;
  draftNote: string;
  draftReason: EatingReason | null;
  eatingReasonOptions: EatingReason[];
  onClose: () => void;
  onSave: () => void;
  onCaptureImage: () => void;
  onChangeNote: (value: string) => void;
  onSelectReason: (value: EatingReason) => void;
};

export const AddEntryModal = ({
  visible,
  isCapturing,
  colorScheme,
  paletteTextColor,
  modalCardColor,
  addTileColor,
  inputBorderColor,
  radioBorderColor,
  draftImageUri,
  draftNote,
  draftReason,
  eatingReasonOptions,
  onClose,
  onSave,
  onCaptureImage,
  onChangeNote,
  onSelectReason,
}: AddEntryModalProps) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={onClose}
      >
        <Pressable
          style={[styles.modalCard, {backgroundColor: modalCardColor}]}
          onPress={event => {
            event.stopPropagation();
          }}
        >
          <View style={styles.modalHeader}>
            <Pressable
              onPress={onClose}
              style={styles.modalHeaderButton}
            >
              <ThemedText style={styles.modalHeaderButtonText}>Cancel</ThemedText>
            </Pressable>
            <ThemedText type="defaultSemiBold">Add entry</ThemedText>
            <View style={styles.modalHeaderSpacer} />
          </View>

          <Pressable
            style={styles.modalImagePressable}
            onPress={onCaptureImage}
            disabled={isCapturing}
          >
            {draftImageUri ? (
              <Image
                source={{uri: draftImageUri}}
                style={styles.modalImage}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.modalImagePlaceholder, {borderColor: addTileColor}]}>
                <MaterialIcons
                  name="photo-camera"
                  size={30}
                  color={addTileColor}
                />
                <ThemedText style={styles.modalImagePlaceholderText}>Tap to take photo</ThemedText>
              </View>
            )}
          </Pressable>

          <TextInput
            value={draftNote}
            onChangeText={onChangeNote}
            style={[
              styles.noteInput,
              {
                color: paletteTextColor,
                borderColor: inputBorderColor,
              },
            ]}
            placeholder="Optional title"
            placeholderTextColor={colorScheme === 'dark' ? '#8E9498' : '#969A9D'}
            numberOfLines={1}
          />

          <View style={styles.reasonSection}>
            <ThemedText type="defaultSemiBold">why do I eat this?</ThemedText>

            <View style={styles.reasonOptionsGrid}>
              {eatingReasonOptions.map(option => {
                const isSelected = draftReason === option;

                return (
                  <Pressable
                    key={option}
                    style={styles.reasonOptionRow}
                    onPress={() => {
                      onSelectReason(option);
                    }}
                  >
                    <View style={[styles.radioOuter, {borderColor: radioBorderColor}]}>
                      {isSelected ? <View style={[styles.radioInner, {backgroundColor: paletteTextColor}]} /> : null}
                    </View>
                    <ThemedText style={styles.reasonOptionText}>{option}</ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            style={styles.saveButton}
            onPress={onSave}
          >
            <ThemedText style={styles.saveButtonText}>Save entry</ThemedText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
