import {ThemedText, ThemedView} from 'src/components';
import {useEntryStore} from '../../../hooks/entryStore';

const Score = () => {
  const {dietaryScore} = useEntryStore(state => ({
    dietaryScore: state.dietaryScore,
  }));

  const formattedScore = dietaryScore.toFixed(1);

  return (
    <ThemedView
      backgroundColor="modalCard"
      padding="xs"
      borderRadius={12}
    >
      <ThemedText variant="subtitle">{formattedScore}</ThemedText>
    </ThemedView>
  );
};

export default Score;
