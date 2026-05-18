import {Image} from 'expo-image';
import {router} from 'expo-router';
import {Alert, Pressable, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon, Text} from 'src/components';
import {useTheme} from 'src/hooks/useTheme';
import {eatingReasonOptions, useDiaryStore} from 'src/screens/Diary/hooks';
import {styles} from './EntryDetailModal.styles';

const EntryDetailModal = () => {
  const {palette} = useTheme();

  const {selectedEntry, deleteEntry} = useDiaryStore(store => ({
    selectedEntry: store.selectedEntry,
    deleteEntry: store.deleteEntry,
  }));

  const handleClose = () => router.back();

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
    <SafeAreaView
      style={{flex: 1}}
      edges={['bottom']}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Pressable
            onPress={handleClose}
            style={[styles.pill, {borderColor: palette.inputBorder}]}
          >
            <Text style={styles.pillText}>Close</Text>
          </Pressable>
          <Text>Entry details</Text>
          <Pressable
            onPress={handleDelete}
            style={[styles.pill, {borderColor: palette.inputBorder}]}
          >
            <Icon
              name="delete"
              size={16}
            />
          </Pressable>
        </View>

        {selectedEntry ? (
          <View style={styles.modalImageContainer}>
            {selectedEntry.uri ? (
              <Image
                source={{uri: selectedEntry.uri}}
                style={styles.modalImage}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.modalImagePlaceholder, {borderColor: palette.inputBorder}]}>
                <Icon
                  name={selectedEntry.category === 'snack' ? 'cookie' : 'restaurant'}
                  size={80}
                />
              </View>
            )}
          </View>
        ) : null}

        <View style={styles.reasonSection}>
          <Text>why do I eat this?</Text>

          <View style={styles.pillGrid}>
            <View style={[styles.pill, {borderColor: palette.inputBorder}, styles.pillSelected]}>
              <Text style={styles.pillText}>{selectedEntry?.eatingReason}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EntryDetailModal;
