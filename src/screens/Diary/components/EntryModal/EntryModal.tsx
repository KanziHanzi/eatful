import DateTimePicker from '@react-native-community/datetimepicker';
import {randomUUID} from 'expo-crypto';
import {Image} from 'expo-image';
import {router, useLocalSearchParams} from 'expo-router';
import {useState} from 'react';
import {Alert, Modal, Platform, Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, Text} from 'src/components';
import {useCameraCapture} from 'src/hooks/useCameraCapture';
import {useTheme} from 'src/hooks/useTheme';
import {eatingReasonOptions, useDiaryStore} from 'src/screens/Diary/hooks';
import type {EatingReason, EntryCategory} from 'src/types/diary';
import {styles} from './EntryModal.styles';

const EntryModal = () => {
  const {palette} = useTheme();
  const {captureImage, pickFromLibrary, capturing} = useCameraCapture();

  const {category: categoryParam} = useLocalSearchParams<{category?: string}>();
  const category: EntryCategory = categoryParam === 'snack' ? 'snack' : 'meal';

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [reason, setReason] = useState<EatingReason | null>(null);
  const [takenAt, setTakenAt] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const {addEntry} = useDiaryStore(store => ({
    addEntry: store.addEntry,
  }));

  const handleClose = () => {
    router.back();
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

    addEntry({
      id: randomUUID(),
      uri: imageUri,
      takenAt: takenAt.getTime(),
      eatingReason: reason,
      category,
    });

    handleClose();
  };

  return (
    <SafeAreaView>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Pressable
            onPress={handleClose}
            style={[styles.pill, {borderColor: palette.inputBorder}]}
          >
            <Text style={styles.pillText}>Cancel</Text>
          </Pressable>
          <Text>Add entry</Text>
          <Pressable
            style={[styles.timeButton, {borderColor: palette.inputBorder}]}
            onPress={() => setShowTimePicker(true)}
          >
            <Icon name="access-time" size={16} />
            <Text style={styles.timeButtonText}>
              {takenAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false})}
            </Text>
          </Pressable>
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

        <Modal
          transparent
          visible={showTimePicker}
          animationType="fade"
          onRequestClose={() => setShowTimePicker(false)}
        >
          <Pressable
            style={styles.timePickerBackdrop}
            onPress={() => setShowTimePicker(false)}
          >
            <Pressable style={[styles.timePickerCard, {backgroundColor: palette.modalCard}]}>
              <DateTimePicker
                value={takenAt}
                mode="time"
                display="spinner"
                is24Hour
                onChange={(_event, date) => {
                  if (Platform.OS === 'android') setShowTimePicker(false);
                  if (date) setTakenAt(date);
                }}
              />
              {Platform.OS === 'ios' && (
                <Pressable
                  style={styles.timePickerDone}
                  onPress={() => setShowTimePicker(false)}
                >
                  <Text>Done</Text>
                </Pressable>
              )}
            </Pressable>
          </Pressable>
        </Modal>

        <View style={styles.reasonSection}>
          <Text>why do I eat this?</Text>

          <View style={styles.pillGrid}>
            {eatingReasonOptions.map(option => {
              const isSelected = reason === option;
              return (
                <Pressable
                  key={option}
                  style={[styles.pill, {borderColor: palette.inputBorder}, isSelected && styles.pillSelected]}
                  onPress={() => setReason(option)}
                >
                  <Text style={styles.pillText}>{option}</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default EntryModal;
