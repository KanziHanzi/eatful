export type EatingReason = 'hungry' | 'bored' | 'social' | 'stressed' | 'cravings' | 'guilty' | 'reward';

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
