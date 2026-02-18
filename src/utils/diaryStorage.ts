import AsyncStorage from '@react-native-async-storage/async-storage';

import type { DiaryDay } from 'src/types/diary';

const storageKey = 'eatful:diary-days';

export const loadDiaryDays = async (): Promise<DiaryDay[]> => {
  const storedValue = await AsyncStorage.getItem(storageKey);

  if (!storedValue) {
    return [];
  }

  const parsedValue = JSON.parse(storedValue);

  if (!Array.isArray(parsedValue)) {
    return [];
  }

  return parsedValue as DiaryDay[];
};

export const saveDiaryDays = async (diaryDays: DiaryDay[]): Promise<void> => {
  await AsyncStorage.setItem(storageKey, JSON.stringify(diaryDays));
};

export const clearDiaryDays = async (): Promise<void> => {
  await AsyncStorage.removeItem(storageKey);
};
