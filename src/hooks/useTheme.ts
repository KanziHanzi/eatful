import {useTheme as useRestyleTheme} from '@shopify/restyle';

import type {Theme} from 'src/constants/theme';

export const useTheme = () => useRestyleTheme<Theme>();
