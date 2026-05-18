export type DqsValue = -2 | -1 | 0 | 1 | 2;

export type DqsCategoryId =
  | 'vegetables'
  | 'fruits'
  | 'legumes'
  | 'nutsSeeds'
  | 'fattyFish'
  | 'eggs'
  | 'wholeGrains'
  | 'starchyVegetables'
  | 'leanMeat'
  | 'plainDairy'
  | 'healthyFats'
  | 'refinedGrains'
  | 'fattyMeat'
  | 'cheeseButter'
  | 'processedMeat'
  | 'sugaryDrinks'
  | 'sweets'
  | 'friedFoods'
  | 'ultraProcessedSnacks'
  | 'alcohol';

export type DqsCategory = {
  id: DqsCategoryId;
  label: string;
  value: DqsValue;
  examples: string;
};
