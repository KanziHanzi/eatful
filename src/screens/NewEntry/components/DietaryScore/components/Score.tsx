import {ThemedText, ThemedView} from 'src/components';
import {getTierByScore} from 'src/utils';
import {getTierColor, getTierSurfaceColor} from 'src/utils';
import {useEntryStore} from '../../../hooks/entryStore';

const Score = () => {
  const {dietaryScore} = useEntryStore(state => ({
    dietaryScore: state.dietaryScore,
  }));

  const tier = getTierByScore(dietaryScore);

  const backgroundColor = tier ? getTierSurfaceColor(tier.score) : 'modalCard';
  const textColor = tier ? getTierColor(tier.score) : 'text';

  const truncated = Math.trunc(dietaryScore * 10) / 10;
  const formattedScore = truncated.toFixed(1);

  return (
    <ThemedView
      backgroundColor={backgroundColor}
      padding="s"
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
