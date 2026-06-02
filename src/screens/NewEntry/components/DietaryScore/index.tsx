import {ThemedView} from 'src/components';
import Score from './components/Score';
import Title from './components/Title';
import Category from './components/Category';
import {DQS_CATEGORIES} from '@/src/constants/dqs';

const DietaryScore = () => {
  return (
    <ThemedView>
      <ThemedView
        flexDirection="row"
        justifyContent="space-between"
      >
        <Title />
        <Score />
      </ThemedView>

      <ThemedView
        gap="xs"
        marginTop="s"
      >
        {DQS_CATEGORIES.map(category => {
          return (
            <Category
              key={category.id}
              id={category.id}
              title={category.title}
              score={category.score}
              iconName="place"
            />
          );
        })}
      </ThemedView>
    </ThemedView>
  );
};

export default DietaryScore;
