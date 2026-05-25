import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';

type EntryStoreAttributes = {
  timestamp: Date;
};

type EntryStoreActions = {
  setAttributes: <T extends keyof EntryStoreAttributes>(key: T, value: EntryStoreAttributes[T]) => void;
  reset: () => void;
};

export const entryStore = createWithEqualityFn<EntryStoreAttributes & EntryStoreActions>()(
  set => ({
    timestamp: new Date(),

    setAttributes: (key, value) => set({[key]: value} as Partial<EntryStoreAttributes>),
    reset: () => {
      entryStore.setState(entryStore.getInitialState());
    },
  }),
  shallow,
);

export {entryStore as useEntryStore};
