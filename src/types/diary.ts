export type EatingReason = 'hungry' | 'pleasure' | 'social' | 'stressed' | 'cravings' | 'sadness' | 'reward' | 'habit';

export type DiaryEntry = {
  id: string;
  uri: string;
  takenAt: number;
  note?: string;
  eatingReason?: EatingReason;
};

export type DiaryDay = {
  dateKey: string;
  timestamp: number;
  entries: DiaryEntry[];
};
