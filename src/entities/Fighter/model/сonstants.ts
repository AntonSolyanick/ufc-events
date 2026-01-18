export enum FighterImageSize {
  FIGHTER_IMAGE_WIDTH = 180,
  FIGHTER_IMAGE_HEIGHT = 274,
  PORTRAIT_FIGHTER_IMAGE_WIDTH = 128,
  PORTRAIT_FIGHTER_IMAGE_HEIGHT = 80,
}

export const FIGHTER_WEIGHT_OPTIONS = [
  { value: "", label: "Все категории" },
  { value: "тяжелый вес", label: "Тяжёлый вес" },
  { value: "полутяжелый вес", label: "Полутяжёлый вес" },
  { value: "средний вес", label: "Средний вес" },
  { value: "полусредний вес", label: "Полусредний вес" },
  { value: "легкий вес", label: "Лёгкий вес" },
  { value: "полулегкий вес", label: "Полулёгкий вес" },
  { value: "легчайший вес", label: "Легчайший вес" },
  { value: "наилегчайший вес", label: "Наилегчайший вес" },
  { value: "женский полулегкий вес", label: "Женский полулёгкий вес" },
  { value: "женский легчайший вес", label: "Женский легчайший вес" },
  { value: "женский наилегчайший вес", label: "Женский наилегчайший вес" },
  { value: "женский минимальный вес", label: "Женский минимальный вес" },
];

export type FighterWeightValue =
  (typeof FIGHTER_WEIGHT_OPTIONS)[number]["value"];
export type FighterWeightOption = (typeof FIGHTER_WEIGHT_OPTIONS)[number];
