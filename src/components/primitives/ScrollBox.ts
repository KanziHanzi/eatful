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
import {ScrollView, type ScrollViewProps} from 'react-native';

import type {Theme} from 'src/theme';

type RestyleProps = SpacingProps<Theme> &
  SpacingShorthandProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  OpacityProps<Theme> &
  VisibleProps<Theme>;

export type ScrollBoxProps = RestyleProps & ScrollViewProps;

export const ScrollBox = createRestyleComponent<ScrollBoxProps, Theme>(
  [spacing, spacingShorthand, layout, backgroundColor, border, shadow, opacity, visible],
  ScrollView,
);
