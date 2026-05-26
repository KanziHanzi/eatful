import {Icon, ThemedText, ThemedView} from '@/src/components';

const Title = () => {
  return (
    <ThemedView
      flexDirection="row"
      alignItems="center"
      gap="xxs"
    >
      <Icon
        name="question-mark"
        size={24}
        color="tint"
      />
      <ThemedText variant="description">{'Why do I eat this?'}</ThemedText>
    </ThemedView>
  );
};

export default Title;
