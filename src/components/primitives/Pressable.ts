import {
  backgroundColor,
  type BackgroundColorProps,
  border,
  type BorderProps,
  createRestyleComponent,
  layout,
  type LayoutProps,
  opacity,
  type OpacityProps,
  shadow,
  type ShadowProps,
  spacing,
  type SpacingProps,
  spacingShorthand,
  type SpacingShorthandProps,
  visible,
  type VisibleProps,
} from '@shopify/restyle';
import {Pressable as RNPressable, type PressableProps as RNPressableProps} from 'react-native';

import type {Theme} from 'src/theme';

type RestyleProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme>;

export type PressableBoxProps = RestyleProps & RNPressableProps;

export const Pressable = createRestyleComponent<PressableBoxProps, Theme>(
  [spacing, spacingShorthand, layout, backgroundColor, border, shadow, opacity, visible],
  RNPressable,
);
