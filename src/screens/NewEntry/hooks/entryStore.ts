import {CategoryId, DQS_CATEGORIES} from '@/src/constants/dqs';
import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';
import {EatingReason} from '../../Diary/Diary.types';

type EntryStoreAttributes = {
  timestamp: Date;
  imageUri: string | null;
  eatingReason: EatingReason | null;
  dietaryScore: number;
  selectedCategories: Record<CategoryId, number>;
};

type EntryStoreActions = {
  setAttributes: <T extends keyof EntryStoreAttributes>(key: T, value: EntryStoreAttributes[T]) => void;
  reset: () => void;
  increaseCategoryCount: (categoryId: CategoryId) => number;
  decreaseCategoryCount: (categoryId: CategoryId) => number;
  calculateDietaryScore: () => void;
};

export const entryStore = createWithEqualityFn<EntryStoreAttributes & EntryStoreActions>()(
  (set, get) => ({
    timestamp: new Date(),
    imageUri: null,
    eatingReason: null,
    dietaryScore: 0,
    selectedCategories: Object.fromEntries(DQS_CATEGORIES.map(({id}) => [id, 0])) as Record<CategoryId, number>,

    setAttributes: (key, value) => set({[key]: value} as Partial<EntryStoreAttributes>),
    reset: () => {
      entryStore.setState(entryStore.getInitialState());
    },
    increaseCategoryCount: categoryId => {
      const newCount = Math.min(get().selectedCategories[categoryId] + 1, 99);

      set(state => ({
        selectedCategories: {...state.selectedCategories, [categoryId]: newCount},
      }));

      get().calculateDietaryScore();

      return newCount;
    },
    decreaseCategoryCount: categoryId => {
      const newCount = Math.max(get().selectedCategories[categoryId] - 1, 0);

      set(state => ({
        selectedCategories: {...state.selectedCategories, [categoryId]: newCount},
      }));

      get().calculateDietaryScore();

      return newCount;
    },
    calculateDietaryScore: () => {
      const {selectedCategories} = get();

      let totalScore = 0;
      let totalCount = 0;
      for (const category of DQS_CATEGORIES) {
        const count = selectedCategories[category.id];
        totalScore += category.score * count;
        totalCount += count;
      }

      const dietaryScore = totalCount === 0 ? 0 : totalScore / totalCount;

      set({dietaryScore});
    },
  }),
  shallow,
);

export {entryStore as useEntryStore};
