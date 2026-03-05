const tintColorLight = '#0a7ea4';
const tintColorDark = '#ffffff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: tintColorLight,
    icon: '#11181C',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    addTileBorder: '#4A4A4A',
    modalCard: '#FFFFFF',
    radioBorder: '#808487',
    inputBorder: '#D6D8DA',
    placeholderText: '#969A9D',
    statusBarStyle: 'dark',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#ECEDEE',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    addTileBorder: '#C8C8C8',
    modalCard: '#232526',
    radioBorder: '#6E7478',
    inputBorder: '#555A5E',
    placeholderText: '#8E9498',
    statusBarStyle: 'light',
  },
} as const;

export type ThemePalette = (typeof Colors)[keyof typeof Colors];
