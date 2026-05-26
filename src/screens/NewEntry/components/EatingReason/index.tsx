import {ThemedView} from '@/src/components';
import Title from './components/Title';
import {eatingReasonOptions} from '@/src/screens/Diary/hooks';
import {eatingReasonIcons} from '@/src/screens/Diary/eatingReasonIcons';
import Reason from './components/Reason';
import {useWindowDimensions} from 'react-native';
import {useTheme} from 'src/hooks/useTheme';

const ITEMS_PER_ROW = 4;

const EatingReason = () => {
  const theme = useTheme();
  const {width: windowWidth} = useWindowDimensions();

  const screenPadding = theme.spacing.m;
  const gap = theme.spacing.s;
  const rowWidth = windowWidth - screenPadding * 2;
  const itemWidth = (rowWidth - gap * (ITEMS_PER_ROW - 1)) / ITEMS_PER_ROW;

  return (
    <ThemedView>
      <Title />

      <ThemedView
        marginTop="s"
        flexDirection="row"
        flexWrap="wrap"
        gap="s"
      >
        {eatingReasonOptions.map(label => (
          <Reason
            key={`reason-${label}`}
            label={label}
            icon={eatingReasonIcons[label]}
            width={itemWidth}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
};

export default EatingReason;
