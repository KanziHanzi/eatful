import {createBox} from '@shopify/restyle';
import {ScrollView, type ScrollViewProps} from 'react-native';

import type {Theme} from 'src/constants/theme';

const ThemedScrollView = createBox<Theme, ScrollViewProps>(ScrollView);

export default ThemedScrollView;
