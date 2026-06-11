import {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import {ThemedView} from 'src/components/primitives';

type PillButtonProps = {
  onPress: () => void;
  children: ReactNode;
  disabled?: boolean;
};

const PillButton = ({onPress, children, disabled = false}: PillButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
    >
      <ThemedView
        flexDirection="row"
        alignItems="center"
        paddingVertical="xxs"
        paddingHorizontal="xs"
        borderWidth={1}
        borderRadius={99}
        borderColor="inputBorder"
        opacity={disabled ? 0.4 : 1}
      >
        {children}
      </ThemedView>
    </TouchableOpacity>
  );
};

export {PillButton};
