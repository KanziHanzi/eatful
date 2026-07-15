import {router} from 'expo-router';
import {Alert} from 'react-native';
import {createWithEqualityFn} from 'zustand/traditional';
import {shallow} from 'zustand/shallow';

import {getDiaryDayKey} from 'src/constants/storage';
import type {DiaryDay, DiaryEntry} from 'src/screens/Diary/Diary.types';
import {getDateKey, getDayTimestamp} from 'src/utils/dateTime';
import {storage, StorageKey} from 'src/utils/storage';

export const eatingReasonOptions = ['hungry', 'pleasure', 'social', 'stressed', 'cravings', 'sadness', 'reward', 'habit'] as const;

type DiaryState = {
  activeDay: DiaryDay | null;
  activeDayTimestamp: number;
  startDate: number | null;
};

type DiaryActions = {
  addEntry: (entry: DiaryEntry) => void;
  updateEntry: (entry: DiaryEntry) => void;
  clearCache: () => void;
  deleteEntry: (entryId: string) => void;
  moveToNextDay: () => void;
  moveToPreviousDay: () => void;
};

const persistDay = async (day: DiaryDay | null, dateKey: string) => {
  try {
    if (day && day.entries.length > 0) {
      await storage.set(getDiaryDayKey(dateKey), day);
    } else {
      await storage.remove(getDiaryDayKey(dateKey));
    }
  } catch {
    console.warn(`Failed to persist diary day: ${dateKey}`);
  }
};

let loadingKey: string | null = null;

const loadDay = async (dateKey: string) => {
  loadingKey = dateKey;

  try {
    const day = await storage.get<DiaryDay>(getDiaryDayKey(dateKey));
    if (loadingKey !== dateKey) return;

    useDiaryStore.setState({activeDay: day});
  } catch {
    console.warn(`Failed to load diary day: ${dateKey}`);
    if (loadingKey === dateKey) {
      useDiaryStore.setState({activeDay: null});
    }
  }
};

const resolveStartDate = async () => {
  try {
    const cached = await storage.get<number>(StorageKey.DiaryStartDate);
    if (cached != null) {
      useDiaryStore.setState({startDate: cached});
      return;
    }

    const today = getDayTimestamp(Date.now());
    await storage.set(StorageKey.DiaryStartDate, today);
    useDiaryStore.setState({startDate: today});
  } catch {
    console.warn('Failed to resolve start date');
  }
};

export const useDiaryStore = createWithEqualityFn<DiaryState & DiaryActions>()(
  (set, get) => ({
    activeDay: null,
    activeDayTimestamp: getDayTimestamp(Date.now()),
    startDate: null,

    addEntry: (entry: DiaryEntry) => {
      const {activeDay, startDate, activeDayTimestamp} = get();
      const dateKey = getDateKey(activeDayTimestamp);

      const updatedDay: DiaryDay = activeDay
        ? {...activeDay, entries: [...activeDay.entries, entry]}
        : {dateKey, timestamp: activeDayTimestamp, entries: [entry]};

      set({activeDay: updatedDay});
      void persistDay(updatedDay, dateKey);

      if (startDate == null || activeDayTimestamp < startDate) {
        set({startDate: activeDayTimestamp});
        storage.set(StorageKey.DiaryStartDate, activeDayTimestamp).catch(() => {});
      }
    },

    updateEntry: (entry: DiaryEntry) => {
      const {activeDay, activeDayTimestamp} = get();
      if (!activeDay) return;

      const dateKey = getDateKey(activeDayTimestamp);
      const updatedEntries = activeDay.entries.map(e => (e.id === entry.id ? entry : e));
      const updatedDay: DiaryDay = {...activeDay, entries: updatedEntries};

      set({activeDay: updatedDay});
      void persistDay(updatedDay, dateKey);
    },

    deleteEntry: (entryId: string) => {
      const {activeDay, activeDayTimestamp} = get();
      if (!activeDay) return;

      const dateKey = getDateKey(activeDayTimestamp);
      const updatedEntries = activeDay.entries.filter(e => e.id !== entryId);
      const updatedDay: DiaryDay | null =
        updatedEntries.length > 0 ? {...activeDay, entries: updatedEntries} : null;

      set({activeDay: updatedDay});
      void persistDay(updatedDay, dateKey);
      router.back();
    },

    clearCache: () => {
      const {activeDayTimestamp} = get();
      const dateKey = getDateKey(activeDayTimestamp);

      Alert.alert('Clear this day?', 'This removes all entries for the selected day.', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            set({activeDay: null});
            void persistDay(null, dateKey);
          },
        },
      ]);
    },

    moveToPreviousDay: () => {
      const {activeDayTimestamp, startDate} = get();
      if (startDate == null || activeDayTimestamp === startDate) return;

      const previousDay = new Date(activeDayTimestamp);
      previousDay.setDate(previousDay.getDate() - 1);
      set({activeDayTimestamp: previousDay.getTime()});
    },

    moveToNextDay: () => {
      const {activeDayTimestamp} = get();
      const todayTimestamp = getDayTimestamp(Date.now());

      const nextDay = new Date(activeDayTimestamp);
      nextDay.setDate(nextDay.getDate() + 1);
      set({activeDayTimestamp: Math.min(nextDay.getTime(), todayTimestamp)});
    },
  }),
  shallow,
);

// Auto-load day when activeDayTimestamp changes
let prevDateKey = getDateKey(useDiaryStore.getState().activeDayTimestamp);
useDiaryStore.subscribe(state => {
  const dateKey = getDateKey(state.activeDayTimestamp);
  if (dateKey !== prevDateKey) {
    prevDateKey = dateKey;
    void loadDay(dateKey);
  }
});

void resolveStartDate();
void loadDay(getDateKey(useDiaryStore.getState().activeDayTimestamp));
