import {DQS_TIERS, TierId} from '@/src/constants/dqs';
import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';
import {EatingReason} from '../../Diary/Diary.types';

type EntryStoreAttributes = {
  timestamp: Date;
  imageUri: string | null;
  eatingReason: EatingReason | null;
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
    timestamp: new Date(),
    imageUri: null,
    eatingReason: null,
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

      let totalScore = 0;
      let totalCount = 0;
      for (const tier of DQS_TIERS) {
        const count = selectedTiers[tier.id];
        totalScore += tier.score * count;
        totalCount += count;
      }

      const dietaryScore = totalCount === 0 ? 0 : totalScore / totalCount;

      set({dietaryScore});
    },
  }),
  shallow,
);

export {entryStore as useEntryStore};
