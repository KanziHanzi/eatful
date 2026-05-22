import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {ComponentProps} from 'react';

import Icon from '../Icon/Icon';
import {Pressable, Text} from '../primitives';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type PillProps = {
  label?: string;
  icon?: IconName;
  selected?: boolean;
  onPress?: () => void;
};

const Pill = ({label, icon, selected = false, onPress}: PillProps) => {
  return (
    <Pressable
      onPress={onPress}
      flexDirection="row"
      alignItems="center"
      gap="xs"
      paddingVertical="xs"
      paddingHorizontal="ml"
      borderRadius="xxl"
      borderWidth={1}
      borderColor={selected ? 'highlight' : 'borderSubtle'}
      shadowColor={selected ? 'highlight' : 'transparent'}
      shadowOffset={{width: 0, height: 0}}
      shadowOpacity={selected ? 0.6 : 0}
      shadowRadius={selected ? 6 : 0}
      elevation={selected ? 4 : 0}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      {label ? (
        <Text
          variant="description"
          fontSize={14}
          lineHeight={14}
          textTransform="capitalize"
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
};

export default Pill;
