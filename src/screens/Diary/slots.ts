import type {EntryCategory} from './Diary.types';

export type MealSlot = {
  category: EntryCategory;
  label: string;
};

export const MEAL_SLOTS: MealSlot[] = [
  {category: 'protein-shake', label: 'Protein shake'},
  {category: 'yoghurt', label: 'Yoghurt'},
  {category: 'meal', label: 'Meal'},
  {category: 'snack', label: 'Snack'},
];
