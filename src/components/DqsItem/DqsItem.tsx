import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {ComponentProps} from 'react';

import type {DqsCategory} from 'src/constants/dqs.types';
import {dqsColors} from 'src/theme';

import Icon from '../Icon/Icon';
import {Box, Pressable, Text} from '../primitives';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type DqsItemProps = {
  category: DqsCategory;
  icon: IconName;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

const DqsItem = ({category, icon, count, onIncrement, onDecrement}: DqsItemProps) => {
  const colors = dqsColors[category.value];
  const selected = count > 0;
  const canDecrement = count > 0;

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      padding="sm"
      borderRadius="l"
      gap="m"
      borderWidth={1.5}
      borderColor={selected ? colors.accent : 'transparent'}
      backgroundColor={colors.bg}
    >
      <Box
        width={36}
        height={36}
        borderRadius="xl"
        alignItems="center"
        justifyContent="center"
        backgroundColor={colors.accent}
      >
        <Icon
          name={icon}
          size={20}
          color={colors.title}
        />
      </Box>

      <Box
        flex={1}
        gap="nano"
      >
        <Text
          variant="label"
          color={colors.title}
        >
          {category.label}
        </Text>
        <Text
          variant="labelCaption"
          color={colors.caption}
          numberOfLines={1}
        >
          {category.examples}
        </Text>
      </Box>

      <Box
        flexDirection="row"
        alignItems="center"
        gap="s"
      >
        <Pressable
          onPress={onDecrement}
          disabled={!canDecrement}
          width={28}
          height={28}
          borderRadius="l"
          alignItems="center"
          justifyContent="center"
          borderWidth={1}
          borderColor={colors.accent}
          opacity={canDecrement ? 1 : 0.4}
        >
          <Icon
            name="remove"
            size={16}
            color={colors.title}
          />
        </Pressable>

        <Text
          minWidth={16}
          textAlign="center"
          fontWeight="600"
          color={colors.title}
        >
          {count}
        </Text>

        <Pressable
          onPress={onIncrement}
          width={28}
          height={28}
          borderRadius="l"
          alignItems="center"
          justifyContent="center"
          backgroundColor={colors.accent}
        >
          <Icon
            name="add"
            size={16}
            color={colors.title}
          />
        </Pressable>
      </Box>
    </Box>
  );
};

export default DqsItem;
