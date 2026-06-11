import {router} from 'expo-router';
import {PillButton} from 'src/components/atoms';
import {ThemedText} from 'src/components/primitives';

const CancelButton = () => {
  const onCancel = () => {
    router.back();
  };

  return (
    <PillButton onPress={onCancel}>
      <ThemedText variant="description">{'Cancel'}</ThemedText>
    </PillButton>
  );
};

export default CancelButton;
