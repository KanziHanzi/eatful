import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import { Alert, FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from 'src/components/ThemedText';
import { ThemedView } from 'src/components/ThemedView';
import { Colors } from 'src/constants/theme';
import { useColorScheme } from 'src/hooks/useColorScheme';
import type { DiaryDay, DiaryEntry } from 'src/types/diary';
import { formatTimestamp, getDateKey, getDayTimestamp } from 'src/utils/dateTime';
import { clearDiaryDays, loadDiaryDays, saveDiaryDays } from 'src/utils/diaryStorage';

import { styles } from './DiaryScreen.styles';

type AddTile = {
  id: 'add-tile';
  kind: 'add';
};

type GridItem = DiaryEntry | AddTile;

const gridColumns = 3;

export const DiaryScreen = () => {
  const [diaryDays, setDiaryDays] = useState<DiaryDay[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const addTileColor = colorScheme === 'dark' ? '#C8C8C8' : '#4A4A4A';
  const todayDateKey = getDateKey(Date.now());

  const todayEntries = useMemo(() => {
    const matchingDay = diaryDays.find((day) => day.dateKey === todayDateKey);
    return matchingDay?.entries ?? [];
  }, [diaryDays, todayDateKey]);

  const gridItems = useMemo<GridItem[]>(() => {
    return [...todayEntries, { id: 'add-tile', kind: 'add' }];
  }, [todayEntries]);

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
      const takenAt = Date.now();
      const dateKey = getDateKey(takenAt);
      const dayTimestamp = getDayTimestamp(takenAt);

      setDiaryDays((currentDays) => {
        const nextEntry: DiaryEntry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          uri: capturedAsset.uri,
          takenAt,
        };

        const hasMatchingDay = currentDays.some((day) => day.dateKey === dateKey);

        if (hasMatchingDay) {
          return currentDays.map((day) => {
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
    } finally {
      setIsCapturing(false);
    }
  };

  const clearCache = () => {
    Alert.alert('Clear local cache?', 'This removes all stored meal photos from this device.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: async () => {
          await clearDiaryDays();
          setDiaryDays([]);
        },
      },
    ]);
  };

  const renderGridItem = ({ item }: { item: GridItem }) => {
    if ('kind' in item) {
      return (
        <Pressable
          style={({ pressed }) => [
            styles.card,
            styles.addTile,
            {
              backgroundColor: 'transparent',
              opacity: pressed || isCapturing ? 0.8 : 1,
            },
          ]}
          disabled={isCapturing}
          onPress={captureMeal}
        >
          <View style={[styles.image, styles.addTileImage, { borderColor: addTileColor }]}>
            <MaterialIcons name="add" size={38} color={addTileColor} />
          </View>
        </Pressable>
      );
    }

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.uri }} style={styles.image} contentFit="cover" />
        <ThemedText style={styles.timestamp}>{formatTimestamp(item.takenAt)}</ThemedText>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]} edges={['top']}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <Pressable style={styles.clearButton} onPress={clearCache}>
            <ThemedText style={styles.clearButtonText}>Clear</ThemedText>
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            Today
          </ThemedText>
        </ThemedView>

        <FlatList
          data={gridItems}
          keyExtractor={(item) => item.id}
          renderItem={renderGridItem}
          numColumns={gridColumns}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaView>
  );
};
