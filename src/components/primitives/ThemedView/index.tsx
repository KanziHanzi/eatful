import {createBox, createRestyleComponent, createVariant, type VariantProps} from '@shopify/restyle';
import type {ComponentProps} from 'react';

import type {Theme} from 'src/constants/theme';

const Box = createBox<Theme>();

type ThemedViewProps = ComponentProps<typeof Box> & VariantProps<Theme, 'shadowVariants'>;

const ThemedView = createRestyleComponent<ThemedViewProps, Theme>([createVariant({themeKey: 'shadowVariants'})], Box);

export {ThemedView};
