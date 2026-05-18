import type {DqsCategoryId} from 'src/constants/dqs.types';

export type EatingReason = 'hungry' | 'pleasure' | 'social' | 'stressed' | 'cravings' | 'sadness' | 'reward' | 'habit';

export type EntryCategory = 'meal' | 'snack';

export type DiaryEntry = {
  id: string;
  uri: string;
  takenAt: number;
  note?: string;
  eatingReason?: EatingReason;
  category: EntryCategory;
  dqsCategoryIds?: DqsCategoryId[];
};

export type DiaryDay = {
  dateKey: string;
  timestamp: number;
  entries: DiaryEntry[];
};
