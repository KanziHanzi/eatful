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
    selected: '#FF8C00',
    selectedSurface: '#FF8C0026',
    backdrop: 'rgba(0,0,0,0.4)',
    transparent: '#ffffff00',
    shadow: '#000000',
    tierSuperfoods: '#2E7D32',
    tierHighQuality: '#7CB342',
    tierLowQuality: '#FB8C00',
    tierUltraProcessed: '#D32F2F',
    tierSuperfoodsSurface: '#2E7D3226',
    tierHighQualitySurface: '#7CB34226',
    tierLowQualitySurface: '#FB8C0026',
    tierUltraProcessedSurface: '#D32F2F26',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#0a7ea4',
    icon: '#ECEDEE',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#ffffff',
    addTileBorder: '#C8C8C8',
    modalCard: '#232526',
    radioBorder: '#6E7478',
    inputBorder: '#555A5E',
    placeholderText: '#8E9498',
    selected: '#FF8C00',
    selectedSurface: '#FF8C0026',
    backdrop: 'rgba(0,0,0,0.4)',
    transparent: '#ffffff00',
    shadow: '#000000',
    tierSuperfoods: '#66BB6A',
    tierHighQuality: '#9CCC65',
    tierLowQuality: '#FFB74D',
    tierUltraProcessed: '#EF5350',
    tierSuperfoodsSurface: '#66BB6A26',
    tierHighQualitySurface: '#9CCC6526',
    tierLowQualitySurface: '#FFB74D26',
    tierUltraProcessedSurface: '#EF535026',
  },
};

const baseTheme = {
  spacing: {
    xxs: 4,
    xs: 8,
    s: 12,
    m: 20,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    xs: 8,
    s: 12,
    m: 20,
    round: 999,
  },
  textVariants: {
    defaults: {fontFamily: 'Inter', color: 'text'},
    title: {fontSize: 32, lineHeight: 32, fontWeight: 'bold'},
    subtitle: {fontSize: 20, lineHeight: 20, fontWeight: 'bold'},
    description: {fontSize: 16, lineHeight: 24, fontWeight: 'normal'},
    caption: {fontSize: 12, lineHeight: 12, fontWeight: 'normal'},
    link: {fontSize: 16, lineHeight: 30, fontWeight: 'normal', color: 'tint'},
  },
  shadowVariants: {
    defaults: {},
    elevated: {
      shadowColor: 'shadow',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 3,
    },
  },
};

const lightTheme = createTheme({
  ...baseTheme,
  name: 'light',
  colors: palette.light,
  statusBarStyle: 'dark',
});

const darkTheme: Theme = {
  ...baseTheme,
  name: 'dark',
  colors: palette.dark,
  statusBarStyle: 'light',
};

export {darkTheme, lightTheme};
export type Theme = typeof lightTheme;
export type Color = keyof typeof palette.light;
