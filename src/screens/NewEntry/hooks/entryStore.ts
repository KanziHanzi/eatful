import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';
import {EatingReason} from '../../Diary/Diary.types';

type EntryStoreAttributes = {
  timestamp: Date;
  imageUri: string | null;
  eatingReason: EatingReason | null;
};

type EntryStoreActions = {
  setAttributes: <T extends keyof EntryStoreAttributes>(key: T, value: EntryStoreAttributes[T]) => void;
  reset: () => void;
};

export const entryStore = createWithEqualityFn<EntryStoreAttributes & EntryStoreActions>()(
  set => ({
    timestamp: new Date(),
    imageUri: null,
    eatingReason: null,

    setAttributes: (key, value) => set({[key]: value} as Partial<EntryStoreAttributes>),
    reset: () => {
      entryStore.setState(entryStore.getInitialState());
    },
  }),
  shallow,
);

export {entryStore as useEntryStore};
