import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {ComponentProps} from 'react';
import {View} from 'react-native';
import {useSession} from 'src/context/SessionContext';
import {useTheme} from 'src/hooks/useTheme';

type IconName = ComponentProps<typeof MaterialIcons>['name'];
type IconSize = NonNullable<ComponentProps<typeof MaterialIcons>['size']>;

type IconProps = {
  name: IconName;
  size: IconSize;
};

const Icon = ({name, size}: IconProps) => {
  const {palette} = useTheme();

  const {fallbackIcons} = useSession();

  if (fallbackIcons) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderWidth: 1,
          borderColor: palette.icon,
        }}
      />
    );
  }

  return (
    <MaterialIcons
      name={name}
      size={size}
      color={palette.icon}
    />
  );
};

export default Icon;
