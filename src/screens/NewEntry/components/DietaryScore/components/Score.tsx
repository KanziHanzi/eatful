import {ThemedText, ThemedView} from 'src/components/primitives';
import {formatDietaryScore, getTierByScore, getTierColor, getTierSurfaceColor} from 'src/utils';
import {useEntryStore} from '../../../hooks/entryStore';

const Score = () => {
  const {dietaryScore} = useEntryStore(state => ({
    dietaryScore: state.dietaryScore,
  }));

  const tier = getTierByScore(dietaryScore);

  const backgroundColor = tier ? getTierSurfaceColor(tier.score) : 'modalCard';
  const textColor = tier ? getTierColor(tier.score) : 'text';

  const formattedScore = formatDietaryScore(dietaryScore);

  return (
    <ThemedView
      backgroundColor={backgroundColor}
      paddingHorizontal="s"
      paddingVertical="xs"
      borderRadius={12}
    >
      <ThemedText
        variant="subtitle"
        color={textColor}
      >
        {formattedScore}
      </ThemedText>
    </ThemedView>
  );
};

export default Score;
