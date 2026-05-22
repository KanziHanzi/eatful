import {createTheme} from '@shopify/restyle';

const palette = {
  light: {
    text: '#11181C',
    background: '#ffffff',
    tint: '#0a7ea4',
    icon: '#11181C',
    tabIconDefault: '#687076',
    tabIconSelected: '#0a7ea4',
    addTileBorder: '#4A4A4A',
    modalCard: '#FFFFFF',
    radioBorder: '#808487',
    inputBorder: '#D6D8DA',
    placeholderText: '#969A9D',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#ffffff',
    icon: '#ECEDEE',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#ffffff',
    addTileBorder: '#C8C8C8',
    modalCard: '#232526',
    radioBorder: '#6E7478',
    inputBorder: '#555A5E',
    placeholderText: '#8E9498',
  },
};

const baseTheme = {
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 32,
  },
  borderRadius: {
    s: 8,
    m: 12,
    l: 16,
    round: 999,
  },
  textVariants: {
    defaults: {fontFamily: 'Inter', color: 'text'},
    title: {fontSize: 32, lineHeight: 32, fontWeight: 'bold'},
    subtitle: {fontSize: 20, lineHeight: 20, fontWeight: 'bold'},
    description: {fontSize: 16, lineHeight: 24, fontWeight: 'normal'},
    link: {fontSize: 16, lineHeight: 30, fontWeight: 'normal', color: 'tint'},
  },
};

export const lightTheme = createTheme({
  ...baseTheme,
  name: 'light',
  colors: palette.light,
  statusBarStyle: 'dark',
});

export const darkTheme: Theme = {
  ...baseTheme,
  name: 'dark',
  colors: palette.dark,
  statusBarStyle: 'light',
};

export type Theme = typeof lightTheme;
