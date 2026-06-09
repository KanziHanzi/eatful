import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageKey {
  Entries = 'entries',
  DiaryStartDate = 'eatful:diary:startDate',
}

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    const rawValue = await AsyncStorage.getItem(key);

    if (rawValue === null) return null;

    try {
      return JSON.parse(rawValue) as T;
    } catch {
      return rawValue as T;
    }
  },

  async set<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },

  async remove(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  async removeAll(): Promise<void> {
    const storageKeys = Object.values(StorageKey);

    await AsyncStorage.multiRemove(storageKeys);
  },
};
