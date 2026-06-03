import {ThemedText, ThemedView} from 'src/components';
import {getTierByScore} from 'src/constants/dqs';
import {useEntryStore} from '../../../hooks/entryStore';

const Score = () => {
  const {dietaryScore} = useEntryStore(state => ({
    dietaryScore: state.dietaryScore,
  }));

  const tier = getTierByScore(dietaryScore);

  const backgroundColor = tier?.surfaceColor ?? 'modalCard';
  const textColor = tier?.color ?? 'text';

  const formattedScore = dietaryScore.toFixed(1);

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
