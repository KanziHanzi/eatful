import {Icon, PressableIcon, ThemedText, ThemedView} from 'src/components';
import {IconName} from 'src/components/globals/Icon/Icon';
import {CategoryId} from 'src/constants/dqs';
import {useTheme} from 'src/hooks/useTheme';
import {useEntryStore} from 'src/screens/NewEntry/hooks/entryStore';
import {getValuePrefix} from 'src/utils';

type CategoryProps = {
  iconName: IconName;
  id: CategoryId;
  title: string;
  score: number;
};

const Category = ({iconName, id, title, score}: CategoryProps) => {
  const theme = useTheme();

  const {selectedCount, increaseCategoryCount, decreaseCategoryCount} = useEntryStore(state => ({
    selectedCount: state.selectedCategories[id],
    increaseCategoryCount: state.increaseCategoryCount,
    decreaseCategoryCount: state.decreaseCategoryCount,
  }));

  const itemScore = ` (${getValuePrefix(score)}${score})`;

  return (
    <ThemedView
      flexDirection="row"
      alignItems="center"
      padding="s"
      gap="s"
      backgroundColor="modalCard"
      borderRadius={theme.borderRadius.m}
    >
      <ThemedView
        alignItems="center"
        justifyContent="center"
        backgroundColor="background"
        borderRadius={theme.borderRadius.round}
        padding="s"
      >
        <Icon
          name={iconName}
          size={20}
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
          onPress={() => decreaseCategoryCount(id)}
        />
        <ThemedText
          variant="description"
          style={{minWidth: 20, textAlign: 'center'}}
        >
          {selectedCount}
        </ThemedText>
        <PressableIcon
          name="add"
          size={20}
          onPress={() => increaseCategoryCount(id)}
        />
      </ThemedView>
    </ThemedView>
  );
};

export default Category;
