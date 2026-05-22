import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {ComponentProps} from 'react';
import {View} from 'react-native';
import {Color} from 'src/constants/theme';
import {useSession} from 'src/context/SessionContext';
import {useTheme} from 'src/hooks/useTheme';

type IconName = ComponentProps<typeof MaterialIcons>['name'];
type IconSize = NonNullable<ComponentProps<typeof MaterialIcons>['size']>;

type IconProps = {
  name: IconName;
  size: IconSize;
  color?: Color;
};

const Icon = ({name, size, color = 'icon'}: IconProps) => {
  const theme = useTheme();

  const {fallbackIcons} = useSession();

  if (fallbackIcons) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderWidth: 1,
          borderColor: theme.colors[color],
        }}
      />
    );
  }

  return (
    <MaterialIcons
      name={name}
      size={size}
      color={theme.colors[color]}
    />
  );
};

export default Icon;
