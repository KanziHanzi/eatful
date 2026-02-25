import {Image} from 'expo-image';
import {Modal, Pressable, TextInput, View} from 'react-native';

import {ThemedText} from 'src/components/ThemedText';
import type {DiaryEntry, EatingReason} from 'src/types/diary';

import {styles} from './EntryDetailModal.styles';

type EntryDetailModalProps = {
  visible: boolean;
  selectedEntry: DiaryEntry | null;
  colorScheme: 'light' | 'dark';
  paletteTextColor: string;
  modalCardColor: string;
  inputBorderColor: string;
  radioBorderColor: string;
  eatingReasonOptions: EatingReason[];
  onClose: () => void;
};

export const EntryDetailModal = ({
  visible,
  selectedEntry,
  colorScheme,
  paletteTextColor,
  modalCardColor,
  inputBorderColor,
  radioBorderColor,
  eatingReasonOptions,
  onClose,
}: EntryDetailModalProps) => {
  return (
    <Modal
      animationType="fade"
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
            <View style={styles.modalHeaderSpacer} />
            <ThemedText type="defaultSemiBold">Entry details</ThemedText>
            <Pressable
              onPress={onClose}
              style={styles.modalHeaderButton}
            >
              <ThemedText style={styles.modalHeaderButtonText}>Close</ThemedText>
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
                color: paletteTextColor,
                borderColor: inputBorderColor,
              },
            ]}
            placeholder="No title"
            placeholderTextColor={colorScheme === 'dark' ? '#8E9498' : '#969A9D'}
            numberOfLines={1}
          />

          <View style={styles.reasonSection}>
            <ThemedText type="defaultSemiBold">why do I eat this?</ThemedText>

            <View style={styles.reasonOptionsGrid}>
              {eatingReasonOptions.map(option => {
                const isSelected = selectedEntry?.eatingReason === option;

                return (
                  <View
                    key={option}
                    style={[styles.reasonOptionRow, !isSelected ? styles.unselectedReasonOption : undefined]}
                  >
                    <View style={[styles.radioOuter, {borderColor: radioBorderColor}]}>
                      {isSelected ? <View style={[styles.radioInner, {backgroundColor: paletteTextColor}]} /> : null}
                    </View>
                    <ThemedText style={styles.reasonOptionText}>{option}</ThemedText>
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
