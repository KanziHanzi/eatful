export type DiaryEntry = {
  id: string;
  uri: string;
  takenAt: number;
};

export type DiaryDay = {
  dateKey: string;
  timestamp: number;
  entries: DiaryEntry[];
};
