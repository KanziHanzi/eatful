import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {Alert} from 'react-native';

import {DIARY_DAY_PREFIX, DIARY_START_DATE_KEY, getDiaryDayKey} from 'src/constants/storage';
import type {DiaryDay, DiaryEntry} from 'src/types/diary';
import {formatDate, getDateKey, getDayTimestamp} from 'src/utils/dateTime';

type DiaryContextValue = {
  activeDayLabel: string;
  canGoBack: boolean;
  entries: DiaryEntry[];
  isAddModalVisible: boolean;
  isDetailModalVisible: boolean;
  isViewingToday: boolean;
  selectedEntry: DiaryEntry | null;
  addEntry: (entry: DiaryEntry) => void;
  clearCache: () => void;
  closeAddEntryModal: () => void;
  closeDetailModal: () => void;
  moveToNextDay: () => void;
  moveToPreviousDay: () => void;
  openAddEntryModal: () => void;
  openDetailModal: (entry: DiaryEntry) => void;
};

const DiaryContext = createContext<DiaryContextValue | null>(null);

export const eatingReasonOptions = ['hungry', 'bored', 'social', 'stressed', 'cravings', 'guilty', 'reward'] as const;

type DiaryProviderProps = {
  children: ReactNode;
};

export const DiaryProvider = ({children}: DiaryProviderProps) => {
  const [activeDay, setActiveDay] = useState<DiaryDay | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const todayDayTimestamp = getDayTimestamp(Date.now());
  const [activeDayTimestamp, setActiveDayTimestamp] = useState(todayDayTimestamp);
  const loadingRef = useRef<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);

  const activeDateKey = getDateKey(activeDayTimestamp);
  const isViewingToday = activeDayTimestamp === todayDayTimestamp;
  const activeDayLabel = isViewingToday ? 'Today' : formatDate(activeDayTimestamp);

  const entries = useMemo<DiaryEntry[]>(() => activeDay?.entries ?? [], [activeDay]);

  const canGoBack = startDate != null && activeDateKey !== startDate;

  useEffect(() => {
    const resolveStartDate = async () => {
      try {
        const cached = await AsyncStorage.getItem(DIARY_START_DATE_KEY);
        if (cached) {
          setStartDate(cached);
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
        setStartDate(earliest);
      } catch {
        console.warn('Failed to resolve start date');
      }
    };

    void resolveStartDate();
  }, []);

  useEffect(() => {
    const load = async () => {
      loadingRef.current = activeDateKey;

      try {
        const raw = await AsyncStorage.getItem(getDiaryDayKey(activeDateKey));
        if (loadingRef.current !== activeDateKey) return;

        if (raw) {
          setActiveDay(JSON.parse(raw) as DiaryDay);
        } else {
          setActiveDay(null);
        }
      } catch {
        console.warn(`Failed to load diary day: ${activeDateKey}`);
        if (loadingRef.current === activeDateKey) {
          setActiveDay(null);
        }
      }
    };

    void load();
  }, [activeDateKey]);

  const persistDay = useCallback(async (day: DiaryDay | null, dateKey: string) => {
    try {
      if (day && day.entries.length > 0) {
        await AsyncStorage.setItem(getDiaryDayKey(dateKey), JSON.stringify(day));
      } else {
        await AsyncStorage.removeItem(getDiaryDayKey(dateKey));
      }
    } catch {
      console.warn(`Failed to persist diary day: ${dateKey}`);
    }
  }, []);

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

  const openAddEntryModal = () => {
    if (!isViewingToday) return;
    setIsAddModalVisible(true);
  };

  const closeAddEntryModal = () => {
    setIsAddModalVisible(false);
  };

  const openDetailModal = (entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setIsDetailModalVisible(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalVisible(false);
  };

  const addEntry = (entry: DiaryEntry) => {
    const updatedDay: DiaryDay = activeDay
      ? {...activeDay, entries: [...activeDay.entries, entry]}
      : {dateKey: activeDateKey, timestamp: activeDayTimestamp, entries: [entry]};

    setActiveDay(updatedDay);
    void persistDay(updatedDay, activeDateKey);

    if (startDate == null || activeDateKey < startDate) {
      setStartDate(activeDateKey);
      AsyncStorage.setItem(DIARY_START_DATE_KEY, activeDateKey).catch(() => {});
    }
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
          setActiveDay(null);
          void persistDay(null, activeDateKey);
        },
      },
    ]);
  };

  const moveToPreviousDay = () => {
    if (!canGoBack) return;

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

  const value: DiaryContextValue = {
    activeDayLabel,
    canGoBack,
    entries,
    isAddModalVisible,
    isDetailModalVisible,
    isViewingToday,
    selectedEntry,
    addEntry,
    clearCache,
    closeAddEntryModal,
    closeDetailModal,
    moveToNextDay,
    moveToPreviousDay,
    openAddEntryModal,
    openDetailModal,
  };

  return <DiaryContext.Provider value={value}>{children}</DiaryContext.Provider>;
};

export const useDiaryContext = () => {
  const context = useContext(DiaryContext);

  if (!context) {
    throw new Error('useDiaryContext must be used inside DiaryProvider');
  }

  return context;
};
