import * as ImagePicker from 'expo-image-picker';
import {useEffect, useMemo, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ThemedView} from 'src/components/ThemedView';
import {Colors} from 'src/constants/theme';
import {useColorScheme} from 'src/hooks/useColorScheme';
import type {DiaryDay, DiaryEntry, EatingReason} from 'src/types/diary';
import {formatDate, getDateKey, getDayTimestamp} from 'src/utils/dateTime';
import {loadDiaryDays, saveDiaryDays} from 'src/utils/diaryStorage';

import {AddEntryModal, DiaryGridItem, DiaryHeader, EntryDetailModal} from './components';
import {styles} from './Diary.styles';

type AddTile = {
  id: 'add-tile';
  kind: 'add';
};

type GridItem = DiaryEntry | AddTile;

const gridColumns = 3;
const eatingReasonOptions: EatingReason[] = ['hungry', 'bored', 'social', 'stressed', 'cravings', 'guilty'];

export const Diary = () => {
  const [diaryDays, setDiaryDays] = useState<DiaryDay[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [draftImageUri, setDraftImageUri] = useState<string | null>(null);
  const [draftNote, setDraftNote] = useState('');
  const [draftReason, setDraftReason] = useState<EatingReason | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const palette = Colors[colorScheme];
  const addTileColor = colorScheme === 'dark' ? '#C8C8C8' : '#4A4A4A';
  const modalCardColor = colorScheme === 'dark' ? '#232526' : '#FFFFFF';
  const radioBorderColor = colorScheme === 'dark' ? '#6E7478' : '#808487';
  const inputBorderColor = colorScheme === 'dark' ? '#555A5E' : '#D6D8DA';
  const todayDayTimestamp = getDayTimestamp(Date.now());
  const [activeDayTimestamp, setActiveDayTimestamp] = useState(todayDayTimestamp);
  const activeDateKey = getDateKey(activeDayTimestamp);
  const isViewingToday = activeDayTimestamp === todayDayTimestamp;

  const activeDayLabel = isViewingToday ? 'Today' : formatDate(activeDayTimestamp);

  const activeDayEntries = useMemo(() => {
    const matchingDay = diaryDays.find(day => day.dateKey === activeDateKey);
    return matchingDay?.entries ?? [];
  }, [activeDateKey, diaryDays]);

  const gridItems = useMemo<GridItem[]>(() => {
    if (!isViewingToday) {
      return activeDayEntries;
    }

    return [...activeDayEntries, {id: 'add-tile', kind: 'add'}];
  }, [activeDayEntries, isViewingToday]);

  useEffect(() => {
    const hydrateDiary = async () => {
      try {
        const loadedDiaryDays = await loadDiaryDays();
        setDiaryDays(loadedDiaryDays);
      } catch {
        Alert.alert('Could not load diary', 'Starting with an empty diary.');
      } finally {
        setIsLoaded(true);
      }
    };

    void hydrateDiary();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const persistDiary = async () => {
      await saveDiaryDays(diaryDays);
    };

    void persistDiary();
  }, [diaryDays, isLoaded]);

  useEffect(() => {
    if (isDetailModalVisible) {
      return;
    }

    const clearSelectedEntryTimer = setTimeout(() => {
      setSelectedEntry(null);
    }, 180);

    return () => {
      clearTimeout(clearSelectedEntryTimer);
    };
  }, [isDetailModalVisible]);

  const captureMeal = async () => {
    if (isCapturing) {
      return;
    }

    setIsCapturing(true);

    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (permission.status !== 'granted') {
        Alert.alert('Camera access needed', 'Allow camera access to track meals with photos.');
        return;
      }

      const captureResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (captureResult.canceled) {
        return;
      }

      const [capturedAsset] = captureResult.assets;
      return capturedAsset.uri;
    } finally {
      setIsCapturing(false);
    }
  };

  const resetAddEntryDraft = () => {
    setDraftImageUri(null);
    setDraftNote('');
    setDraftReason(null);
  };

  const openAddEntryModal = () => {
    if (!isViewingToday) {
      return;
    }

    resetAddEntryDraft();
    setIsAddModalVisible(true);
  };

  const closeAddEntryModal = () => {
    setIsAddModalVisible(false);
    resetAddEntryDraft();
  };

  const openDetailModal = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
  };

  const captureDraftImage = async () => {
    const capturedImageUri = await captureMeal();

    if (!capturedImageUri) {
      return;
    }

    setDraftImageUri(capturedImageUri);
  };

  const saveEntryFromDraft = () => {
    if (!draftImageUri) {
      Alert.alert('Photo required', 'Take a photo before saving this entry.');
      return;
    }

    if (!draftReason) {
      Alert.alert('Reason required', 'Choose why you are eating this entry.');
      return;
    }

    const takenAt = Date.now();
    const dateKey = activeDateKey;
    const dayTimestamp = activeDayTimestamp;
    const trimmedNote = draftNote.trim();

    setDiaryDays(currentDays => {
      const nextEntry: DiaryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        uri: draftImageUri,
        takenAt,
        note: trimmedNote.length > 0 ? trimmedNote : undefined,
        eatingReason: draftReason,
      };

      const hasMatchingDay = currentDays.some(day => day.dateKey === dateKey);

      if (hasMatchingDay) {
        return currentDays.map(day => {
          if (day.dateKey !== dateKey) {
            return day;
          }

          return {
            ...day,
            entries: [...day.entries, nextEntry],
          };
        });
      }

      return [
        {
          dateKey,
          timestamp: dayTimestamp,
          entries: [nextEntry],
        },
        ...currentDays,
      ];
    });

    closeAddEntryModal();
  };

  const clearCache = () => {
    Alert.alert('Clear this day?', 'This removes all entries for the selected day.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => {
          setDiaryDays(currentDays => {
            return currentDays.filter(day => day.dateKey !== activeDateKey);
          });
        },
      },
    ]);
  };

  const moveToPreviousDay = () => {
    setActiveDayTimestamp(currentTimestamp => {
      const previousDay = new Date(currentTimestamp);
      previousDay.setDate(previousDay.getDate() - 1);
      return previousDay.getTime();
    });
  };

  const moveToNextDay = () => {
    setActiveDayTimestamp(currentTimestamp => {
      const nextDay = new Date(currentTimestamp);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayTimestamp = nextDay.getTime();

      return Math.min(nextDayTimestamp, todayDayTimestamp);
    });
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: palette.background}]}
      edges={['top']}
    >
      <ThemedView style={styles.container}>
        <DiaryHeader
          title={activeDayLabel}
          onPreviousDayPress={moveToPreviousDay}
          onNextDayPress={moveToNextDay}
          showNextDayButton={!isViewingToday}
          onClearPress={clearCache}
        />

        <FlatList
          data={gridItems}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <DiaryGridItem
                item={item}
                isCapturing={isCapturing}
                addTileColor={addTileColor}
                onAddPress={openAddEntryModal}
                onEntryPress={openDetailModal}
              />
            );
          }}
          numColumns={gridColumns}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        />

        <AddEntryModal
          visible={isAddModalVisible}
          isCapturing={isCapturing}
          colorScheme={colorScheme}
          paletteTextColor={palette.text}
          modalCardColor={modalCardColor}
          addTileColor={addTileColor}
          inputBorderColor={inputBorderColor}
          radioBorderColor={radioBorderColor}
          draftImageUri={draftImageUri}
          draftNote={draftNote}
          draftReason={draftReason}
          eatingReasonOptions={eatingReasonOptions}
          onClose={closeAddEntryModal}
          onSave={saveEntryFromDraft}
          onCaptureImage={captureDraftImage}
          onChangeNote={setDraftNote}
          onSelectReason={setDraftReason}
        />

        <EntryDetailModal
          visible={isDetailModalVisible}
          selectedEntry={selectedEntry}
          colorScheme={colorScheme}
          paletteTextColor={palette.text}
          modalCardColor={modalCardColor}
          inputBorderColor={inputBorderColor}
          radioBorderColor={radioBorderColor}
          eatingReasonOptions={eatingReasonOptions}
          onClose={closeDetailModal}
        />
      </ThemedView>
    </SafeAreaView>
  );
};
