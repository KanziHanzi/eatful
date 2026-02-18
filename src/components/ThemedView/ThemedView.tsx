import { ReactNode } from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';

import { useThemeColor } from 'src/hooks/useThemeColor';

import { styles } from './ThemedView.styles';

type ThemedViewProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = ({ children, style, lightColor, darkColor }: ThemedViewProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[styles.base, { backgroundColor }, style]}>{children}</View>;
};

export type { ThemedViewProps };
