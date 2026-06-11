import {createBox} from '@shopify/restyle';
import {SafeAreaView} from 'react-native-safe-area-context';

import type {Theme} from 'src/constants/theme';

const ThemedSafeAreaView = createBox<Theme, React.ComponentProps<typeof SafeAreaView>>(SafeAreaView);

export {ThemedSafeAreaView};
