export type EatingReason = 'hungry' | 'bored' | 'social' | 'stressed';

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
