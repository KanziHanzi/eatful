export type TierId = 'superfoods' | 'high-quality' | 'low-quality' | 'ultra-processed';

export type TierScore = -2 | -1 | 1 | 2;

export type DqsTier = {
  id: TierId;
  title: string;
  description: string;
  score: TierScore;
};

export const DQS_TIERS: DqsTier[] = [
  {
    id: 'superfoods',
    title: 'Superfoods',
    score: 2,
    description: [
      'Vegetables — spinach, kale, broccoli, cauliflower, carrots, bell peppers, tomato, onion, garlic, cucumber, potato, peas.',
      'Fruits & berries — blueberries, raspberries, apples, bananas, oranges, plums, avocados (fresh, frozen, or dried).',
      'Nuts & seeds — almonds, walnuts, cashews, peanuts, chia, flax, pumpkin seeds; plain peanut butter (no added oil/sugar).',
      'Wild/fatty fish — salmon, mackerel, sardines, trout, herring.',
      'Drinks — unsweetened green or herbal tea',
    ].join('\n'),
  },
  {
    id: 'high-quality',
    title: 'High Quality',
    score: 1,
    description: [
      'Whole grains — oatmeal, brown rice, quinoa, bulgur, buckwheat; 100% whole-wheat bread, pasta, or cereal.',
      'Legumes — lentils, chickpeas, black beans, edamame, tofu.',
      'Lean meats & eggs — chicken/turkey breast, lean ground beef/pork, eggs, lean fresh fish (tuna, shrimp).',
      'Dairy — milk, low-fat yogurt, cottage cheese, feta, parmesan, kefir, sour cream (unsweetened).',
      'Healthy fats — olive oil, avocado oil, flaxseed oil (used in moderation).',
      'High-quality processed — honey, whole-grain/nut/dried-fruit energy bars, whey protein, hummus, mustard, guacamole.',
      'Drinks — ayran, low-sugar kombucha, plain unsweetened milk.',
    ].join('\n'),
  },
  {
    id: 'low-quality',
    title: 'Low Quality',
    score: -1,
    description: [
      'Refined grains — white bread, white pasta, white rice, flour tortillas, couscous, non-sweet baked goods.',
      'Fats & oils — butter, margarine, commercial mayonnaise, vegetable oils.',
      'High-fat dairy — heavy cream, cream cheese, full-fat commercial sauces.',
      'Fatty/processed meats — pork chops, high-fat ground beef, sausages.',
      'Condiments — ketchup, BBQ sauce, sweetened salad dressings.',
      'Drinks — non-alcoholic beer, 100% fruit juice, diet soda, sweetened kombucha.',
    ].join('\n'),
  },
  {
    id: 'ultra-processed',
    title: 'Ultra-Processed',
    score: -2,
    description: [
      'Fast food — burgers, chicken nuggets, fries, onion rings, hot dogs, kebabs.',
      'Sweets & desserts — donuts, cakes, cookies, ice cream, pastries, milk chocolate, croissants.',
      'Salty snacks — potato chips, cheese puffs, pretzels, microwave popcorn.',
      'Processed meats — bacon, salami, pepperoni, jerky, packaged deli meats.',
      'Sugary breakfast — sugary cereals, toaster pastries, pancakes with syrup.',
      'Drinks — regular soda, energy drinks, sweetened iced tea, milkshakes.',
      "Alcohol — beer, wine, spirits, cocktails (alcohol cooked off in sauces doesn't count).",
      "Other — sugary yogurt, fruit juices with added sweeteners, sauces/condiments that don't fit elsewhere.",
    ].join('\n'),
  },
];
