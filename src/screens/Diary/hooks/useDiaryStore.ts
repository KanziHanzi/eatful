import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {createWithEqualityFn} from 'zustand/traditional';
import {shallow} from 'zustand/shallow';

import {DIARY_DAY_PREFIX, DIARY_START_DATE_KEY, getDiaryDayKey} from 'src/constants/storage';
import type {DiaryDay, DiaryEntry} from 'src/types/diary';
import {getDateKey, getDayTimestamp} from 'src/utils/dateTime';

export const eatingReasonOptions = ['hungry', 'bored', 'social', 'stressed', 'cravings', 'guilty', 'reward'] as const;

export type DiaryModal = 'addEntry' | 'entryDetail';

type DiaryState = {
  activeDay: DiaryDay | null;
  activeDayTimestamp: number;
  startDate: string | null;
  visibleModal: DiaryModal | null;
  selectedEntry: DiaryEntry | null;
};

type DiaryActions = {
  addEntry: (entry: DiaryEntry) => void;
  clearCache: () => void;
  deleteEntry: (entryId: string) => void;
  moveToNextDay: () => void;
  moveToPreviousDay: () => void;
  openDetailModal: (entry: DiaryEntry) => void;
  setVisibleModal: (modal: DiaryModal | null) => void;
};

const persistDay = async (day: DiaryDay | null, dateKey: string) => {
  try {
    if (day && day.entries.length > 0) {
      await AsyncStorage.setItem(getDiaryDayKey(dateKey), JSON.stringify(day));
    } else {
      await AsyncStorage.removeItem(getDiaryDayKey(dateKey));
    }
  } catch {
    console.warn(`Failed to persist diary day: ${dateKey}`);
  }
};

let loadingKey: string | null = null;

const loadDay = async (dateKey: string) => {
  loadingKey = dateKey;

  try {
    const raw = await AsyncStorage.getItem(getDiaryDayKey(dateKey));
    if (loadingKey !== dateKey) return;

    useDiaryStore.setState({
      activeDay: raw ? (JSON.parse(raw) as DiaryDay) : null,
    });
  } catch {
    console.warn(`Failed to load diary day: ${dateKey}`);
    if (loadingKey === dateKey) {
      useDiaryStore.setState({activeDay: null});
    }
  }
};

const resolveStartDate = async () => {
  try {
    const cached = await AsyncStorage.getItem(DIARY_START_DATE_KEY);
    if (cached) {
      useDiaryStore.setState({startDate: cached});
      return;
    }

    const allKeys = await AsyncStorage.getAllKeys();
    const diaryKeys = allKeys
      .filter(k => k.startsWith(DIARY_DAY_PREFIX) && k !== DIARY_START_DATE_KEY)
      .map(k => k.slice(DIARY_DAY_PREFIX.length))
      .sort((a, b) => a.localeCompare(b));

    const earliest = diaryKeys[0] ?? null;
    if (earliest) {
      await AsyncStorage.setItem(DIARY_START_DATE_KEY, earliest);
    }
    useDiaryStore.setState({startDate: earliest});
  } catch {
    console.warn('Failed to resolve start date');
  }
};

export const useDiaryStore = createWithEqualityFn<DiaryState & DiaryActions>()(
  (set, get) => ({
    activeDay: null,
    activeDayTimestamp: getDayTimestamp(Date.now()),
    startDate: null,
    visibleModal: null,
    selectedEntry: null,

    setVisibleModal: (modal: DiaryModal | null) => {
      const prev = get().visibleModal;
      set({visibleModal: modal});

      if (prev === 'entryDetail' && modal !== 'entryDetail') {
        setTimeout(() => {
          if (useDiaryStore.getState().visibleModal !== 'entryDetail') {
            useDiaryStore.setState({selectedEntry: null});
          }
        }, 180);
      }
    },

    openDetailModal: (entry: DiaryEntry) => {
      set({selectedEntry: entry, visibleModal: 'entryDetail'});
    },

    addEntry: (entry: DiaryEntry) => {
      const {activeDay, startDate, activeDayTimestamp} = get();
      const dateKey = getDateKey(activeDayTimestamp);

      const updatedDay: DiaryDay = activeDay
        ? {...activeDay, entries: [...activeDay.entries, entry]}
        : {dateKey, timestamp: activeDayTimestamp, entries: [entry]};

      set({activeDay: updatedDay});
      void persistDay(updatedDay, dateKey);

      if (startDate == null || dateKey < startDate) {
        set({startDate: dateKey});
        AsyncStorage.setItem(DIARY_START_DATE_KEY, dateKey).catch(() => {});
      }
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
      get().setVisibleModal(null);
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
      const dateKey = getDateKey(activeDayTimestamp);
      if (startDate == null || dateKey === startDate) return;

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

// Initialize
void resolveStartDate();
void loadDay(getDateKey(useDiaryStore.getState().activeDayTimestamp));
