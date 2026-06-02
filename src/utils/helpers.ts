export const getValuePrefix = (value: number) => {
  if (value > 0) {
    return '+';
  } else {
    return '';
  }
};
