import { ReactNode } from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

import { useThemeColor } from 'src/hooks/useThemeColor';

import { styles } from './ThemedText.styles';

type ThemedTextVariant = 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';

type ThemedTextProps = {
  children?: ReactNode;
  style?: StyleProp<TextStyle>;
  lightColor?: string;
  darkColor?: string;
  type?: ThemedTextVariant;
  numberOfLines?: number;
};

export const ThemedText = ({
  children,
  style,
  lightColor,
  darkColor,
  type = 'default',
  numberOfLines,
}: ThemedTextProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export type { ThemedTextProps, ThemedTextVariant };
