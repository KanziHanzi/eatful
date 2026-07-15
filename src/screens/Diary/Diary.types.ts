import type {TierId} from 'src/constants/dqs';

export type EatingReason = 'hungry' | 'pleasure' | 'social' | 'stressed' | 'cravings' | 'sadness' | 'reward' | 'habit';

export type EntryCategory = 'protein-shake' | 'yoghurt' | 'meal' | 'snack';

export type DiaryEntry = {
  id: string;
  takenAt: number;
  imageUri: string | null;
  eatingReason: EatingReason;
  category: EntryCategory;
  selectedTiers: Record<TierId, number>;
};

export type DiaryDay = {
  dateKey: string;
  timestamp: number;
  entries: DiaryEntry[];
};
