import {ThemedView} from 'src/components/primitives';
import {DQS_TIERS} from 'src/constants/dqs';
import Score from './components/Score';
import Title from './components/Title';
import Tier from './components/Tier';

const DietaryScore = () => {
  return (
    <ThemedView>
      <ThemedView
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Title />
        <Score />
      </ThemedView>

      <ThemedView
        gap="xs"
        marginTop="s"
      >
        {DQS_TIERS.map(tier => {
          return (
            <Tier
              key={tier.id}
              id={tier.id}
              title={tier.title}
              score={tier.score}
            />
          );
        })}
      </ThemedView>
    </ThemedView>
  );
};

export default DietaryScore;
