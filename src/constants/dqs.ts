import type { DqsCategory, DqsCategoryId } from 'src/constants/dqs.types';

export const DQS_CATEGORIES: readonly DqsCategory[] = [
  {
    id: 'vegetables',
    label: 'Non-starchy vegetables',
    value: 2,
    examples: 'leafy greens, broccoli, peppers, tomatoes',
  },
  {
    id: 'fruits',
    label: 'Whole fruits',
    value: 2,
    examples: 'berries, apples, bananas, citrus',
  },
  {
    id: 'legumes',
    label: 'Legumes & pulses',
    value: 2,
    examples: 'lentils, chickpeas, beans, tofu, tempeh',
  },
  {
    id: 'nutsSeeds',
    label: 'Nuts & seeds',
    value: 2,
    examples: 'almonds, walnuts, chia, flax (unsweetened/unsalted)',
  },
  {
    id: 'fattyFish',
    label: 'Fatty fish',
    value: 2,
    examples: 'salmon, sardines, mackerel, herring',
  },
  {
    id: 'eggs',
    label: 'Eggs',
    value: 2,
    examples: 'whole eggs',
  },
  {
    id: 'wholeGrains',
    label: 'Whole grains',
    value: 1,
    examples: 'oats, brown rice, quinoa, whole-wheat bread/pasta',
  },
  {
    id: 'starchyVegetables',
    label: 'Starchy vegetables',
    value: 1,
    examples: 'potato, sweet potato, yam, corn',
  },
  {
    id: 'leanMeat',
    label: 'Lean meat & lean fish',
    value: 1,
    examples: 'chicken/turkey breast, cod, tilapia, lean steak',
  },
  {
    id: 'plainDairy',
    label: 'Plain dairy & yogurt',
    value: 1,
    examples: 'milk, plain yogurt, kefir, cottage cheese',
  },
  {
    id: 'healthyFats',
    label: 'Healthy fats',
    value: 1,
    examples: 'olive oil, avocado, avocado oil',
  },
  {
    id: 'refinedGrains',
    label: 'Refined grains',
    value: -1,
    examples: 'white bread, white rice, regular pasta, plain pastries',
  },
  {
    id: 'fattyMeat',
    label: 'fatty meat (unprocessed)',
    value: -1,
    examples: 'ground beef, fatty steak, Pork belly',
  },
  {
    id: 'cheeseButter',
    label: 'Cheese, butter & cream',
    value: -1,
    examples: 'fatty cheeses, butter, heavy cream',
  },
  {
    id: 'dietZeroDrinks',
    label: 'Diet & Zero drinks',
    value: -1,
    examples: 'diet/zero soda, zero-sugar energy drinks, alcohol-free beer/wine, sugar-free sports drinks',
  },
  {
    id: 'processedMeat',
    label: 'Processed meat',
    value: -2,
    examples: 'bacon, sausage, salami, deli meats, hot dogs',
  },
  {
    id: 'sugaryDrinks',
    label: 'Sugary drinks',
    value: -2,
    examples: 'soda, energy drinks, sweetened coffee/tea, juices',
  },
  {
    id: 'sweets',
    label: 'Sweets & desserts',
    value: -2,
    examples: 'candy, cake, ice cream, cookies, chocolate bars',
  },
  {
    id: 'friedFoods',
    label: 'Fried foods',
    value: -2,
    examples: 'fries, fried chicken, deep-fried items',
  },
  {
    id: 'ultraProcessedSnacks',
    label: 'Ultra-processed snacks',
    value: -2,
    examples: 'chips, packaged crackers, instant noodles, protein bars, granola/oat bars, protein powders',
  },
  {
    id: 'alcohol',
    label: 'Alcohol',
    value: -2,
    examples: 'beer, wine, spirits, cocktails',
  },
];

export const DQS_CATEGORIES_BY_ID: Record<DqsCategoryId, DqsCategory> = DQS_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<DqsCategoryId, DqsCategory>,
);
