// DEPRECATED, remove after Diary screen rework

import {ReactNode} from 'react';
import {Text as RNText, StyleProp, TextStyle} from 'react-native';
import {useTheme} from 'src/hooks/useTheme';
import {styles} from './Text.styles';

type TextVariant = 'title' | 'subtitle' | 'description' | 'link';

type TextProps = {
  children?: ReactNode;
  variant?: TextVariant;
  style?: StyleProp<TextStyle>;
};

const Text = ({children, variant = 'description', style}: TextProps) => {
  const theme = useTheme();

  return <RNText style={[{color: theme.colors.text}, styles.base, styles[variant], style]}>{children}</RNText>;
};

export {Text};
