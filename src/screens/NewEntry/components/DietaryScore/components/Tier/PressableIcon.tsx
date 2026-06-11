import {Pressable} from 'react-native';
import {Icon, IconName} from 'src/components/atoms';
import {ThemedView} from 'src/components/primitives';
import {Color} from 'src/constants/theme';
import {useTheme} from 'src/hooks/useTheme';

type PressableIconProps = {
  name: IconName;
  backgroundColor?: Color;
  size: number;
  disabled?: boolean;
  onPress: () => void;
};

const PressableIcon = ({
  name,
  backgroundColor = 'tabIconDefault',
  size,
  disabled = false,
  onPress,
}: PressableIconProps) => {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{opacity: disabled ? 0.4 : 1}}
      hitSlop={20}
    >
      <ThemedView
        variant="elevated"
        borderRadius={theme.borderRadius.round}
        padding="xxs"
        backgroundColor={backgroundColor}
      >
        <Icon
          name={name}
          size={size}
        />
      </ThemedView>
    </Pressable>
  );
};
export default PressableIcon;
