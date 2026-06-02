import {Icon, ThemedText, ThemedView} from 'src/components';

const Title = () => {
  return (
    <ThemedView
      flexDirection="row"
      alignItems="center"
      gap="xs"
    >
      <Icon
        name="numbers"
        size={24}
      />
      <ThemedText variant="subtitle">{'Dietary Score'}</ThemedText>
    </ThemedView>
  );
};

export default Title;
