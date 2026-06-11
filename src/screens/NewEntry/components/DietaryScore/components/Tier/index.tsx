import {Icon} from 'src/components/atoms';
import {ThemedText, ThemedView} from 'src/components/primitives';
import {TierId, TierScore} from 'src/constants/dqs';
import {useTheme} from 'src/hooks/useTheme';
import {useEntryStore} from 'src/screens/NewEntry/hooks/entryStore';
import {getTierColor, getTierIconName, getTierSurfaceColor, getValuePrefix} from 'src/utils';
import PressableIcon from './PressableIcon';

type TierProps = {
  id: TierId;
  title: string;
  score: TierScore;
};

const Tier = ({id, title, score}: TierProps) => {
  const theme = useTheme();

  const {selectedCount, increaseTierCount, decreaseTierCount} = useEntryStore(state => ({
    selectedCount: state.selectedTiers[id],
    increaseTierCount: state.increaseTierCount,
    decreaseTierCount: state.decreaseTierCount,
  }));

  const iconName = getTierIconName(score);
  const color = getTierColor(score);
  const surfaceColor = getTierSurfaceColor(score);
  const itemScore = ` (${getValuePrefix(score)}${score})`;

  return (
    <ThemedView
      variant="elevated"
      flexDirection="row"
      alignItems="center"
      padding="s"
      gap="s"
      backgroundColor={surfaceColor}
      borderRadius={theme.borderRadius.m}
    >
      <ThemedView
        variant="elevated"
        alignItems="center"
        justifyContent="center"
        backgroundColor={color}
        borderRadius={theme.borderRadius.round}
        padding="s"
      >
        <Icon
          name={iconName}
          size={20}
          color="background"
        />
      </ThemedView>

      <ThemedView flex={1}>
        <ThemedText
          variant="description"
          numberOfLines={2}
        >
          {title}
          <ThemedText color="placeholderText">{itemScore}</ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView
        flexDirection="row"
        alignItems="center"
        gap="xs"
      >
        <PressableIcon
          name="remove"
          size={20}
          disabled={selectedCount === 0}
          onPress={() => decreaseTierCount(id)}
        />
        <ThemedText
          variant="description"
          textAlign="center"
          minWidth={20}
        >
          {selectedCount}
        </ThemedText>
        <PressableIcon
          name="add"
          size={20}
          backgroundColor={color}
          onPress={() => increaseTierCount(id)}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default Tier;
