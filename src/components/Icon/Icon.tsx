import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useTheme} from '@shopify/restyle';
import {ComponentProps} from 'react';
import {useSession} from 'src/context/SessionContext';
import type {Theme} from 'src/theme';

import {Box} from '../primitives';

type IconName = ComponentProps<typeof MaterialIcons>['name'];
type IconSize = NonNullable<ComponentProps<typeof MaterialIcons>['size']>;

type IconProps = {
  name: IconName;
  size: IconSize;
  color?: keyof Theme['colors'];
};

const Icon = ({name, size, color = 'iconPrimary'}: IconProps) => {
  const theme = useTheme<Theme>();
  const {useFallbackIcons} = useSession();

  if (useFallbackIcons) {
    return (
      <Box
        width={size}
        height={size}
        borderWidth={1}
        borderColor={color}
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
