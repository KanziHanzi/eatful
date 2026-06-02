export type CategoryId =
  | 'vegetables'
  | 'fruits'
  | 'nuts-seeds-healthy-oils'
  | 'whole-grains'
  | 'unprocessed-meat-seafood'
  | 'dairy'
  | 'high-quality-processed'
  | 'diet-beverages'
  | 'refined-grains'
  | 'sweets'
  | 'processed-meat'
  | 'fried-foods'
  | 'alcohol'
  | 'other';

type DqsCategory = {
  id: CategoryId;
  title: string;
  description: string;
  score: -2 | -1 | 0 | 1 | 2;
};

export const DQS_CATEGORIES: DqsCategory[] = [
  {
    id: 'vegetables',
    title: 'Vegetables',
    description:
      'Any kind of raw or cooked vegetables such as Potato, Peas, Lentils, Cucumber, Bell pepper, Tomato, onion, garlic...',
    score: 2,
  },
  {
    id: 'fruits',
    title: 'Fruits',
    description: 'Any kind of fresh, frozen or dried whole fruits such as Apple, Banana, Berries, Orange, Plum...',
    score: 2,
  },
  {
    id: 'nuts-seeds-healthy-oils',
    title: 'Nuts, Seeds & Healhty oils',
    description:
      'Raw or processed nuts and seeds such as Walnut, Cashews, Almonds, Peanuts... Peanut butter that has no added oil or sugar may also be counted in this category. Additionally naturally extracted plant oils such as Olive Oil, Avocado Oil, Flaxseed Oil...',
    score: 2,
  },
  {
    id: 'whole-grains',
    title: 'Whole Grains',
    description:
      'Whole-grains such as Buckwheat, Oats, Bulgur, Quinoa, Brown rice... or processed items that contain 100 percent whole grains such as Bread, Pasta or Cereals',
    score: 2,
  },
  {
    id: 'unprocessed-meat-seafood',
    title: 'Unprocessed Meat & Seafood',
    description:
      'All fresh or frozen skeletal and organ meats such as Ground Beef, Beef Steak, Chicken Breast, Pork Chops, Eggs, Salmon, Makerel, Shrimp, Tuna... Also includes canned or jarred products that are minimaly processed such as pickled herring',
    score: 1,
  },
  {
    id: 'dairy',
    title: 'Dairy',
    description:
      'Naturally processed Milk, Cheese, Yogurt, Sour cream, Kefir, cream cheese, cottage cheese without any additional sugar or artificial flavorings',
    score: 1,
  },
  {
    id: 'high-quality-processed',
    title: 'High-Quality Processed Foods',
    description:
      'Processed foods made almost entirely from high quality ingredients such as Honey, Energy bars made from whole grains, nuts & dried fruits or Supplements like Whey protein powder',
    score: 1,
  },
  {
    id: 'diet-beverages',
    title: 'Diet Beverages',
    description:
      'No or low sugar beverages such as Coke Zero, Ice tea light, non-alcoholic Beer, unsweetened Fruit juice...',
    score: 0,
  },
  {
    id: 'refined-grains',
    title: 'Refined grains',
    description:
      'Refined grains includes white rice, pasta, bread or any baked product not made of 100% whole grains. Sweet baked products such as Croissants should counts as sweets',
    score: -1,
  },
  {
    id: 'sweets',
    title: 'Sweets',
    description:
      'All foods and beverages containing substantial amounts of refined sugar such a candy, chocolate, pastries, sugary drinks or fruit juices and yogurt products containing artifial sweeteners or sugar',
    score: -2,
  },
  {
    id: 'processed-meat',
    title: 'Processed Meat',
    description:
      'Meats that have been processed beyond basic preparation, it contains Sausages, Salami, Bacon, Jerky, Hamburgers, Chicken Nuggets...',
    score: -2,
  },
  {
    id: 'fried-foods',
    title: 'Fried Foods',
    description:
      'Any deep fried food such as potato chips, fried chicken, fries and also baked chips that contain a lot of additional oil',
    score: -2,
  },
  {
    id: 'alcohol',
    title: 'Alcohol',
    description:
      'All kinds of alcoholic beverages or alcohol containing products. Alcohol used in cooking such as white wine in sauces should not be counted as the alcohol evaporates',
    score: -2,
  },
  {
    id: 'other',
    title: 'Other',
    description:
      'All sauces, condiments or foods that do not easily fit into any other category. High quality sauces such as hummus, mustard, guacamole should be counted as high quality processed',
    score: -2,
  },
];
