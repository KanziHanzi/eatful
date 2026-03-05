import {Image} from 'expo-image';
import {Modal, Pressable, TextInput, View} from 'react-native';
import {Icon, Text} from 'src/components';
import {useTheme} from 'src/hooks/useTheme';
import {useDiaryContext} from 'src/screens/Diary/hooks';
import {styles} from './EntryModal.styles';

const EntryModal = () => {
  const {palette} = useTheme();

  const {
    draftImageUri,
    draftNote,
    draftReason,
    eatingReasonOptions,
    isAddModalVisible,
    isCapturing,
    captureDraftImage,
    closeAddEntryModal,
    saveEntryFromDraft,
    setDraftNote,
    setDraftReason,
  } = useDiaryContext();

  return (
    <Modal
      animationType="fade"
      visible={isAddModalVisible}
      onRequestClose={closeAddEntryModal}
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={closeAddEntryModal}
      >
        <Pressable
          style={[styles.modalCard, {backgroundColor: palette.modalCard}]}
          onPress={event => {
            event.stopPropagation();
          }}
        >
          <View style={styles.modalHeader}>
            <Pressable
              onPress={closeAddEntryModal}
              style={styles.modalHeaderButton}
            >
              <Text>Cancel</Text>
            </Pressable>
            <Text>Add entry</Text>
            <View style={styles.modalHeaderSpacer} />
          </View>

          <Pressable
            style={styles.modalImagePressable}
            onPress={() => {
              void captureDraftImage();
            }}
            disabled={isCapturing}
          >
            {draftImageUri ? (
              <Image
                source={{uri: draftImageUri}}
                style={styles.modalImage}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.modalImagePlaceholder, {borderColor: palette.addTileBorder}]}>
                <Icon
                  name="photo-camera"
                  size={32}
                />
                <Text>Tap to take photo</Text>
              </View>
            )}
          </Pressable>

          <TextInput
            value={draftNote}
            onChangeText={setDraftNote}
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
                const isSelected = draftReason === option;

                return (
                  <Pressable
                    key={option}
                    style={styles.reasonOptionRow}
                    onPress={() => {
                      setDraftReason(option);
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
            onPress={saveEntryFromDraft}
          >
            <Text>Save entry</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EntryModal;
