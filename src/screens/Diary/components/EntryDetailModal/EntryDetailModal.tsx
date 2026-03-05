import {Image} from 'expo-image';
import {Modal, Pressable, TextInput, View} from 'react-native';
import {Text} from 'src/components';
import {useTheme} from 'src/hooks/useTheme';
import {eatingReasonOptions, useDiaryContext} from 'src/screens/Diary/hooks';
import {styles} from './EntryDetailModal.styles';

const EntryDetailModal = () => {
  const {palette} = useTheme();

  const {isDetailModalVisible, selectedEntry, closeDetailModal} = useDiaryContext();

  return (
    <Modal
      animationType="fade"
      visible={isDetailModalVisible}
      onRequestClose={closeDetailModal}
      transparent
      statusBarTranslucent
    >
      <Pressable
        style={styles.modalOverlay}
        onPress={closeDetailModal}
      >
        <Pressable
          style={[styles.modalCard, {backgroundColor: palette.modalCard}]}
          onPress={event => {
            event.stopPropagation();
          }}
        >
          <View style={styles.modalHeader}>
            <View style={styles.modalHeaderSpacer} />
            <Text>Entry details</Text>
            <Pressable
              onPress={closeDetailModal}
              style={styles.modalHeaderButton}
            >
              <Text>Close</Text>
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
