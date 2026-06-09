import {DQS_TIERS, TierId} from '@/src/constants/dqs';
import {getEntryScore} from 'src/utils/dqs';
import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';
import {EatingReason, EntryCategory} from '../../Diary/Diary.types';

type EntryStoreAttributes = {
  timestamp: number;
  imageUri: string | null;
  eatingReason: EatingReason | null;
  category: EntryCategory;
  dietaryScore: number;
  selectedTiers: Record<TierId, number>;
};

type EntryStoreActions = {
  setAttributes: <T extends keyof EntryStoreAttributes>(key: T, value: EntryStoreAttributes[T]) => void;
  reset: () => void;
  increaseTierCount: (tierId: TierId) => number;
  decreaseTierCount: (tierId: TierId) => number;
  calculateDietaryScore: () => void;
};

export const entryStore = createWithEqualityFn<EntryStoreAttributes & EntryStoreActions>()(
  (set, get) => ({
    timestamp: new Date().getTime(),
    imageUri: null,
    eatingReason: null,
    category: 'meal',
    dietaryScore: 0,
    selectedTiers: Object.fromEntries(DQS_TIERS.map(({id}) => [id, 0])) as Record<TierId, number>,

    setAttributes: (key, value) => set({[key]: value} as Partial<EntryStoreAttributes>),
    reset: () => {
      entryStore.setState(entryStore.getInitialState());
    },
    increaseTierCount: tierId => {
      const newCount = Math.min(get().selectedTiers[tierId] + 1, 99);

      set(state => ({
        selectedTiers: {...state.selectedTiers, [tierId]: newCount},
      }));

      get().calculateDietaryScore();

      return newCount;
    },
    decreaseTierCount: tierId => {
      const newCount = Math.max(get().selectedTiers[tierId] - 1, 0);

      set(state => ({
        selectedTiers: {...state.selectedTiers, [tierId]: newCount},
      }));

      get().calculateDietaryScore();

      return newCount;
    },
    calculateDietaryScore: () => {
      const {selectedTiers} = get();

      const score = getEntryScore(selectedTiers);

      set({dietaryScore: score});
    },
  }),
  shallow,
);

export {entryStore as useEntryStore};
